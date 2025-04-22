export default function handler(req, res) {
    const authUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${process.env.CLIENT_KEY}&response_type=code&scope=user.info.basic,user.info.profile,video.upload&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}&state=xyz&nonce=xyz&prompt=consent`;
    res.redirect(authUrl);
  }
  