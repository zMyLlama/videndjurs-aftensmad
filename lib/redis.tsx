import { createClient } from 'redis';
require('dotenv').config()

const client = createClient({ url: process.env.REDIS_URL });
client.connect()

client.on('error', (err) => console.log('Redis experienced an error: ', err));
client.on("connect", () => {console.log('Connected to Redis!')})

export async function getData() {
    const data = await client.json.get('meal-plan');
    return data
}   

export async function addRating() {
    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 1)).getDay();
    const data = await client.json.get('meal-plan');
    console.log(yesterday);
    return "success"
}