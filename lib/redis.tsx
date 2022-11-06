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
    if (process.env.BUILD_TYPE?.toLowerCase() == "development") return; 
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

    if (process.env.BUILD_TYPE?.toLowerCase() != "development") {
        var currentdate = new Date(); 
        var datetime = currentdate.getFullYear() + "-"
                        + (currentdate.getMonth()+1)  + "-" 
                        + currentdate.getDate() + " "  
                        + currentdate.getHours() + ":"  
                        + currentdate.getMinutes() + ":" 
                        + currentdate.getSeconds();
        client.json.set('data', '$.totalMealPlanReads', Number(userData["totalMealPlanReads"]) + 1);
        client.json.set('data', '$.timeSinceLastMealPlanRead', datetime);
    }; 

    const data = await client.json.get('meal-plan-v2');

    return data
}

export async function addRating(body: any) {
    if (Number(body) > 4 || Number(body) < 0) return "muhahahahahhaha... foolish boy";

    await axios.get(process.env.TIMEZONE_URL)
        .then(async function (response : any) {
            const today = new Date(response.data.timestamp * 1000);    
            const yesterday = new Date(today.setDate(today.getDate() - 1)).getDay();
            const day = weekday[yesterday]

            const userData : any = await client.json.get('data');
            const mealData : any = await client.json.get('meal-plan-v2');
            const Rating = mealData[day].Rating.split(",");

            const RatingValue = Number(Rating[0]) + Number(body);
            const RatingAmount = Number(Rating[1]) + 1;
            mealData[day].Rating = RatingValue + "," + RatingAmount;

            if (process.env.BUILD_TYPE?.toLowerCase() != "development") {
                client.json.set('data', '$.totalRatings', Number(userData["totalRatings"]) + 1)
                client.json.set('data', '$.totalRatingsAmount', Number(userData["totalRatingsAmount"]) + Number(body));
                client.json.set('data', '$.timeSinceLastRating', response.data.formatted);
            }
            
            await client.json.set('meal-plan-v2', '$', mealData);

            return "yah"
        })
        .catch(function (error : any) {
            console.log(error);
        })

    return "probably worked... idk cant be bothered to make a check"
}

export async function castGameParticipation(body : any) {

}

export async function claimWin(body : any) {

}

export async function updateGame(body : any) {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    const dateData = await axios.get(process.env.TIMEZONE_URL);
    const formattedYesterdayDate : any = new Date(dateData.data.timestamp * 1000);
    formattedYesterdayDate.setDate(formattedYesterdayDate.getDate() - 1);
    const startDate : any = new Date(formattedYesterdayDate.getFullYear(), 0, 1);
    var days = Math.floor((formattedYesterdayDate - startDate) /
        (24 * 60 * 60 * 1000));
    var weekNumber = Math.ceil(days / 7);
    var yesterdayDay = weekday[formattedYesterdayDate.getDay()];

    const gameData : any = await client.json.get('pulje_game');
    const durationInSeconds = (gameData.Time - dateData.data.timestamp);
    let hours : any = durationInSeconds / 3600;
    let mins : any = (durationInSeconds % 3600) / 60;
    let secs : any = (mins * 60) % 60;

    hours = Math.trunc(hours); mins = Math.trunc(mins); secs = Math.trunc(secs);
    if (hours.toString().length == 1) { hours = "0" + (hours.toString()) }
    if (mins.toString().length == 1) { mins = "0" + (mins.toString()) }
    if (secs.toString().length == 1) { secs = "0" + (secs.toString()) }
    const timestamp = hours + ":" + mins + ":" + secs;
    const pointsInGame = Math.trunc(Math.pow(2, gameData.Participants.length) - 1);

    if (durationInSeconds <= 0 ) {
        var mealPlan : any = await client.json.get('meal-plan-v2');
        mealPlan = mealPlan["Editor"][weekNumber][yesterdayDay];
        await gameData.Participants.sort((a : any, b : any) => {
            var firstRating = Math.abs(mealPlan.Rating.Amount - a[1]);
            var secondRating = Math.abs(mealPlan.Rating.Amount - b[1]);

            if (Math.min(firstRating, secondRating) == firstRating) {
                return -1
            } else {
                return 1
            }
        });
        
        var usersData : any = await client.HGETALL("users_data");
        [0,1,2].map(index => {
            var userData = JSON.parse(usersData[gameData.Participants[index][0]]);
            userData["Points"] += Math.trunc(pointsInGame / 3);
            if (userData["DidWin"] != -1) { // If this is the case then the user has won multiple games without being on the site to claim. This should technically not be possible.
                userData["DidWin"] += userData["Points"]
            } else {
                userData["DidWin"] = userData["Points"];
            }
            
            usersData[gameData.Participants[index][0]] = JSON.stringify(userData);
        })

        console.log(usersData);
    }
    
    return {message: "OK", serverTimestamp: timestamp, seconds: durationInSeconds, participants: gameData.Participants.length, points: pointsInGame}
}