// Ce bloc active le parsing JSON pour Vercel Serverless Functions
export const config = {
    api: {
      bodyParser: true,
    },
  };
  
  export default async function handler(req, res) {
    if (req.method === 'POST') {
      console.log('✅ Webhook reçu :', req.body);
  
      // Tu peux ici faire : sauvegarde en DB, déclencher un process, etc.
      res.status(200).json({ message: 'Webhook reçu avec succès' });
    } else {
      res.status(405).json({ error: 'Méthode non autorisée' });
    }
  }
  