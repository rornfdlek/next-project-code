import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

async function handler(req, res) {
    if(req.method === 'POST') {
        const userEmail = req.body.email;
        
        if(!userEmail || !userEmail.includes('@')) {
            // 422: user input was bad
            res.status(422).json({message: 'Invalid Email Address!'});
            return;
        }

        dotenv.config();
    
        const client = await MongoClient.connect(`mongodb+srv://rornfdlek:${process.env.PASSWORD}@cluster0.vyy0p.mongodb.net/newsletter?retryWrites=true&w=majority`);
        const db = client.db();
        await db.collection('emails').insertOne({email: userEmail});
        client.close();
        
        res.status(201).json({message: "Signed Up!"})
    }
}

export default handler;
