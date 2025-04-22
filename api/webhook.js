export const config = {
    api: {
      bodyParser: true,
    },
  };
  
  export default async function handler(req, res) {
    if (req.method === 'POST') {
      console.log('✅ Webhook reçu :', req.body);
      res.status(200).json({ message: 'Webhook reçu avec succès' });
    } else {
      res.status(405).json({ error: 'Méthode non autorisée' });
    }
  }
  