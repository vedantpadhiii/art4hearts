const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { loadEnvFile } = require('node:process');
if (fs.existsSync(path.join(__dirname, '../.env'))) loadEnvFile(path.join(__dirname, '../.env'));
const { createChat } = require('./chat.cjs');

const build = path.resolve(__dirname, '../build');
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.ttf': 'font/ttf', '.woff': 'font/woff', '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.txt': 'text/plain' };

function createServer({ chat = createChat(), origins = (process.env.A4H_ORIGINS ||
  'https://art4heartsinternational.org,https://www.art4heartsinternational.org,http://localhost:3000,http://127.0.0.1:3000').split(',').map(origin => origin.trim()),
  trustProxy = process.env.A4H_TRUST_PROXY === '1' } = {}) {
  return http.createServer(async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    function json(status, data) {
      res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
      res.end(JSON.stringify(data));
    }
    let pathname;
    try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
    catch { return json(400, { error: 'Invalid URL.' }); }

    if (pathname === '/api/health' && req.method === 'GET') return json(200, { ok: true });
    if (pathname === '/api/chat') {
      const origin = req.headers.origin;
      if (origin && !origins.includes(origin)) return json(403, { error: 'Origin not allowed.' });
      if (origin) { res.setHeader('Access-Control-Allow-Origin', origin); res.setHeader('Vary', 'Origin'); }
      if (req.method === 'OPTIONS') {
        res.writeHead(204, { 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type' });
        return res.end();
      }
      if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return json(405, { error: 'POST only.' }); }
      if (!/^application\/json(?:;|$)/i.test(req.headers['content-type'] || '')) return json(415, { error: 'Send JSON.' });
      let size = 0;
      const chunks = [];
      try {
        for await (const chunk of req) {
          size += chunk.length;
          if (size > 65536) { json(413, { error: 'Request is too large.' }); return; }
          chunks.push(chunk);
        }
        let body;
        try { body = JSON.parse(Buffer.concat(chunks).toString('utf8')); }
        catch { return json(400, { error: 'Invalid JSON.' }); }
        const ip = trustProxy && req.headers['x-forwarded-for']
          ? String(req.headers['x-forwarded-for']).split(',')[0].trim() : req.socket.remoteAddress;
        const result = await chat(body, ip);
        if (result.status === 429) res.setHeader('Retry-After', '60');
        return json(result.status, result.data);
      } catch { if (!res.headersSent) json(500, { error: 'Request failed.' }); return; }
    }
    if (pathname.startsWith('/api/')) return json(404, { error: 'Unknown endpoint.' });
    if (!['GET', 'HEAD'].includes(req.method)) return json(405, { error: 'GET only.' });
    if (pathname.split('/').some(segment => segment.startsWith('.'))) return json(404, { error: 'Not found.' });
    let file = path.resolve(build, `.${pathname}`);
    if (file !== build && !file.startsWith(build + path.sep)) return json(403, { error: 'Forbidden.' });
    // Serve browser routes from index.html, but never substitute HTML for missing assets.
    if (!path.extname(pathname)) file = path.join(build, 'index.html');
    try {
      const stat = await fs.promises.stat(file);
      if (!stat.isFile()) return json(404, { error: 'Not found.' });
      res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream',
        'Content-Length': stat.size, 'Cache-Control': pathname.startsWith('/static/') ? 'public, max-age=31536000, immutable' : 'no-cache' });
      if (req.method === 'HEAD') return res.end();
      const stream = fs.createReadStream(file);
      stream.on('error', () => res.destroy());
      stream.pipe(res);
    } catch { json(404, { error: 'Not found. Run npm run build first.' }); }
  });
}

if (require.main === module) {
  const port = Number(process.env.PORT || 8000);
  createServer().listen(port, '0.0.0.0', () => console.log(`Art4Hearts website and chat API: http://localhost:${port}`));
}
module.exports = { createServer };
