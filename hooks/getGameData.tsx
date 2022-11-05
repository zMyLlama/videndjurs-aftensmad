import getHostName from './getHostName';

async function getGameData() {
    /*
        Function that fetchs the pulje game data on the server and populates the client with it.
    */
    const res = await fetch(getHostName() + '/api/updateGame', {
        headers: {
        'CONTENT_TYPE': 'application/json',
        },
        method: 'GET',
    })

    const result = await res.json();
    return result;
}

export default getGameData;