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
    
    var from_time = servertimestamp - 120;
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
            var candle = CandleType.green;
        }
        else {
            console.info("Candle type: " + CandleType.red);
            var candle = CandleType.red;
        }
        parsedCandles.push(candle);
    }

    localStorage.setItem("last_candle",  parsedCandles[0]);
    localStorage.setItem("current_candle",  parsedCandles[parsedCandles.length - 1])

};
