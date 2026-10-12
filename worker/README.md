# Art4Hearts on Cloudflare Workers Free

This Worker runs the Claude chat endpoint and serves a small standalone preview.
The main website stays on its existing Render static service and uses this Worker for chat.
Cloudflare's Workers dashboard was verified to show the Free allowance of
100,000 requests/day and no existing applications during setup.

## Live preview

https://art4hearts-chat.vedant13688.workers.dev/

The Worker and encrypted Anthropic secret have been deployed. Chat has been
re-enabled on the main website and points to the Cloudflare API.

## What is included

- `/`: standalone preview using the same React chat widget as the website.
- `/api/chat`: Claude Messages API, public knowledge, prompt caching, input
  validation, output redaction, timeouts, and restricted browser origins.
- `/api/health`: process health without contacting Claude or exposing secrets.
- Per-visitor rate limit: 5 questions/minute; aggregate: 20/minute per Cloudflare
  location. These limits are not a worldwide spend cap; configure spend limits
  in the Anthropic account as well.

No paid storage, database, Durable Object, AI Gateway, or Workers AI binding is
required. Claude API usage is billed by Anthropic. No Cloudflare plan upgrade is
part of this setup. The Worker is bundled separately from the website, so it
does not need the site's legacy full-project TypeScript checker.

## Deploy

From the repository root:

```sh
npm ci --prefix worker
npm --prefix worker run check
```

Authorize Cloudflare's Wrangler deployment tool with account/user read access
and Worker-script edit access. Keep authentication in Wrangler's own local
configuration, outside the tracked repository.

Then deploy from `worker/`:

```sh
npx wrangler deploy
npx wrangler secret put ANTHROPIC_API_KEY
```

Enter the existing Anthropic key into the secret prompt; never commit the key,
put it in `wrangler.jsonc`, or place it in a `REACT_APP_` variable. Uploading the
key stores it only as a Cloudflare encrypted Worker secret. `wrangler secret put`
publishes an updated Worker version immediately.

Use the exact `workers.dev` URL returned by Wrangler. `/api/health` should return
JSON, and the bottom-right chat circle should return an AI answer. The preview's
own origin is allowed automatically; `A4H_ORIGINS` lists the main website and the
existing Render preview for future integration.

## Main website connection

The website widget selects the deployed Cloudflare `/api/chat` URL automatically
on `art4heartsinternational.org`, `www.art4heartsinternational.org`, and the older
Render preview. No main-site environment change or domain move is needed.
Local development and this standalone preview retain same-origin endpoints.

If the backend URL changes later, set the public `REACT_APP_CHAT_API_URL` build
variable on the Render static service and rebuild. The Anthropic key always stays
in the Worker secret, never in the frontend or that public variable.

## Local verification

```sh
npm --prefix worker test
npm --prefix worker run build
npm --prefix worker run dev
```

The Worker tests and Node backend tests cover the shared validation/redaction
policy. The website's existing widget tests cover rendering, conversation
history, retry, focus, and main-site endpoint routing. The standalone preview and
Worker bundle passed their deployment dry run during preparation.

Cloudflare documentation:

- https://developers.cloudflare.com/workers/platform/pricing/
- https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/
- https://developers.cloudflare.com/workers/configuration/secrets/
