import React from 'react';
import { createRoot } from 'react-dom/client';
import { act, Simulate } from 'react-dom/test-utils';
import ChatWidget, { ChatReply } from './ChatWidget';

let container;
let root;
const originalFetch = global.fetch;
const mockFetch = jest.fn();

beforeEach(() => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  global.fetch = mockFetch;
  mockFetch.mockReset();
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  global.fetch = originalFetch;
});
function button(label) { return container.querySelector(`button[aria-label="${label}"]`); }
function openChat() { act(() => button('Open Art4Hearts chat').click()); }
async function ask(question) {
  const input = container.querySelector('input');
  act(() => Simulate.change(input, { target: { value: question } }));
  await act(async () => Simulate.submit(container.querySelector('form')));
}

test('hides chat on the main website while keeping it available on the test service', () => {
  const location = jest.spyOn(window, 'location', 'get');
  try {
    for (const hostname of ['art4heartsinternational.org', 'www.art4heartsinternational.org']) {
      location.mockReturnValue({ hostname });
      act(() => root.render(<ChatWidget />));
      expect(container.querySelector('button')).toBeNull();
    }
    for (const hostname of ['art4hearts-7t3r.onrender.com', 'art4hearts-chat.example.workers.dev']) {
      location.mockReturnValue({ hostname });
      act(() => root.render(<ChatWidget />));
      expect(button('Open Art4Hearts chat')).not.toBeNull();
      openChat();
      expect(container.querySelector('[role="dialog"]')).not.toBeNull();
      act(() => button('Close chat').click());
    }
  } finally { location.mockRestore(); }
});

test('starts as a circle, focuses the composer, closes on Escape and restores focus', () => {
  act(() => root.render(<ChatWidget />));
  expect(container.querySelector('[role="dialog"]')).toBeNull();
  openChat();
  expect(document.activeElement).toBe(container.querySelector('input'));
  act(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })));
  expect(container.querySelector('[role="dialog"]')).toBeNull();
  expect(document.activeElement).toBe(button('Open Art4Hearts chat'));
});

test('preserves conversation after reopening and includes history with follow-up questions', async () => {
  mockFetch.mockResolvedValue({ ok: true, json: async () => ({ reply: 'Yes, you can **volunteer**.' }) });
  act(() => root.render(<ChatWidget />));
  openChat();
  await ask('Can I volunteer?');
  expect(container.querySelector('strong')?.textContent).toBe('volunteer');
  act(() => button('Close chat').click());
  openChat();
  expect(container.textContent).toContain('Can I volunteer?');
  await ask('How?');
  const request = JSON.parse(mockFetch.mock.calls[1][1].body);
  expect(request.history).toEqual([
    { role: 'user', content: 'Can I volunteer?' },
    { role: 'assistant', content: 'Yes, you can **volunteer**.' },
  ]);
});

test('shows loading feedback, prevents duplicate requests, and recovers with retry', async () => {
  let resolve = () => {};
  mockFetch.mockReturnValueOnce(new Promise(done => { resolve = done; }));
  act(() => root.render(<ChatWidget />));
  openChat();
  await ask('How do I start a chapter?');
  expect(container.querySelector('[role="status"]')?.textContent).toContain('Thinking');
  expect(button('Send message').disabled).toBe(true);
  await act(async () => Simulate.submit(container.querySelector('form')));
  expect(mockFetch).toHaveBeenCalledTimes(1);
  await act(async () => resolve({ ok: false, status: 502, json: async () => ({ error: 'Unavailable' }) }));
  expect(container.querySelector('[role="alert"]')).not.toBeNull();
  mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({ reply: 'Email our team.' }) });
  await act(async () => (container.querySelector('[role="alert"] button')).click());
  expect(container.querySelector('[role="alert"]')).toBeNull();
  expect(container.querySelectorAll('.a4h-chat-user')).toHaveLength(1);
  expect(container.textContent).toContain('Email our team.');
});

test('renders formatting and links without interpreting HTML or unsafe link schemes', () => {
  act(() => root.render(<ChatReply text={'**Hello**\n- One\n- Two\n[Website](https://art4heartsinternational.org)\n<img src=x onerror=alert(1)>\n[Bad](javascript:alert(1))'} />));
  expect(container.querySelector('strong')?.textContent).toBe('Hello');
  expect(container.querySelectorAll('li')).toHaveLength(2);
  expect(container.querySelectorAll('a')).toHaveLength(1);
  expect(container.querySelector('img')).toBeNull();
  expect(container.querySelector('a')?.getAttribute('rel')).toBe('noopener noreferrer');
});
