var Actives = {
    EURUSD: 1,
    AUDUSD: 99,
    EURUSD_OTC: 76,
    EURAUD: 108,
    APPLE: 32
};

function buyActive () {
    
    var active = localStorage.getItem("active");
    var option = localStorage.getItem("option");
    var current_lot = localStorage.getItem("current_lot");
    var direction = localStorage.getItem("direction");
    
    console.warn("Покупаю...");
    console.warn("Актив: " + active);
    console.warn("Опцион: " + option);
    console.warn("Ставка: " + current_lot);
    console.warn("Тип: " + direction);

    chrome.notifications.create("", {
        type: "list",
        iconUrl: "img/logo_w.png",
        title: "IQ Option bot",
        message: "Покупаю...",
        items: [{ title: "Актив", message: active},
                { title: "Опцион", message: option},
                { title: "Ставка", message: current_lot},
                { title: "Тип", message: direction}]        
    });


    console.info("expirationtimestamp: " + expirationtimestamp);
    console.info("servertimestamp: " + servertimestamp);

    socket.send(JSON.stringify({"name": "buyV2", "msg": {
        "price": current_lot,
        "exp": expirationtimestamp,
        "act": Actives[active],
        "type": option,
        "time": servertimestamp,
        "direction": direction}}));
};
