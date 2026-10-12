import React, { useEffect, useRef, useState } from 'react';
import './ChatWidget.css';

function ChatIcon({ kind }: { kind: 'chat' | 'close' | 'send' }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === 'chat' ? <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3H13a8.5 8.5 0 0 1 8 8v.5Z" />
      : kind === 'close' ? <path d="m6 6 12 12M6 18 18 6" />
      : <><path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="m22 2-11 11" /></>}
  </svg>;
}

type Turn = { role: 'user' | 'assistant'; content: string };
const suggestions = [
  'Can I mail my bracelets to you?',
  'How do I get service hours?',
  'How do I start a chapter?',
];

// Render a small Markdown subset as React elements; never inject model HTML.
function inline(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\((?:https?:\/\/|mailto:)[^\s)]+\))/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)$/);
    if (link) return <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer">{link[1]}</a>;
    return part;
  });
}

export function ChatReply({ text }: { text: string }) {
  const lines = text.split('\n');
  const blocks: React.ReactNode[] = [];
  for (let i = 0; i < lines.length; i++) {
    const list = lines[i].match(/^\s*(?:([-*•])|\d+[.)])\s+(.*)$/);
    if (list) {
      const ordered = !list[1];
      const items: React.ReactNode[] = [];
      const start = i;
      while (i < lines.length) {
        const item = lines[i].match(/^\s*(?:([-*•])|\d+[.)])\s+(.*)$/);
        if (!item || (!item[1]) !== ordered) break;
        items.push(<li key={i}>{inline(item[2])}</li>);
        i++;
      }
      i--;
      blocks.push(ordered ? <ol key={start}>{items}</ol> : <ul key={start}>{items}</ul>);
    } else if (lines[i].trim()) {
      blocks.push(<p key={i}>{inline(lines[i])}</p>);
    }
  }
  return <>{blocks}</>;
}

const ChatPanel: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Turn[]>([]);
  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [failedQuestion, setFailedQuestion] = useState('');
  const history = useRef<Turn[]>([]);
  const busy = useRef(false);
  const controller = useRef<AbortController | null>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const log = useRef<HTMLDivElement>(null);

  const close = () => {
    setOpen(false);
    launcher.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        launcher.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [messages, pending, error, open]);

  useEffect(() => () => controller.current?.abort(), []);

  async function send(question: string, retry = false) {
    const message = question.trim();
    if (!message || message.length > 2000 || busy.current) return;
    busy.current = true;
    setPending(true);
    setError('');
    setFailedQuestion('');
    setDraft('');
    if (!retry) setMessages(previous => [...previous, { role: 'user', content: message }]);
    const abort = new AbortController();
    controller.current = abort;
    const timeout = window.setTimeout(() => abort.abort(), 45000);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history: history.current.slice(-12) }),
        signal: abort.signal,
      });
      const data = await response.json();
      if (!response.ok || typeof data.reply !== 'string' || !data.reply.trim()) {
        throw new Error(response.status === 429 ? 'rate-limit' : 'unavailable');
      }
      const turns: Turn[] = [{ role: 'user', content: message }, { role: 'assistant', content: data.reply }];
      history.current = [...history.current, ...turns].slice(-12);
      setMessages(previous => [...previous, turns[1]]);
    } catch (err) {
      setError(err instanceof Error && err.message === 'rate-limit'
        ? 'A few too many questions at once. Please wait a minute and try again.'
        : 'The assistant could not connect. Try again, or email our team below.');
      setFailedQuestion(message);
    } finally {
      window.clearTimeout(timeout);
      controller.current = null;
      busy.current = false;
      setPending(false);
    }
  }

  return (
    <div className="a4h-chat">
      {open && (
        <section id="a4h-chat-panel" className="a4h-chat-panel" role="dialog" aria-labelledby="a4h-chat-title" aria-describedby="a4h-chat-disclaimer">
          <header className="a4h-chat-header">
            <div className="a4h-chat-avatar"><ChatIcon kind="chat" /></div>
            <div><h2 id="a4h-chat-title">Art4Hearts assistant</h2><p>A little help, a lot of heart.</p></div>
            <button type="button" className="a4h-chat-close" onClick={close} aria-label="Close chat"><ChatIcon kind="close" /></button>
          </header>
          <div className="a4h-chat-log" ref={log} role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions" tabIndex={0}>
            <div className="a4h-chat-message a4h-chat-assistant"><p>Hi! I’m the Art4Hearts AI assistant. Ask me about volunteering, donations, or starting a chapter.</p></div>
            {messages.length === 0 && <div className="a4h-chat-suggestions" aria-label="Suggested questions">
              {suggestions.map(question => <button type="button" key={question} onClick={() => send(question)} disabled={pending}>{question}</button>)}
            </div>}
            {messages.map((message, i) => <div key={i} className={`a4h-chat-message a4h-chat-${message.role}`}>
              <span className="a4h-chat-sr-only">{message.role === 'user' ? 'You: ' : 'Assistant: '}</span>
              {message.role === 'assistant' ? <ChatReply text={message.content} /> : <p>{message.content}</p>}
            </div>)}
            {pending && <div className="a4h-chat-typing" role="status"><span className="a4h-chat-dots" aria-hidden="true">•••</span> Thinking…</div>}
            {error && <div className="a4h-chat-error" role="alert"><p>{error}</p><button type="button" onClick={() => send(failedQuestion, true)}>Try again</button></div>}
          </div>
          <form className="a4h-chat-form" onSubmit={event => { event.preventDefault(); send(draft); }}>
            <label htmlFor="a4h-chat-input" className="a4h-chat-sr-only">Your question</label>
            <input id="a4h-chat-input" ref={input} value={draft} onChange={event => setDraft(event.target.value)} maxLength={2000} placeholder="Ask us a question…" autoComplete="off" disabled={pending} />
            <button type="submit" disabled={pending || !draft.trim()} aria-label="Send message"><ChatIcon kind="send" /></button>
          </form>
          <p className="a4h-chat-disclaimer" id="a4h-chat-disclaimer">AI answers may be incomplete. For anything important, <a href="mailto:art4heartsorg@gmail.com">email our team</a>. Please avoid sharing personal details.</p>
        </section>
      )}
      <button ref={launcher} type="button" className="a4h-chat-launcher" onClick={() => open ? close() : setOpen(true)} aria-label={open ? 'Close Art4Hearts chat' : 'Open Art4Hearts chat'} aria-expanded={open} aria-controls="a4h-chat-panel">
        <ChatIcon kind={open ? 'close' : 'chat'} />
      </button>
    </div>
  );
};

// Temporarily keep chat off the main website while its hosting is evaluated.
// The dedicated preview and local development keep the complete assistant.
const CHAT_PREVIEW_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]', 'art4hearts-7t3r.onrender.com']);

const ChatWidget: React.FC = () => {
  return CHAT_PREVIEW_HOSTS.has(window.location.hostname.toLowerCase()) ? <ChatPanel /> : null;
};

export default ChatWidget;
