import axios from 'axios';
import cookie from 'cookie';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const code = req.query.code;
  const state = req.query.state;

  // Parse cookies manually (because bodyParser is false)
  const cookies = cookie.parse(req.headers.cookie || '');
  const savedState = cookies.csrfState;

  if (!code || !state || state !== savedState) {
    return res.status(400).json({ error: 'Invalid state or missing code' });
  }

  try {
    const response = await axios.post('https://open.tiktokapis.com/v2/oauth/token/', {
      client_key: process.env.TIKTOK_CLIENT_KEY,
      client_secret: process.env.TIKTOK_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: process.env.TIKTOK_REDIRECT_URI,
    }, {
      headers: { 'Content-Type': 'application/json' },
    });

    const { access_token, refresh_token, open_id, scope, expires_in } = response.data;

    // You can optionally save the tokens in a secure cookie or DB
    res.status(200).json({
      message: 'Success! Tokens received',
      access_token,
      refresh_token,
      open_id,
      scope,
      expires_in,
    });
  } catch (err) {
    console.error('TikTok token exchange failed:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to exchange code for tokens' });
  }
}
