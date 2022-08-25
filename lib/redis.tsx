import { createClient } from 'redis';
require('dotenv').config()

const client = createClient({ url: process.env.REDIS_URL });

client.on('error', (err) => console.log('Redis experienced an error: ', err));
client.on("connect", () => console.log('Redis is connected'))
client.on("disconnect", () => console.log('Redis has disconnected'))

export async function getData() {
    await client.connect();

    const data = await client.json.get('meal-plan');

    client.disconnect();
    return data
}   

export async function addRating() {
    await client.connect();

    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 1)).getDay();
    const data = await client.json.get('meal-plan');
    console.log(yesterday);
    
    

    client.disconnect();
    return "success"
}