export function calculateTime(argTime: number): string {
    const currentTime = new Date().getTime();
    let postTime = ((((currentTime - argTime) / 1000))) / 3600;
    if (postTime > 24) {
        postTime /= 24;
        return postTime.toFixed(0).toString().concat("d");


    } else if (postTime < 24 && postTime >= 1) {
        return postTime.toFixed(0).toString().concat("h");
    }
    else if (postTime < 1) {
        return (postTime * 60).toFixed().toString().concat("m");

    }
    return "NAN"

}
