# Blurred

Static site plus two small Vercel functions. No build step.

## Deploy
1. Push this folder to a Git repo and import it in Vercel (framework preset: Other), or run `npx vercel` in this folder.
2. For live player comparison: in the Vercel dashboard open Storage, add **Upstash Redis** from the Marketplace and connect it to the project. That injects `KV_REST_API_URL` and `KV_REST_API_TOKEN`. Redeploy.
   Without it the site still works and shows a modeled curve instead of live data.

## Local
`npx vercel dev` (serves the site and /api). The developer panel (click the title 5 times or type `devmode`) only works on localhost; see `DEV` near the top of `app.js`.

## Files
- `index.html`, `styles.css`, `app.js`, `theme.js`, `favicon.svg`: the game
- `api/score.js`, `api/dist.js`, `lib/store.js`: scoreboard (one score per player per day, 5-point buckets, data expires after 3 days)
- `vercel.json`: security headers including a strict Content-Security-Policy. If you add a script, font host or image host, allow it there.


Note: localStorage and Redis keys still start with `haze:` on purpose, so existing players keep their streaks and stats.

Languages: the game language (English, Mandarin Chinese, Hindi, Spanish, Arabic, French, Bengali, Portuguese, Indonesian, Urdu) is chosen with the globe button. Photos are the same in every language; names, hints and article links come from that language's Wikipedia through the langlinks of the English article. Choice is stored in `haze:lang`.
