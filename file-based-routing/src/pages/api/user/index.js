import { MongoClient } from "mongodb";

export default async function handler(req, res){
    if (req.method === 'POST') {
        const email = req.body.email;
        console.log(process.env.MONGODB_URI);

        if (!email || !email.includes('@')) {
            res.status(422).json({ message: 'Invalid email address.' });
            return;
        }
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();

        await db.collection('emails').insertOne({ email: email });

        client.close();
        res.status(201).json({ message: 'Email registered successfully!', email: email });
    } 
}