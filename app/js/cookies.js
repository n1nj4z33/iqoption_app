var https_url = "https://iqoption.com";

function getCookies(domain, name, callback) {
    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
        if(callback) {
            if (cookie == null) {
                console.error("Cant get cookie for " + https_url);
                localStorage.setItem("connected", false);
            }
            else {
                callback(cookie.value);
            };
        };
    });
};
