import policy from '../server/chat-policy.cjs';
const { validRequest, safeReply } = policy;

async function readJson(request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error('invalid');
  const chunks = [];
  let size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 65536) { await reader.cancel(); throw new Error('large'); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export function createWorker({ prompt, fetchImpl = fetch } = {}) {
  return {
    async fetch(request, env) {
      const url = new URL(request.url);
      const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };
      const json = (status, data) => new Response(JSON.stringify(data), { status, headers });
      if (url.pathname === '/api/health') return json(200, { ok: true, provider: 'cloudflare-workers' });
      if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(request);
      if (url.pathname !== '/api/chat') return json(404, { error: 'Unknown endpoint.' });
      const origin = request.headers.get('Origin');
      const allowed = new Set((env.A4H_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean));
      allowed.add(url.origin); // The standalone preview always uses its own origin.
      if (origin && !allowed.has(origin)) return json(403, { error: 'Origin not allowed.' });
      if (origin) { headers['Access-Control-Allow-Origin'] = origin; headers.Vary = 'Origin'; }
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: { ...headers, 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type' } });
      }
      if (request.method !== 'POST') { headers.Allow = 'POST'; return json(405, { error: 'POST only.' }); }
      if (!/^application\/json(?:;|$)/i.test(request.headers.get('Content-Type') || '')) return json(415, { error: 'Send JSON.' });
      let body;
      try { body = await readJson(request); }
      catch (error) { return json(error.message === 'large' ? 413 : 400, { error: 'Invalid or oversized request.' }); }
      if (!validRequest(body)) return json(400, { error: 'Invalid message or history.' });
      if (!env.ANTHROPIC_API_KEY) return json(503, { error: 'The assistant is not configured yet.' });
      // Bindings are configured on the free plan; fail closed if missing.
      if (!env.CHAT_PER_IP || !env.CHAT_TOTAL) return json(503, { error: 'Chat limits are not configured.' });
      const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
      const visitor = await env.CHAT_PER_IP.limit({ key: ip });
      if (!visitor.success) { headers['Retry-After'] = '60'; return json(429, { error: 'Please wait before sending another question.' }); }
      const total = await env.CHAT_TOTAL.limit({ key: 'art4hearts-chat' });
      if (!total.success) { headers['Retry-After'] = '60'; return json(429, { error: 'The assistant is busy. Please wait.' }); }
      const trace = crypto.randomUUID().slice(0, 8);
      try {
        const response = await fetchImpl('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
          signal: AbortSignal.timeout(35000),
          body: JSON.stringify({ model: env.A4H_MODEL || 'claude-sonnet-5', max_tokens: 700,
            system: [{ type: 'text', text: prompt, cache_control: { type: 'ephemeral' } }],
            messages: [...(body.history || []), { role: 'user', content: body.message.trim() }] }),
        });
        if (!response.ok) throw new Error('provider');
        const data = await response.json();
        const text = (Array.isArray(data.content) ? data.content : [])
          .filter(block => block.type === 'text' && typeof block.text === 'string').map(block => block.text).join('');
        if (!text.trim()) throw new Error('empty');
        return json(200, { reply: safeReply(text, (env.A4H_BLOCKED_NAMES || '').split('|')), trace });
      } catch {
        console.error(`[${trace}] Chat provider unavailable`);
        return json(502, { error: 'The assistant is temporarily unavailable.', trace });
      }
    },
  };
}
