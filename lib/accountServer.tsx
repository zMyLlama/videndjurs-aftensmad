import { createClient, RedisClientType } from 'redis';
var forge = require('node-forge');
const https = require('https');

require('dotenv').config()
const axios = require('axios').create({
    httpsAgent: new https.Agent({ keepAlive: true }),
});

function containsWhitespace(str : any) {
    return /\s/.test(str);
}

function validatePassword(passwordInput : string, repeatPasswordInput : string) {
    return (passwordInput === repeatPasswordInput && passwordInput != "" && Number(passwordInput.length) >= 5 && Number(passwordInput.length) <= 20 && !containsWhitespace(passwordInput));
}
function validateUsername(usernameInput : string) {
    return (!containsWhitespace(usernameInput) && Number(usernameInput.length) <= 15 && usernameInput != "");
}
function validateEmail(emailInput : string) {
    if (containsWhitespace(emailInput)) return false;
    if (String(emailInput.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) !== "null") {
        return true;
    }

    return false;
}

const checkForEmail = async function(client : any, email : string) {
    return new Promise(async function (resolve) {
        const allUserEmails = await client.HGETALL("users_mail");
        for (const index in allUserEmails) {
            if (allUserEmails[index] === email) resolve(true);
        }
        resolve(false);
    });
}

const delay = async (ms: number) => new Promise(res => setTimeout(res, ms));

const safetyDisconnect = async function(client : any) {
    await delay(10000); // Wait for 10 seconds.
    const clientStatus = await client.ping(); // Check client status
    if (clientStatus) { // If client is still open after 10 seconds then we disconnect it.
        client.quit();
    }
}

export async function createAccount(query: any) {
    var status = false;
    var message = "Hov, der er sku noget galt. Kontakt Noel eller Tim fra 1.X. (E:UNKNOWN_S)";

    const client = await createClient({ url: process.env.REDIS_URL }); // Prepares connection to redis
    await client.connect(); // Opens up a connection to redis
    safetyDisconnect(client);

    var emailValid : boolean = true;
    if (query.email !== "") emailValid = validateEmail(query.email.toString());

    if (validatePassword(query.password.toString(), query["repeat-password"].toString()) && validateUsername(query.username.toString()) && emailValid) {
        const quota = await axios.get("https://www.random.org/quota/?format=plain");
        if (Number(quota.data) < 0) {
            status = false; message = "Hov, der er sku noget galt. Kontakt Noel eller Tim fra 1.X. (E:QUOTA)"
            await client.quit();
            await delay(Math.random() * (400 - 600) + 600);
            return { status: status, message: message };
        }

        const randomString = await axios.get("https://www.random.org/strings/?num=1&len=20&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new");
        const salt = randomString.data.toString().replace(/\s/g, "");

        var emailExists : any = false;
        if (query.email !== "") emailExists = await checkForEmail(client, query.email.toString());
        if (emailExists) {
            status = false; message = "Der findes allerede en konto med denne email."
            await client.quit();
            await delay(Math.random() * (400 - 600) + 600);
            return { status: status, message: message };
        }

        const userExists = await client.HEXISTS("users_password", query.username.toString().toLowerCase())
        if (userExists) {
            status = false; message = "Der findes allerede en konto med dette brugernavn."
            await client.quit();
            await delay(Math.random() * (400 - 600) + 600);
            return { status: status, message: message };
        }

        client.HSET("users_data", query.username.toString().toLowerCase(), JSON.stringify({ Points: 0 }))
        client.SADD("users_username", query.username.toString());
        client.HSET("users_salt", query.username.toString().toLowerCase(), salt);
        if (query.email !== "") client.HSET("users_mail", query.username.toString().toLowerCase(), query.email);
        var hashedPassword = await forge.md.sha256.create();
        await hashedPassword.update(salt + query.password.toString());
        hashedPassword = await hashedPassword.digest().toHex().toString();

        await client.HSET("users_password", query.username.toString().toLowerCase(), hashedPassword);
        await delay(500);
        await client.quit();

        status = true;
        message = "Du kan nu logge ind på din nye konto."
    }

    await delay(500);
    return { status: status, message: message };
}

export async function login(query : any) {
    var status = false;
    var message = "Hov, der er sku noget galt. Kontakt Noel eller Tim fra 1.X. (E:UNKNOWN_L)";

    const client = await createClient({ url: process.env.REDIS_URL }); // Prepares connection to redis
    await client.connect(); // Opens up a connection to redis
    safetyDisconnect(client);

    const userExists = await client.SISMEMBER("users_username", query.username.toString())
    if (!userExists) {
        status = false; message = "Brugernavn eller password er forkert."
        await client.quit();
        await delay(Math.random() * (50 - 125) + 125);
        return { status: status, message: message };
    }

    const typedPassword = query.password.toString();
    const userSalt = await client.HGET("users_salt", query.username.toString().toLowerCase());
    const userPassword = await client.HGET("users_password", query.username.toString().toLowerCase());

    var hashedGivenPassword = await forge.md.sha256.create();
    await hashedGivenPassword.update(userSalt + typedPassword);
    hashedGivenPassword = await hashedGivenPassword.digest().toHex().toString();

    if (hashedGivenPassword === userPassword) {
        status = true; message = userPassword!.toString();
        await delay(150);
        await client.quit();
    } else {
        status = false; message = "Brugernavn eller password er forkert."
        await client.quit();
        await delay(Math.random() * (50 - 125) + 125);
        return { status: status, message: message };
    }

    await delay(300);
    return { status: status, message: message };
}

export async function loginWithHash(query : any) {
    const client = await createClient({ url: process.env.REDIS_URL }); // Prepares connection to redis
    await client.connect(); // Opens up a connection to redis
    safetyDisconnect(client);

    try { query.hash.toString() } catch (err) { return { message: "NOT ACCEPTABLE" }; }
    query.hash = query.hash.toString();

    var actualUsername : any;
    var lowerUsername : any;
    const allUsersPassword = await client.HGETALL("users_password");
    for (const index in allUsersPassword) {
        if (allUsersPassword[index] === query.hash) {
            lowerUsername = index;
            break;
        }
    }

    if (!lowerUsername) return { message: "NOT ACCEPTABLE" };

    var userData : any = await client.HGET("users_data", lowerUsername);
    const allUsernames = await client.SMEMBERS("users_username");
    await allUsernames.forEach(username => {
        if (username.toLowerCase() === lowerUsername) {
            actualUsername = username;
        }
    })
    try { userData = JSON.parse(userData); userData["username"] = actualUsername; } catch (e) { return { message: "NOT ACCEPTABLE" }; }
    
    if (actualUsername && userData) {
        return { message: "OK", data: userData};
    }

    return { message: "NOT ACCEPTABLE" };
}