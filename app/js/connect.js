function createConnection() {

    getCookies(https_url, "ssid", function(ssid) {
        console.info(JSON.stringify({ssid: ssid}));
        localStorage.setItem("ssid", ssid);
    });

    socket = getWebSocket();

};
