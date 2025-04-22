import axios from 'axios';
import cookie from 'cookie';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const { code, state } = req.query;

  // Parse cookies manually (because bodyParser is false)
  const cookies = cookie.parse(req.headers.cookie || '');
  const savedState = cookies.csrfState;

  console.log('Cookies in callback:', cookies);  // Log cookies to ensure csrfState is passed
  console.log('Received state in query:', state);  // Log the state from the query

  if (!code || !state || state !== savedState) {
    console.error('Invalid state or missing code:', { code, state, savedState });
    return res.status(400).json({ error: 'Invalid state or missing code' });
  }

  try {
    const tokenResponse = await axios.post(
      'https://open.tiktokapis.com/v2/oauth/token/',
      {
        client_key: process.env.TIKTOK_CLIENT_KEY,
        client_secret: process.env.TIKTOK_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.TIKTOK_REDIRECT_URI,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const { access_token, refresh_token, open_id, scope, expires_in } = tokenResponse.data;

    // Optionally save tokens in cookies or DB
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
    // Log full error response for debugging
    if (err.response) {
      console.error('TikTok error response:', err.response.data);
    }
    res.status(500).json({ error: 'Failed to exchange code for tokens' });
  }
}
