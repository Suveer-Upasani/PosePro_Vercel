import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  try {
    const url = await kv.get('posepro_ngrok_url');
    // Also try to read from config.json if KV is empty, or return null
    return res.status(200).json({ url: url || null });
  } catch (error) {
    console.error("KV Fetch Error:", error);
    return res.status(500).json({ error: 'Failed to fetch URL' });
  }
}
