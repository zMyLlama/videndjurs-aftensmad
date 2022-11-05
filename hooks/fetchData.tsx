import getHostName from './getHostName';

async function fetchData() {
    /*
      Function that fetchs the data on the server and populates the client with it.
    */
    const res = await fetch(getHostName() + '/api/getData', {
        headers: {
        'CONTENT_TYPE': 'application/json',
        },
        method: 'GET',
    })

    const result = await res.json();
    return result;
}

export default fetchData;