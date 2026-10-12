// Shared by the Node server and Cloudflare Worker. No filesystem or credentials.
const FALLBACK = "I'm not able to answer that one. For anything the site doesn't cover, email art4heartsorg@gmail.com and someone on the team will get back to you.";
const patterns = [
  /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g,
  /(?<!\d)(?:\+?1[-. ]?)?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}(?!\d)/g,
  /(?<!\d)\d{3}-\d{2}-\d{4}(?!\d)/g,
  /(?<!\d)(?:\d[ -]?){13,16}(?!\d)/g,
  /\b(?:sk-ant-|sk-|AIza|ghp_)[A-Za-z0-9_-]{12,}/g,
];
const leaks = ['you are the art4hearts assistant', '<knowledge>', '{knowledge_pack}', 'my system prompt'];

function safeReply(text, blockedNames = []) {
  if (patterns.some(pattern => (text.match(pattern) || []).some(match => match.toLowerCase() !== 'art4heartsorg@gmail.com'))
      || leaks.some(phrase => text.toLowerCase().includes(phrase))
      || blockedNames.some(name => name && text.toLowerCase().includes(name.toLowerCase()))) return FALLBACK;
  return text;
}

function validRequest(body) {
  return body && typeof body.message === 'string' && body.message.trim().length > 0 && body.message.length <= 2000
    && (body.history === undefined || (Array.isArray(body.history) && body.history.length <= 12
      && body.history.every(turn => turn && ['user', 'assistant'].includes(turn.role)
        && typeof turn.content === 'string' && turn.content.trim().length > 0 && turn.content.length <= 8000)));
}

module.exports = { FALLBACK, safeReply, validRequest };
