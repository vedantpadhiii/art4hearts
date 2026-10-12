# Art4Hearts website assistant

Chat is temporarily disabled on the main website. It remains available at
https://art4hearts-chat.vedant13688.workers.dev/ (Cloudflare),
https://art4hearts-7t3r.onrender.com/ (older Render preview), and localhost / 127.0.0.1 for testing.
The allowed preview hosts are listed in `src/components/ChatWidget.tsx`; remove
that hostname gate when the main site's backend hosting is ready.

On the preview, the bottom-right circle opens a compact chat panel on every page. Conversation
history stays in memory while the visitor navigates or closes the panel; a reload
clears it. Questions are sent to the server and then to Anthropic. No conversations
are saved to disk or logged by this application.

The existing Art4Hearts agent was adapted into a Node server so the website and
`POST /api/chat` can share an origin. It uses the supplied system prompt, public
knowledge pack, prompt caching, and output redaction. The browser never receives
the API key or the full knowledge pack. Internal wiki pages, source emails, and
the agent's `.env` have not been copied.

## Run locally

Use Node 22 or later. Install with `npm ci` if needed.

1. Copy `.env.example` to `.env` and set `ANTHROPIC_API_KEY` locally.
2. In one terminal, run `npm run start:server` (port 8000).
3. In another, run `npm start` (port 3000). The React dev server proxies `/api/chat`.

For a production preview, run `npm run build`, then `npm run start:server` and open
`http://localhost:8000`. The server serves the built website and its browser routes.

## Cloudflare Workers Free

The chatbot API and standalone preview are deployed at
https://art4hearts-chat.vedant13688.workers.dev/. See `worker/README.md` for
deployment, testing, key handling, and reconnecting the existing static website.
The Cloudflare setup uses free static assets and Worker compute with an encrypted
Anthropic key, shared validation/redaction, and native rate limits. The main
website stays on Render static hosting with chat hidden.

## Older Render web-service deployment

The previous Render configuration described a static site. A static site cannot
run the chat backend. The updated `render.yaml` describes a Node web service with
`npm ci && npm run build` and `npm run start:server`.

If the website already uses an existing Render static service, create a **Node web
service** from this repository using these settings, configure and verify it, then
move the existing custom domain to that service. Editing the YAML alone does not
convert the existing static service into a web service. Deployment must be completed separately after the code is pushed to GitHub.

Set these in the web service's environment:

- `ANTHROPIC_API_KEY`: your existing Anthropic key, stored only in the hosting secret settings.
- `A4H_MODEL`: defaults to the supplied agent's `claude-sonnet-5`; change it to a model available to your account if necessary.
- `A4H_ORIGINS`: the exact website origins, separated by commas. Include a preview origin while verifying deployment.
- `A4H_TRUST_PROXY=1`: only for the trusted hosting proxy that supplies the client IP header.
- `A4H_BLOCKED_NAMES`: optional protected names separated by `|`; never put these in React variables.

Use `/api/health` for process health. Without a configured API key, chat responds
with 503 and the panel offers retry and the team's email. Provider failures return
502; they are not presented as successful AI answers.

The backend caps input/history, permits only user/assistant turns, applies output
filters, times out upstream calls, and limits a single process to 20 questions per
visitor and 100 total per five minutes, with four concurrent calls. These counters
reset on restart and are not shared across instances; use hosting edge limits and
Anthropic spend limits for a public deployment.

## Update knowledge

Rebuild `pack/public.md` in the original agent project using its existing workflow,
then replace `server/knowledge/public.md`. If the assistant's behavior changes,
replace `server/knowledge/system_prompt.md` too. Rebuild and redeploy the website.
The supplied knowledge snapshot was built on **August 23, 2026**. Review changing
dates and donation policies before launch.

## Verify

- `npm run test:server`: API validation, public-pack wiring, output filters, rate limiting, origin checks, and static file boundaries.
- `CI=true npm test -- --watchAll=false --runInBand`: widget behavior, conversational history, retry, keyboard focus, and safe Markdown.
- `npm run build`: production compilation.

Provider contract: [Anthropic Messages API](https://platform.claude.com/docs/en/api/messages/create).

## Integration validation (October 12, 2026)

All six backend tests and five widget tests passed, including the preview-only visibility check. A real question returned HTTP
200 using the original agent configuration without copying its credentials. The
widget also passed a strict, isolated TypeScript check. The production bundle
compiled, but the existing full-project TypeScript checking process exhausted its
heap; full-project type checking remains incomplete.
