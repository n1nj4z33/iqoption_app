function Martingale() {

    var buyed = localStorage.getItem("buyed");

    getTime();

    if (serverTime.getSeconds() == 50) {
        getCandles();

        var last_candle = localStorage.getItem("last_candle");
        console.info("last_candle: " + last_candle);
        var current_candle = localStorage.getItem("current_candle");
        console.info("current_candle: " + current_candle);

        chrome.notifications.create("", {
            type: "list",
            iconUrl: "img/logo_w.png",
            title: "IQ Option bot",
            message: "Свечи",
            items: [{ title: "Последняя свеча", message: last_candle},
                    { title: "Текущая свеча", message: current_candle}]       
        });

        if (buyed == "false") {

            if (last_candle == CandleType.green) {
                var direction = localStorage.setItem("direction", "call");
                buyActive();
            }
            
            if (last_candle == CandleType.red) {
                var direction = localStorage.setItem("direction", "put");
                buyActive();
            }
        }
    }
};

function checkProfit() {

    var profit = localStorage.getItem("profit");
    var lot = localStorage.getItem("lot");
    var martin_leverage = localStorage.getItem("martin_leverage");

    if (profit == lot) {
        if (martin_leverage < 5) {
            console.warn("Ничья пробуем еще раз");

            chrome.notifications.create("", {
                type: "basic",
                iconUrl: "img/logo_w.png",
                title: "IQ Option bot",
                message: "Ничья пробуем еще раз"
            });

        }
        else {
            console.warn("Ничья но мартин большой, начинаем сначала");
            chrome.notifications.create("", {
                type: "basic",
                iconUrl: "img/logo_w.png",
                title: "IQ Option bot",
                message: "Ничья но мартин большой, начинаем сначала"
            });

            localStorage.setItem("lot", 30);
            localStorage.setItem("martin_leverage", 0);
        }
    }
    
    if (profit > 0) {
        console.warn("Выиграли")
        chrome.notifications.create("", {
            type: "basic",
            iconUrl: "img/logo_w.png",
            title: "IQ Option bot",
            message: "Выиграли"
        });
        localStorage.setItem("lot", 30);
        localStorage.setItem("martin_leverage", 0);
    }
    else {
        console.warn("Проиграли увеличиваем ставку");
        chrome.notifications.create("", {
            type: "basic",
            iconUrl: "img/logo_w.png",
            title: "IQ Option bot",
            message: "Проиграли увеличиваем ставку"
        });
        localStorage.setItem("lot", lot * 2.5);
        localStorage.setItem("martin_leverage", +martin_leverage + 1);
    }
    
}
