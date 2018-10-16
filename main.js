chrome.tabs.onLoaded.addListener(function (tabId, info) {
    if (info.status == "loading") {        
        chrome.tabs.executeScript({
            code: 'if (typeof(window.c) === "undefined") {window.c = 0;} else {window.c++;};  console.log("injected", c);'
        });
    }
});