// pages/api/auth.js

import { randomBytes } from 'crypto';

export default function handler(req, res) {
  const csrfState = randomBytes(16).toString('hex');
  res.setHeader("Set-Cookie", `csrfState=${csrfState}; HttpOnly; Path=/; Max-Age=600; Secure; SameSite=Lax`);

  const clientKey = process.env.TIKTOK_CLIENT_KEY;
 const redirectUri = encodeURIComponent(process.env.TIKTOK_REDIRECT_URI);

  const scope = [
    'user.info.basic',
    'user.info.profile',
    'user.info.stats',
    'video.upload',
    'video.list'
  ].join(',');

  const tiktokAuthUrl = `https://www.tiktok.com/v2/auth/authorize/?` +
    `client_key=${clientKey}` +
    `&response_type=code` +
    `&scope=${scope}` +
    `&redirect_uri=${redirectUri}` +
    `&state=${csrfState}` +
    `&disable_auto_auth=1`;

  res.redirect(tiktokAuthUrl);
}

export const config = {
  api: {
    bodyParser: false,
  },
};