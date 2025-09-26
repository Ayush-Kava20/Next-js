import connectToDatabase from "../../../lib/db";
import hashPassword from "../../../lib/auth";

export default async function handler(req, res) {
    const {email, password} = req.body;

    if (req.method === 'POST') {
        if (!email || !email.includes('@') || !password || password.trim().length < 7) {
            res.status(422).json({ message: 'Invalid input - password should also be at least 7 characters long.' });
            return;
        }

        const client = await connectToDatabase();
        const db = client.db();

        const existingUser = await db.collection('users').findOne({email: email});
        if (existingUser) {
            res.status(422).json({ message: 'User already exists!' });
            return;
        }

        const hashedPassword = await hashPassword(password);

        const result = await db.collection('users').insertOne({
            email: email,
            password: hashedPassword
        });


        res.status(201).json({ message: 'User created!' });
        client.close();
    }
}