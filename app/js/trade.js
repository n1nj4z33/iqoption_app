function Trade() {

    var trade = localStorage.getItem("trade");
    var active = localStorage.getItem("active");
    var strategy = localStorage.getItem("strategy");



    localStorage.setItem("martin_leverage", 0);
    localStorage.setItem("buyed", false);

    if (trade == "true") {
        console.warn("Начинаю торговать...");
        chrome.notifications.create("", {
            type: "basic",
            iconUrl: "img/logo_w.png",
            title: "IQ Option bot",
            message: "Начинаю торговать..."
        });

        timerId = setInterval(function() { 

            socket.send(JSON.stringify({"name": "setActives", "msg": {"actives": [Actives[active]]}}))

            if (strategy == "martingale"){
                Martingale();
            }
        }, 1000);
    }
    else {
        console.warn("Заканчиваю торговлю...");
        chrome.notifications.create("", {
            type: "basic",
            iconUrl: "img/logo_w.png",
            title: "IQ Option bot",
            message: "Заканчиваю торговлю..."
        });
        clearInterval(timerId);
        socket.send(JSON.stringify({"name": "setActives", "msg": {"actives": []}}))
    }
};
