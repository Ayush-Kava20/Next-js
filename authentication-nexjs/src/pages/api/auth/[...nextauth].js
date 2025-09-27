import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "../../../lib/db";
import {checkPassword} from "../../../lib/auth";

export default NextAuth({
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const client = await connectToDatabase();
                const db = client.db();
                const user = await db.collection('users').findOne({email: credentials.email});
                if (!user) {
                    client.close();
                    throw new Error('No user found!');
                }
                const isValid = await checkPassword(credentials.password, user.password);
                if (!isValid) {
                    client.close();
                    throw new Error('Could not log you in!');
                }
                client.close();
                return { id: user._id.toString(), email: user.email };
            }
        })
    ],
})