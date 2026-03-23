import { kv } from '@vercel/kv';

export default async function (req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, password } = req.body || {};

  // Verify password using environment variable
  const securePassword = process.env.ADMIN_PASSWORD || 'Suveer123'; // Fallback for safety during transition
  if (password !== securePassword) {
    return res.status(401).json({ error: 'Incorrect Password' });
  }

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    await kv.set('posepro_ngrok_url', url);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("KV Update Error:", error);
    return res.status(500).json({ 
      error: 'Failed to save to database', 
      details: error.message 
    });
  }
}
