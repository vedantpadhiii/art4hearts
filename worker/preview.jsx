import React from 'react';
import { createRoot } from 'react-dom/client';
import ChatWidget from '../src/components/ChatWidget';

createRoot(document.getElementById('root')).render(<>
  <main className="welcome">
    <img src="/logo.png" alt="Art4Hearts" width="120" height="120" />
    <h1>A little help, a lot of heart.</h1>
    <p>Ask us about volunteering, donations, or starting a chapter.</p>
    <p className="hint">Click the chat circle in the bottom right to start a conversation.</p>
    <a href="https://art4heartsinternational.org/">Visit Art4Hearts →</a>
  </main>
  <ChatWidget />
</>);
