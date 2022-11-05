function secondsToTimestamp(seconds: number) {
    let hours : any = seconds / 3600;
    let mins : any = (seconds % 3600) / 60; 
    let secs : any = (mins * 60) % 60; 
    hours = Math.trunc(hours); mins = Math.trunc(mins); secs = Math.trunc(secs);

    if (hours.toString().length == 1) { hours = "0" + (hours.toString()) }
    if (mins.toString().length == 1) { mins = "0" + (mins.toString()) }
    if (secs.toString().length == 1) { secs = "0" + (secs.toString()) }

    return hours + ":" + mins + ":" + secs;
}

export default secondsToTimestamp;