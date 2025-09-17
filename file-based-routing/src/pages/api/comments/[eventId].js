import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  if (req.method === 'POST') {
    const eventId = req.query.eventId;
    const { email, name, text } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db();
    const result = await db.collection('comments').insertOne(newComment);

    newComment.id = result.insertedId;
    client.close();

    res.status(201).json({ message: 'Comment added.', comment: newComment });
  }

  if (req.method === 'GET') {
    const eventId = req.query.eventId;

    const db = client.db();
    const comments = await db
      .collection('comments')
      .find({ eventId: eventId })
      .sort({ _id: -1 })
      .toArray();
    client.close();

    res.status(200).json({ comments: comments });
  }
}
