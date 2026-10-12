const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { randomUUID } = require('node:crypto');

// Only the supplied PUBLIC pack is loaded. Internal wiki files and credentials
// do not belong in this repository or in the React build.
const prompt = readFileSync(join(__dirname, 'knowledge/system_prompt.md'), 'utf8')
  .replace('{KNOWLEDGE_PACK}', readFileSync(join(__dirname, 'knowledge/public.md'), 'utf8'));
const { FALLBACK, safeReply, validRequest } = require('./chat-policy.cjs');

function createChat({ apiKey = process.env.ANTHROPIC_API_KEY, model = process.env.A4H_MODEL || 'claude-sonnet-5',
  fetchImpl = fetch, now = Date.now, blockedNames = (process.env.A4H_BLOCKED_NAMES || '').split('|') } = {}) {
  const hits = new Map();
  let active = 0;
  let windowStart = now();
  let total = 0;

  return async function chat(body, ip) {
    if (!validRequest(body)) return { status: 400, data: { error: 'Use a message of 1–2000 characters and up to 12 user/assistant history turns.' } };
    if (!apiKey) return { status: 503, data: { error: 'The assistant is not configured yet.' } };
    const time = now();
    for (const [client, entry] of hits) if (time - entry.start >= 300000) hits.delete(client);
    if (time - windowStart >= 300000) { windowStart = time; total = 0; }
    const entry = hits.get(ip) || { start: time, count: 0 };
    // Bounded, per-process limits. Configure an edge limit for multi-instance hosting.
    if (entry.count >= 20 || total >= 100 || active >= 4 || hits.size >= 1000) {
      return { status: 429, data: { error: 'Please wait before sending another question.' } };
    }
    entry.count++;
    hits.set(ip, entry);
    total++;
    active++;
    const trace = randomUUID().slice(0, 8);
    try {
      const response = await fetchImpl('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
        signal: AbortSignal.timeout(35000),
        body: JSON.stringify({
          model, max_tokens: 700,
          system: [{ type: 'text', text: prompt, cache_control: { type: 'ephemeral' } }],
          messages: [...(body.history || []), { role: 'user', content: body.message.trim() }],
        }),
      });
      if (!response.ok) throw new Error(`provider-status-${response.status}`);
      const data = await response.json();
      const text = (Array.isArray(data.content) ? data.content : [])
        .filter(block => block.type === 'text' && typeof block.text === 'string').map(block => block.text).join('');
      if (!text.trim()) throw new Error('empty-reply');
      return { status: 200, data: { reply: safeReply(text, blockedNames), trace } };
    } catch {
      // Never log provider bodies, credentials, conversations, or personal details.
      console.error(`[${trace}] Chat provider unavailable`);
      return { status: 502, data: { error: 'The assistant is temporarily unavailable.', trace } };
    } finally { active--; }
  };
}

module.exports = { createChat, safeReply, validRequest, FALLBACK };
