function Martingale() {

    var buyed = localStorage.getItem("buyed");
    var show_value = localStorage.getItem("show_value");

    getTime();

    if (serverTime.getSeconds() == 2) {
        localStorage.setItem("current_value", show_value);
    };

    if (serverTime.getSeconds() == 1) {
        localStorage.setItem("start_value", show_value);

        var start_value = localStorage.getItem("start_value");
        var current_value = localStorage.getItem("current_value");

        if (current_value) {

            if (start_value > current_value ) {
                var direction = localStorage.setItem("direction", "call");
                buyActive();
            }
            
            if (start_value < current_value) {
                var direction = localStorage.setItem("direction", "put");
                buyActive();
            }
        }
    };
};

function checkProfit() {

    var profit_amount = localStorage.getItem("profit_amount");
    var start_lot = localStorage.getItem("start_lot");
    var current_lot = localStorage.getItem("current_lot");
    var martin_leverage = localStorage.getItem("martin_leverage");

    if (profit_amount == current_lot) {
        if (martin_leverage < 5) {
            console.warn("Ничья пробуем еще раз");

            chrome.notifications.create("", {
                type: "basic",
                iconUrl: "img/logo_w.png",
                title: "IQ Option bot",
                message: "Ничья пробуем еще раз"
            });
            localStorage.setItem("martin_leverage", martin_leverage + 1)

        }
        else {
            console.warn("Ничья но мартин большой, начинаем сначала");
            chrome.notifications.create("", {
                type: "basic",
                iconUrl: "img/logo_w.png",
                title: "IQ Option bot",
                message: "Ничья но мартин большой, начинаем сначала"
            });

            localStorage.setItem("current_lot", start_lot);
            localStorage.setItem("martin_leverage", 0);
        }
    };

    if (profit_amount > 0) {
        console.warn("Выиграли")
        chrome.notifications.create("", {
            type: "basic",
            iconUrl: "img/logo_w.png",
            title: "IQ Option bot",
            message: "Выиграли"
        });
        localStorage.setItem("current_lot", start_lot);
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
        localStorage.setItem("current_lot", current_lot * 2.5);
        localStorage.setItem("martin_leverage", +martin_leverage + 1);
    }
};
