import { redis, configured, today } from '../lib/store.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); return res.status(405).json({ error: 'method' }); }
  if (!configured()) { res.setHeader('Cache-Control', 'no-store'); return res.status(503).json({ error: 'not configured' }); }
  const q = String(req.query.day ?? '');
  const day = /^\d{1,5}$/.test(q) ? Number(q) : NaN;
  if (!Number.isInteger(day) || Math.abs(day - today()) > 2) { res.setHeader('Cache-Control', 'no-store'); return res.status(400).json({ error: 'day' }); }
  try {
    const [flat] = await redis([['HGETALL', `haze:b:${day}`]]);
    const bins = Array(21).fill(0);
    for (let i = 0; i + 1 < (flat || []).length; i += 2) {
      const k = Number(flat[i]);
      if (Number.isInteger(k) && k >= 0 && k <= 20) bins[k] = Number(flat[i + 1]) || 0;
    }
    res.setHeader('Cache-Control', 'public, s-maxage=5, stale-while-revalidate=10');
    return res.status(200).json({ bins });
  } catch {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(502).json({ error: 'store' });
  }
}
