import axios from 'axios';

export default async function handler(req, res) {
  const code = req.query.code;

  try {
    const response = await axios.post('https://open.tiktokapis.com/v2/oauth/token/', {
      client_key: process.env.CLIENT_KEY,
      client_secret: process.env.CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: process.env.REDIRECT_URI,
    }, {
      headers: { 'Content-Type': 'application/json' },
    });

    const { access_token, refresh_token } = response.data;

    res.status(200).json({ access_token, refresh_token });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to get tokens' });
  }
}
