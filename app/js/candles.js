var CandleType = {
    green: "green",
    red: "red"
};

function getCandles() {

    var active = localStorage.getItem("active");
    console.info("Active: " + active);

    var duration = 60;
    console.info("Duration: " + duration);
    
    var chunk_size = 214;
    console.info("Chunk size: " + chunk_size);
    
    var from_time = servertimestamp;
    console.info("From time: " + from_time);

    var till_time = servertimestamp;
    console.info("Till time: " + till_time);
    socket.send(JSON.stringify({"name": "candles", "msg": {
        "active_id": Actives[active],
        "duration": duration,
        "chunk_size": chunk_size,
        "from": from_time,
        "till": till_time
    }}));

};


function parseCandles(candlesData) {

    console.info("Candles data: " + candlesData);

    var parsedCandles = [];

    for(var i=0 in candlesData) {

        console.info("Candle timestamp: " + candlesData[i][0])
        console.info("Candle open: " + candlesData[i][1])
        console.info("Candle close: " + candlesData[i][2])
        console.info("Candle high: " + candlesData[i][3])
        console.info("Candle low: " + candlesData[i][4])

        if (candlesData[i][2] >= candlesData[i][1]) {
            console.info("Candle type: " + CandleType.green);
            var type = CandleType.green;
        }
        else {
            console.info("Candle type: " + CandleType.red);
            var type = CandleType.red;
        }
        
        var Candle = {
            timestamp: candlesData[i][0],
            open: candlesData[i][1],
            close: candlesData[i][2],
            high: candlesData[i][3],
            low: candlesData[i][4],
            type: type
        };
        parsedCandles.push(Candle);
    }
    
    localStorage.setItem("candle_open", parsedCandles[0].open);
};
