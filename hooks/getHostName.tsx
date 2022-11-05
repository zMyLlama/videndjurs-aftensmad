function getHostName() {
    const URL = new window.URL(window.location.href).hostname;
    var finalURL = "https://" + URL;
    if (URL == "localhost") finalURL = "http://localhost:3000";
    return finalURL;
}

export default getHostName;