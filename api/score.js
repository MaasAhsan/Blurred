import { redis, configured, today } from '../lib/store.js';

// Adds a first-write-wins score for (day, cid) and bumps its 5-point bucket, atomically.
const ADD = `if redis.call('HSETNX',KEYS[1],ARGV[1],ARGV[2])==1 then redis.call('HINCRBY',KEYS[2],ARGV[3],1) redis.call('EXPIRE',KEYS[1],ARGV[4]) redis.call('EXPIRE',KEYS[2],ARGV[4]) return 1 end return 0`;
const TTL = 3 * 86400;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'method' }); }
  if (!configured()) return res.status(503).json({ error: 'not configured' });
  if (!/^application\/json/i.test(req.headers['content-type'] || '')) return res.status(415).json({ error: 'type' });
  const origin = req.headers.origin;
  try { if (origin && new URL(origin).host !== req.headers.host) return res.status(403).json({ error: 'origin' }); }
  catch { return res.status(403).json({ error: 'origin' }); }

  const b = req.body && typeof req.body === 'object' ? req.body : {};
  const { day, cid, score } = b;
  if (!Number.isInteger(day) || Math.abs(day - today()) > 1) return res.status(400).json({ error: 'day' });
  if (typeof cid !== 'string' || !/^[A-Za-z0-9-]{8,40}$/.test(cid)) return res.status(400).json({ error: 'cid' });
  if (!Number.isInteger(score) || score < 0 || score > 100) return res.status(400).json({ error: 'score' });

  try {
    const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
    const rl = `haze:rl:${ip}:${Math.floor(Date.now() / 60000)}`;
    const [hits] = await redis([['INCR', rl], ['EXPIRE', rl, 90]]);
    if (hits > 20) return res.status(429).json({ error: 'slow down' });
    const [added] = await redis([['EVAL', ADD, 2, `haze:s:${day}`, `haze:b:${day}`, cid, score, Math.min(20, Math.floor(score / 5)), TTL]]);
    return res.status(200).json({ ok: true, added: added === 1 });
  } catch {
    return res.status(502).json({ error: 'store' });
  }
}
