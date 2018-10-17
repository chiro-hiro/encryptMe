// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function logValue(val) {
    chrome.tabs.executeScript(null, { code: "console.log(JSON.parse('" + JSON.stringify(val) + "'));" });
}

function click(e) {
    var value = 'my test';
    chrome.storage.sync.set({ key: value }, function () {
        logValue(value);
    });

    chrome.storage.sync.get(['key'], function (result) {
        logValue(result);
    });
    window.close();
}

document.addEventListener('DOMContentLoaded', function () {
    var divs = document.querySelectorAll('div');
    for (var i = 0; i < divs.length; i++) {
        divs[i].addEventListener('click', click);
    }
});
