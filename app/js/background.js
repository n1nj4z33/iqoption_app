chrome.runtime.onMessage.addListener(HandleMessage);

function HandleMessage(request, sender, sendResponse)
{
    console.info("Handle message: " + request.message)
    if (request.message == "connect")
    {
        sendResponse({message: "connect"});
        localStorage.setItem("connected", false);
        createConnection();
    }
    if (request.message == "start")
    {
        sendResponse({message: "start"});
        localStorage.setItem("trade", true);
        Trade();
    }
    if (request.message == "stop")
    {
        sendResponse({message: "stop"});
        localStorage.setItem("trade", false);
        Trade();
    }
};
