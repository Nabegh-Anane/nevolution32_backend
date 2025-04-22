const CLIENT_KEY = 'awfn48k0vef1z2gc';
const REDIRECT_URI = 'https://nevolution32-backend.vercel.app/api/callback';
const SCOPES = [
  'user.info.basic',
  'video.upload',
  'user.info.profile',
  'user.info.stats'
].join(',');

export default function handler(req, res) {
  const authUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${CLIENT_KEY}&scope=${SCOPES}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=your_custom_state`;

  res.redirect(authUrl);
}
