import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

export async function connectDatabase() {
    dotenv.config();
    const client = await MongoClient.connect(`mongodb+srv://rornfdlek:${process.env.PASSWORD}@cluster0.vyy0p.mongodb.net/events?retryWrites=true&w=majority`);

    return client;
}

export async function insertDocument(client, collection, document) {
    const db = client.db();
    const result = await db.collection(collection).insertOne(document);

    return result;
}

export async function getAllDocuments(client, collection, sort) {
    const db = client.db();
    // id를 기준으로 descending order로 sort 
    const documents = await db.collection(collection).find().sort(sort).toArray();
    return documents;
}