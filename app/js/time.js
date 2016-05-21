function getTime() {
    serverTime = new Date(servertime);
    console.info("Server time: " + serverTime);

    servertimestamp = Math.floor(serverTime.getTime() / 1000);
    console.info("Server timestamp in seconds: " + servertimestamp)

    expirationTime = new Date(servertime);
    expirationTime.setMinutes(serverTime.getMinutes() + 1);
    expirationTime.setSeconds(0, 0);


    console.info("Server time seconds: " + serverTime.getSeconds())
    if (serverTime.getSeconds() > 30) {
        expirationTime.setMinutes(serverTime.getMinutes() + 2);
    }
    console.info("Expiration time: " + expirationTime);

    expirationtimestamp = Math.floor(expirationTime.getTime() / 1000);
    console.info("Expiration timestamp in seconds: " + expirationtimestamp)

};
