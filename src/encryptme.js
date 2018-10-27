'use strict';

var aesjs = require('aes-js');
var sha256 = require("crypto-js/sha256");
var elliptic = require('elliptic').ec;

var text = 'chào bạn tôi là chiro';
var textBytes = aesjs.utils.utf8.toBytes(text);
var decryptedText = aesjs.utils.utf8.fromBytes(textBytes);

console.log(textBytes, decryptedText, sha256("Hello"));

/*

// An example 128-bit key
var key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

// The initialization vector (must be 16 bytes)
var iv = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// Convert text to bytes (must be a multiple of the segment size you choose below)
var text = 'TextMustBeAMultipleOfSegmentSize';
var textBytes = aesjs.utils.utf8.toBytes(text);

// The segment size is optional, and defaults to 1
var segmentSize = 8;
var aesCfb = new aesjs.ModeOfOperation.cfb(key, iv, segmentSize);
var encryptedBytes = aesCfb.encrypt(textBytes);

// To print or store the binary data, you may convert it to hex
var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
console.log(encryptedHex);
// "55e3af2638c560b4fdb9d26a630733ea60197ec23deb85b1f60f71f10409ce27"

// When ready to decrypt the hex string, convert it back to bytes
var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

// The cipher feedback mode of operation maintains internal state,
// so to decrypt a new instance must be instantiated.
var aesCfb = new aesjs.ModeOfOperation.cfb(key, iv, 8);
var decryptedBytes = aesCfb.decrypt(encryptedBytes);

// Convert our bytes back into text
var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
console.log(decryptedText);
// "TextMustBeAMultipleOfSegmentSize"*/

(function () {
    var e = {
        findEncrypted: () => {
            return document.body.innerText.match(/(\[encryptMe\]).*(\[\/encryptMe\])/igm);
        },
        getContent: (a) => a.substr(11).substr(0, a.length - 23),
        base64Encode: (a) => btoa(a),
        base64Decode: (a) => atob(a),
    }
    var encrypted = e.findEncrypted();
    if (encrypted) {
        for (var i = 0; i < encrypted.length; i++) {
            console.log(e.getContent(encrypted[i]));
        }
    }
})();

window.chiro = true;
