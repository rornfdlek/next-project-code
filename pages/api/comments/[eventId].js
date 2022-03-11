import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

async function handler(req, res) {

    const eventId = req.query.eventId;

    dotenv.config();
    const client = await MongoClient.connect(`mongodb+srv://rornfdlek:${process.env.PASSWORD}@cluster0.vyy0p.mongodb.net/events?retryWrites=true&w=majority`);

    if(req.method === 'POST') {
        const {email, name, text} = req.body; 

        // add server-side validation
        if(!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
            res.status(422).json({message: 'Invalid Input!'})
            return;
        }

        const newComment = {
            email,
            name,
            text,
            eventId
        };

        const db = client.db();
        const result = await db.collection('comments').insertOne({newComment});

        console.log(result);

        newComment.id = result.insertedId;

        res.status(201).json({message: 'Added Comment!', comment: newComment})
    }

    if(req.method === 'GET') {
        const dummyList = [
            {id: 'c1', name: 'Haein', text: 'A first Comment'},
            {id: 'c2', name: 'Maeng', text: 'A second Comment'}
        ];
        res.status(200).json({comments: dummyList});
    }
    client.close();
}

export default handler;