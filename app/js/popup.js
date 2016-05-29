
var manifest = chrome.runtime.getManifest();

var element_name = document.getElementById("name");
var element_version = document.getElementById("version"); 

var element_start = document.getElementById("start");
var element_pause = document.getElementById("pause");
var element_stop = document.getElementById("stop");
var element_options = document.getElementById("options");

var element_status = document.getElementById("status");
var element_status_label = document.createElement("span");
var element_status_message = document.getElementById("status_message");

var element_connect = document.getElementById("connect");


var connected = localStorage.getItem("connected");
var configured = localStorage.getItem("configured");
var trade = localStorage.getItem("trade");

element_options.addEventListener("click", options);

function options() {

    chrome.tabs.create({url: "html/options.html"});

};

element_start.addEventListener("click", start);

function start() {

    element_start.className = "list-group-item disabled";
    element_start.disabled = true;

    element_stop.className = "list-group-item";
    element_stop.disabled = false;

    element_pause.className = "list-group-item";
    element_pause.disabled = false;

    element_options.className = "list-group-item disabled";
    element_options.disabled = true;

    chrome.runtime.sendMessage({
        message: "start",
    },
    function(response) {
        console.log(response.message)
    });
};

element_pause.addEventListener("click", pause);

function pause() {

};

element_stop.addEventListener("click", stop);

function stop() {

    element_start.className = "list-group-item";
    element_start.disabled = false;

    element_pause.className = "list-group-item disabled";
    element_pause.disabled = true;

    element_stop.className = "list-group-item disabled";
    element_stop.disabled = true;

    element_options.className = "list-group-item";
    element_options.disabled = false;

    chrome.runtime.sendMessage({
        message: "stop"
    },
    function(response) {
        console.log(response.message)
    });
};


element_connect.addEventListener("click", connect);

function connect() {

    chrome.runtime.sendMessage({
        message: "connect",
    },
    function(response) {
        console.log(response.message);
    });
};


function refreshUI() {
    
    if (connected == "true") {

        element_status_label.className = "label label-success";
        element_status_label.innerHTML = "Online";
        element_status.appendChild(element_status_label);

        if (configured == "true") {
            element_start.className = "list-group-item";
            element_start.disabled = false;
            element_pause.className = "list-group-item disabled";
            element_pause.disabled = true;
            element_stop.className = "list-group-item disabled";
            element_stop.disabled = true;
            element_options.className = "list-group-item";
            element_options.disabled = false;

            element_status_message.className = "alert alert-success";
            element_status_message.innerHTML = "Готово к торговле";
        
        }
        else {
            element_start.className = "list-group-item disabled";
            element_start.disabled = true;
            element_pause.className = "list-group-item disabled";
            element_pause.disabled = true;
            element_stop.className = "list-group-item disabled";
            element_stop.disabled = true;
            element_options.className = "list-group-item";
            element_options.disabled = false;

            element_status_message.className = "alert alert-warning";
            element_status_message.innerHTML = "Необходимо настроить стратегию торговли в разделе Настройки";

        }
        if (trade == "true") {
            element_start.className = "list-group-item disabled";
            element_start.disabled = true;
            element_pause.className = "list-group-item";
            element_pause.disabled = false;
            element_stop.className = "list-group-item";
            element_stop.disabled = false;
            element_options.className = "list-group-item disabled";
            element_options.disabled = true;

            element_status_message.className = "alert alert-success";
            element_status_message.innerHTML = "Торговля в процессе";
        
        }
    }
    else {
        element_start.className = "list-group-item disabled";
        element_start.disabled = true;
        element_pause.className = "list-group-item disabled";
        element_pause.disabled = true;
        element_stop.className = "list-group-item disabled";
        element_stop.disabled = true;
        element_options.className = "list-group-item disabled";
        element_options.disabled = true;

        element_status_label.className = "label label-danger";
        element_status_label.innerHTML = "Offline";
        element_status.appendChild(element_status_label);

        var iqoption_url = "https://iqoption.com";
        var iqoption_link = document.createElement("a");
        iqoption_link.setAttribute("id", "iqoption_link");
        iqoption_link.setAttribute("href", iqoption_url);
        iqoption_link.innerHTML = "IQ Option"

        element_status_message.className = "alert alert-danger";
        element_status_message.innerHTML = "Необходимо авторизироваться на сайте ";
        element_status_message.appendChild(iqoption_link);


        document.getElementById("iqoption_link").addEventListener("click", function() {
            chrome.tabs.create({ url: iqoption_url });
        });

    }
};

function onLoad() {

    element_name.innerHTML = manifest.name;
    element_version.innerHTML = "Версия: " + manifest.version;
    refreshUI();
};

window.onload = onLoad();
