function getWebSocket() {

    var wss_url = "wss://iqoption.com/echo/websocket";
    var socket = new WebSocket(wss_url);
    
    socket.onopen = function() {
        
        var ssid = localStorage.getItem("ssid");

        socket.send(JSON.stringify({"name": "ssid", "msg": ssid}))
        socket.send(JSON.stringify({"name": "subscribe", "msg": "deposited"}))
        socket.send(JSON.stringify({"name": "subscribe", "msg": "tradersPulse"}))
        socket.send(JSON.stringify({"name": "subscribe", "msg": "activeScheduleChange"}))
        socket.send(JSON.stringify({"name": "subscribe", "msg": "activeCommissionChange"}))
        socket.send(JSON.stringify({"name": "unSubscribe", "msg": "iqguard"}))
        socket.send(JSON.stringify({"name": "unSubscribe", "msg": "signal"}))
        socket.send(JSON.stringify({"name": "unSubscribe", "msg": "timeSync"}))
        socket.send(JSON.stringify({"name": "unSubscribe", "msg": "feedRecentBets"}))
        socket.send(JSON.stringify({"name": "unSubscribe", "msg": "feedRecentBets2"}))
        socket.send(JSON.stringify({"name": "unSubscribe", "msg": "feedTopTraders2"}))
        socket.send(JSON.stringify({"name": "unSubscribe", "msg": "feedRecentBetsMulti"}))
        socket.send(JSON.stringify({"name": "unSubscribe", "msg": "tournament"}))
        
        localStorage.setItem("connected", true);
    };

    socket.onmessage = function(event) {
        var incomingMessage = event.data;
        var json_data = JSON.parse(incomingMessage);
        
        if (json_data.name == "profile") {
            if (json_data.msg == false){
                console.error("Cant connect to websocket, need to login to " + https_url);
                localStorage.setItem("connected", false);
            }
            else {
                localStorage.setItem("connected", true);
            }
        };
        if (json_data.name == "timeSync") {
            servertime = json_data.msg;
        }
        if (json_data.name == "buyComplete") {
            if (json_data.msg.isSuccessful == false){
                console.error(json_data.msg.message);
                localStorage.setItem("buyed", false);
            }
            else {
                console.warn("Successfully buy")
                localStorage.setItem("buyed", true);
            };
        };
        if (json_data.name == "candles") {
            candlesData = json_data.msg.data;
        };
        if (json_data.name == "listInfoData") {
            profit_amount = json_data.msg[0]["profit_amount"];
            localStorage.setItem("profit_amount", profit_amount);
            localStorage.setItem("buyed", false);
            checkProfit();
            
        };
        if (json_data.name == "newChartData") {
            show_value = json_data.msg["show_value"];
            localStorage.setItem("show_value", show_value.toString().split(".").join(""));
        }
        // All websocket messages
        // console.log(incomingMessage);
    };

    socket.onerror = function(event) {
        var incomingMessage = event.data;
        console.error(incomingMessage);
        localStorage.setItem("connected", false);
    };

    socket.onclosed = function(event) {
        socket.connect();
    }
    return socket;
};