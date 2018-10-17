chrome.tabs.onUpdated.addListener(function (tabId, info) {
    if (info.status == "loading") {
        chrome.tabs.executeScript(tabId, {
            file: 'dist/encryptme.js'
        });
    }
});