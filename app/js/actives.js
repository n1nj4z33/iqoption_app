var Actives = {
    EURUSD: 1,
    AUDUSD: 99,
    EURUSD_OTC: 76,
    EURAUD: 108
};

function buyActive () {
    
    var active = localStorage.getItem("active");
    var option = localStorage.getItem("option");
    var lot = localStorage.getItem("lot");
    var direction = localStorage.getItem("direction");
    
    console.warn("Покупаю...");
    console.warn("Актив: " + active);
    console.warn("Опцион: " + option);
    console.warn("Ставка: " + lot);
    console.warn("Тип: " + direction);

    chrome.notifications.create("", {
        type: "list",
        iconUrl: "img/logo_w.png",
        title: "IQ Option bot",
        message: "Покупаю...",
        items: [{ title: "Актив", message: active},
                { title: "Опцион", message: option},
                { title: "Ставка", message: lot},
                { title: "Тип", message: direction}]        
    });


    console.info("expirationtimestamp: " + expirationtimestamp);
    console.info("servertimestamp: " + servertimestamp);

    socket.send(JSON.stringify({"name": "buy", "msg": {
        "price": lot,
        "exp": expirationtimestamp,
        "act": Actives[active],
        "type": option,
        "time": servertimestamp,
        "direction": direction}}));
};
