import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    if (
      !name ||
      !email ||
      !message ||
      !email.includes('@') ||
      message.trim().length === 0 ||
      name.trim().length === 0
    ) {
      res.status(400).json({ error: 'Invalid input' });
      return;
    }

    const newMessage = { name, email, message };
    let client;

    try {
      client = await MongoClient.connect(process.env.MONGODB_URI as string);
    } catch (error) {
      res.status(500).json({ error: 'Failed to connect to database' });
      return;
    }
// MONGODB_URI = "mongodb+srv://nextjs-user:Next@cluster0.4umgihu.mongodb.net/nextjs?retryWrites=true&w=majority&appName=Cluster0"
    const db = client.db();
    try {
      const result = await db.collection(process.env.MONGODB_COLLECTION as string).insertOne(newMessage);
    } catch (error) {
      client.close();
      res.status(500).json({ error: 'Failed to insert message' });
      return;
    }

    client.close();
    res.status(200).json({ message: 'Message Successfully Stored' });
  }
}

export default handler;
