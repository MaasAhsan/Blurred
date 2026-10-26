// Tiny Upstash/Vercel Redis REST client (no dependencies).
// Vercel's Upstash Redis integration injects KV_REST_API_URL and KV_REST_API_TOKEN.
const cfg = () => ({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
});
export const configured = () => { const c = cfg(); return !!(c.url && c.token); };
export async function redis(commands) {
  const { url, token } = cfg();
  const r = await fetch(url.replace(/\/$/, '') + '/pipeline', {
    method: 'POST',
    headers: { authorization: 'Bearer ' + token, 'content-type': 'application/json' },
    body: JSON.stringify(commands),
    signal: AbortSignal.timeout(5000),
  });
  if (!r.ok) throw new Error('store ' + r.status);
  return (await r.json()).map((x) => { if (x.error) throw new Error(x.error); return x.result; });
}
// Same day numbering as the client: days since 2026-01-01.
export const today = () => Math.floor(Date.now() / 864e5) - Math.floor(Date.UTC(2026, 0, 1) / 864e5);
