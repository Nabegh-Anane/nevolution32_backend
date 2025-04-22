const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const { CLIENT_KEY, CLIENT_SECRET, REDIRECT_URI } = process.env;

app.get('/auth/tiktok', (req, res) => {
  const authUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${CLIENT_KEY}&response_type=code&scope=user.info.basic,user.info.profile,video.upload&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=xyz&nonce=xyz&prompt=consent`;
  res.redirect(authUrl);
});

app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const response = await axios.post('https://open.tiktokapis.com/v2/oauth/token/', {
      client_key: CLIENT_KEY,
      client_secret: CLIENT_SECRET,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const { access_token, refresh_token } = response.data;

    res.json({
      access_token,
      refresh_token
    });

  } catch (err) {
    console.error('Token error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to retrieve tokens' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
