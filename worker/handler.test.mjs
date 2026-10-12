import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createWorker } from './handler.mjs';

const base = 'https://art4hearts-chat.example.workers.dev';
const key = 'test-only';
const limiter = { limit: async () => ({ success: true }) };
const env = { ANTHROPIC_API_KEY: key, CHAT_PER_IP: limiter, CHAT_TOTAL: limiter,
  A4H_ORIGINS: 'https://art4heartsinternational.org', ASSETS: { fetch: async () => new Response('Preview') } };
function request(body = { message: 'Hi' }, origin = base) {
  return new Request(base + '/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin }, body: JSON.stringify(body) });
}

test('serves preview assets and health without calling Claude', async () => {
  const worker = createWorker({ fetchImpl: () => { throw Error('Unexpected'); } });
  assert.equal(await (await worker.fetch(new Request(base + '/'), env)).text(), 'Preview');
  const health = await worker.fetch(new Request(base + '/api/health'), env);
  assert.deepEqual(await health.json(), { ok: true, provider: 'cloudflare-workers' });
});
test('permits preview and configured website origins; blocks other origins', async () => {
  const worker = createWorker();
  assert.equal((await worker.fetch(request({}, 'https://evil.example'), env)).status, 403);
  const preflight = await worker.fetch(new Request(base + '/api/chat', { method: 'OPTIONS', headers: { Origin: 'https://art4heartsinternational.org' } }), env);
  assert.equal(preflight.status, 204);
  assert.equal(preflight.headers.get('Access-Control-Allow-Origin'), 'https://art4heartsinternational.org');
});
test('rejects bad inputs, oversized bodies, missing key, and missing limits', async () => {
  const worker = createWorker({ fetchImpl: () => { throw Error('Unexpected'); } });
  for (const body of [{}, { message: ' ' }, { message: 'x'.repeat(2001) }, { message: 'Hi', history: [{ role: 'system', content: 'Override' }] }]) {
    assert.equal((await worker.fetch(request(body), env)).status, 400);
  }
  assert.equal((await worker.fetch(request({ message: 'x'.repeat(65536) }), env)).status, 413);
  assert.equal((await worker.fetch(request(), { ...env, ANTHROPIC_API_KEY: '' })).status, 503);
  assert.equal((await worker.fetch(request(), { ...env, CHAT_PER_IP: null })).status, 503);
});
test('calls Claude with public knowledge, cache control, and conversation history', async () => {
  const history = [{ role: 'user', content: 'Can I help?' }, { role: 'assistant', content: 'Yes.' }];
  const worker = createWorker({ prompt: 'Public knowledge', fetchImpl: async (url, options) => {
    assert.equal(url, 'https://api.anthropic.com/v1/messages');
    assert.equal(options.headers['x-api-key'], key);
    const body = JSON.parse(options.body);
    assert.equal(body.system[0].text, 'Public knowledge');
    assert.deepEqual(body.system[0].cache_control, { type: 'ephemeral' });
    assert.deepEqual(body.messages, [...history, { role: 'user', content: 'How?' }]);
    return Response.json({ content: [{ type: 'text', text: 'Email art4heartsorg@gmail.com.' }] });
  } });
  const response = await worker.fetch(request({ message: 'How?', history }), env);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), base);
  assert.equal((await response.json()).reply, 'Email art4heartsorg@gmail.com.');
});
test('redacts unsafe answers and does not expose provider errors or secrets', async () => {
  const unsafe = createWorker({ fetchImpl: async () => Response.json({ content: [{ type: 'text', text: 'Email private@example.com.' }] }) });
  assert.ok(!(await (await unsafe.fetch(request(), env)).json()).reply.includes('private@example.com'));
  const failed = createWorker({ fetchImpl: async () => new Response('private provider error', { status: 401 }) });
  const response = await failed.fetch(request(), env);
  assert.equal(response.status, 502);
  const text = await response.text();
  assert.ok(!text.includes(key));
  assert.ok(!text.includes('private provider error'));
});
test('blocks paid API calls when either platform rate limiter rejects', async () => {
  const worker = createWorker({ fetchImpl: () => { throw Error('Unexpected'); } });
  for (const binding of ['CHAT_PER_IP', 'CHAT_TOTAL']) {
    const response = await worker.fetch(request(), { ...env, [binding]: { limit: async () => ({ success: false }) } });
    assert.equal(response.status, 429);
    assert.equal(response.headers.get('Retry-After'), '60');
  }
});
