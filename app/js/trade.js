function Trade() {

    var trade = localStorage.getItem("trade");
    var active = localStorage.getItem("active");
    var strategy = localStorage.getItem("strategy");
    var start_lot = localStorage.getItem("start_lot");

    localStorage.setItem("martin_leverage", 0);
    localStorage.setItem("buyed", false);
    localStorage.setItem("current_lot", start_lot);

    if (trade == "true") {
        console.warn("Начинаю торговать...");
        chrome.notifications.create("", {
            type: "basic",
            iconUrl: "img/logo_w.png",
            title: "IQ Option bot",
            message: "Начинаю торговать..."
        });

        socket.send(JSON.stringify({"name": "setActives", "msg": {"actives": [Actives[active]]}}))      

        timerId = setInterval(function() { 

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
