import { createClient } from 'redis';
const http = require('http');
const https = require('https');

require('dotenv').config()
const axios = require('axios').create({
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true }),
});

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const client = createClient({ url: process.env.REDIS_URL });
client.connect()

const addConnectionToDatabase = async function() {
    const userData : any = await client.json.get('data');
    client.json.set('data', '$.totalClientConnections', Number(userData["totalClientConnections"]) + 1);
}


client.on('error', (err) => console.log('Redis experienced an error: ', err));
client.on("connect", () => {
    addConnectionToDatabase();
    console.log('Connected to Redis!')
})

process.on("exit", async function(){
    console.log("Disconnected from Redis!")
    client.quit();
});

export async function getData() {
    const userData : any = await client.json.get('data');
    var currentdate = new Date(); 
    var datetime = currentdate.getFullYear() + "-"
                    + (currentdate.getMonth()+1)  + "-" 
                    + currentdate.getDate() + " "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
    client.json.set('data', '$.totalMealPlanReads', Number(userData["totalMealPlanReads"]) + 1);
    client.json.set('data', '$.timeSinceLastMealPlanRead', datetime);

    const data = await client.json.get('meal-plan');

    return data
}

export async function addRating(body: any) {
    if (Number(body) > 4 && Number(body) < 0) return "muhahahahahhaha... foolish boy";

    await axios.get(process.env.TIMEZONE_URL)
        .then(async function (response : any) {
            const today = new Date(response.data.timestamp * 1000);    
            const yesterday = new Date(today.setDate(today.getDate() - 1)).getDay();
            const day = weekday[yesterday]

            const userData : any = await client.json.get('data');
            const mealData : any = await client.json.get('meal-plan');
            const Rating = mealData[day].Rating.split(",");

            const RatingValue = Number(Rating[0]) + Number(body);
            const RatingAmount = Number(Rating[1]) + 1;
            mealData[day].Rating = RatingValue + "," + RatingAmount;

            client.json.set('data', '$.totalRatings', Number(userData["totalRatings"]) + 1)
            client.json.set('data', '$.totalRatingsAmount', Number(userData["totalRatingsAmount"]) + Number(body));
            client.json.set('data', '$.timeSinceLastRating', response.data.formatted);
            await client.json.set('meal-plan', '$', mealData);

            return "yah"
        })
        .catch(function (error : any) {
            console.log(error);
        })

    return "probably worked... idk cant be bothered to make a check"
}