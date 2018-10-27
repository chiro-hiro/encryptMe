/**
The MIT License (MIT)

Copyright (c) 2016 Dũng Trần <chiro@fkguru.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
**/

var value = new Uint8Array(32);
var seed;
//XorShift based PRNG
//Author: Chiro Hiro <chiro@fkguru.com>
//https://gist.github.com/chiro-hiro/2a5c5a881bf6c33d02466b8d59eeaf07
function rnd() {
    var x = 0, i;
    for (i = 0; i < 32; i++) {
        //Shift right if [i th] bit is equal to 1, otherwise shift letf
        x ^= ((seed >> i) & 1) ? seed >> i : seed << i;
    }
    return seed = x;
}

function getUint(arrayVal, offset) {
    return ((arrayVal[offset] << 24)
        | (arrayVal[offset + 1] << 16)
        | (arrayVal[offset + 2] << 8)
        | (arrayVal[offset + 3])) >>> 0;
}

function getSeed(arrayVal) {
    var ret = 0;
    for (var i = 0; i < arrayVal.length; i += 4) {
        ret ^= getUint(arrayVal, i);
    }
    return ret;
}

function getOpacity(byteVal) {
    return (Math.round(((byteVal & 255) * 1000) / 255) / 1000).toString();
}

function getColor(val) {
    return 'rgba('
        + (val & 0xff).toString() + ','
        + ((val >> 8) & 0xff).toString() + ','
        + ((val >> 16) & 0xff).toString() + ','
        + getOpacity(val >> 24) + ')';
}

function generateUint(s) {
    return ((s ^ rnd()) >>> 0);
}
function uniqueImage(context, width, height, arrayVal) {
    var el = ((arrayVal.length / 4) | 0) + 4;
    var cx = width / 2;
    var cy = height / 2;
    var step = cx / el;
    var r = cx;
    context.beginPath();
    context.moveTo(cx / 2, cy / 2);
    for (var i = 0; i < arrayVal.length; i += 4) {
        var s = getUint(arrayVal, i);
        var c = generateUint(s);
        var b = generateUint(s) / 0xffffffff;
        var e = generateUint(s) / 0xffffffff;
        context.lineTo(c % width, c % height);

        /*
                context.fillStyle = getColor(c);
                context.arc(cx, cy, r, b * Math.PI, e * Math.PI, s % 2 == 0);
                context.lineTo(cx, cy);
                r -= step;
                context.fill();
        */
        console.log(i, r, s.toString(16), getColor(c), c.toString(16));
    }
    context.closePath();
}
/*
function uniqueImage(context, width, height, arrayVal) {
    var el = ((arrayVal.length / 4) | 0) + 4;
    var cx = width / 2;
    var cy = height / 2;
    var step = cx / el;
    var r = cx;
    for (var i = 0; i < arrayVal.length; i += 4) {
        var s = getUint(arrayVal, i);
        var c = generateUint(s);
        var b = generateUint(s) / 0xffffffff;
        var e = generateUint(s) / 0xffffffff;
        context.beginPath();
        context.fillStyle = getColor(c);
        context.arc(cx, cy, r, b * Math.PI, e * Math.PI, s % 2 == 0);
        context.lineTo(cx, cy);
        r -= step;
        context.fill();
        context.closePath();
        console.log(i, r, s.toString(16), getColor(c), c.toString(16));
    }
}*/
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
function render() {
    window.crypto.getRandomValues(value);
    seed = getSeed(value);
    textBox.value = '';
    for (var i = 0; i < value.length; i++) {
        textBox.value += value[i].toString(16);
    }
    ctx.clearRect(0, 0, c.width, c.height);
    uniqueImage(ctx, c.width, c.height, value);
}
render();