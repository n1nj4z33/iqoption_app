var element_save_options = document.getElementById("save_options");
var element_save_message = document.getElementById("save_message");

var strategy = document.getElementById("strategy");
var active = document.getElementById("active");
var option = document.getElementById("option");
var lot = document.getElementById("lot");

element_save_options.addEventListener("click", save);


function save() {

    localStorage.setItem("strategy", strategy.value);
    localStorage.setItem("active", active.value);
    localStorage.setItem("option", option.value);
    localStorage.setItem("lot", lot.value);
    localStorage.setItem("configured", true);

    element_save_message.className = "alert alert-success";
    element_save_message.innerHTML = "Настройки успешно сохранены"

};

function load()
{
    strategy.value = localStorage.getItem("strategy");
    active.value = localStorage.getItem("active");
    option.value = localStorage.getItem("option");
    lot.value = localStorage.getItem("lot");

};

window.onload = load();