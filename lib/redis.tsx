import { createClient } from 'redis';
require('dotenv').config()

const weekday = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const client = createClient({ url: process.env.REDIS_URL });
client.connect()

client.on('error', (err) => console.log('Redis experienced an error: ', err));
client.on("connect", () => {console.log('Connected to Redis!')})

export async function getData() {
    const data = await client.json.get('meal-plan');
    return data
}   

export async function addRating(body: any) {
    if (body > 4 && body < 0) return;

    console.log(body);
    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 1)).getDay();
    const day = weekday[yesterday]

    const data = await client.json.get('meal-plan');
    return day
}