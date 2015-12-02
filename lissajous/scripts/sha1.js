/**
 * SHA-1 Hash generation function
 */
var sha1 = function (message) {

    var w = new Array(80);
    var h0 = 0x67452301;
    var h1 = 0xefcdab89;
    var h2 = 0x98badcfe;
    var h3 = 0x10325476;
    var h4 = 0xc3d2e1f0;
    var a, b, c, d, e;
    var i;
    var temp;

    /**
     * Rotate bits to the left
     * @param number the number to work with
     * @param bits the number of bits to shift to the left
     * @pre bits < 32
     * @return the number after a bit rotation
     */
    function rotateBitsLeft(number, bits) {
        return (number << bits) | (number >>> (32 - bits));
    }

    /**
     * Get the least significant hex bit in a number
     * @param value the value to use
     * @return the least significant bit in hex
     */
    function leastSignificantBitHex(value) {
        var string = "";
        var valueHigh;
        var valueLow;

        for (var i = 0; i <= 6; i += 2) {
            valueHigh = (value >>> (i * 4 + 4)) & 0x0f;
            valueLow = (value >>> (i * 4)) & 0x0f;
            string += valueHigh.toString(16) + valueLow.toString(16);
        }

        return string;
    }

    /**
     * Convert a number to a hex string
     * @param value the value to convert to hex
     * @return a hex string interpretation of the value
     */
    function toHexString(value) {
        var string = "";
        var val;

        for (var i = 7; i >= 0; i--) {
            val = (value >>> (i * 4)) & 0x0f;
            string += val.toString(16);
        }

        return string;
    }

    /**
     * Encode a string in UTF-8
     * @param string the string to encode
     * @return the UTF-8 equivalent
     */
    function toUTF8(string) {
        string = string.replace(/\r\n/g, "\n");
        var utf = "";

        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128)
                utf += String.fromCharCode(c);
            else if (c > 127 && c < 2048) {
                utf += String.fromCharCode((c >> 6) | 192);
                utf += String.fromCharCode((c & 63) | 128);
            }
            else {
                utf += String.fromCharCode((c >> 12) | 224);
                utf += String.fromCharCode(((c >> 6) & 63) | 128);
                utf += String.fromCharCode((c & 63) | 128);
            }
        }

        return utf;
    }

    /**
     * swap variables around each round
     */
    function finishRound() {
        e = d;
        d = c;
        c = rotateBitsLeft(b, 30);
        b = a;
        a = temp;
    }

    

    message = toUTF8(message);
    var messageLength = message.length;
    var wordArray = [];

    for (i = 0; i < messageLength - 3; i += 4) {
        var j = message.charCodeAt(i) << 24 | message.charCodeAt(i + 1) << 16
            | message.charCodeAt(i + 2) << 8 | message.charCodeAt(i + 3);
        wordArray.push(j);
    }

    switch (messageLength % 4) {
        case 0:
            i = 0x080000000;
            break;
        case 1:
            i = message.charCodeAt(messageLength - 1) << 24 | 0x0800000;
            break;
        case 2:
            i = message.charCodeAt(messageLength - 2) << 24 | message.charCodeAt(messageLength - 1) << 16 | 0x08000;
            break;
        case 3:
            i = message.charCodeAt(messageLength - 3) << 24 | message.charCodeAt(messageLength - 2) << 16 | message.charCodeAt(messageLength - 1) << 8 | 0x80;
            break;
    }

    wordArray.push(i);

    while ((wordArray.length % 16) != 14)
        wordArray.push(0);

    wordArray.push(messageLength >>> 29);
    wordArray.push((messageLength << 3) & 0x0ffffffff);

    for (var blockStart = 0; blockStart < wordArray.length; blockStart += 16) {
        for (i = 0; i < 16; i++)
            w[i] = wordArray[blockStart + i];
        for (i = 16; i <= 79; i++)
            w[i] = rotateBitsLeft(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16], i);

        a = h0;
        b = h1;
        c = h2;
        d = h3;
        e = h4;

        for (i = 0; i <= 19; i++) {
            temp = (rotateBitsLeft(a, 5) + ((b & c) | (~b & d)) + e + w[i] + 0x5a827999) & 0x0ffffffff;
            finishRound();
        }
        for(i = 20; i <= 39; i++) {
            temp = (rotateBitsLeft(a, 5) + (b ^ c ^ d) +e + w[i] + 0x6ED9EBA1) & 0x0ffffffff;
            finishRound();
        }
        for(i = 40; i <= 59; i++) {
            temp = (rotateBitsLeft(a, 5) + ((b & c) | (b & d) | (c & d)) + e + w[i] + 0x8F1BBCDC) & 0x0ffffffff;
            finishRound();
        }
        for (i = 60; i <= 79; i++) {
            temp = (rotateBitsLeft(a, 5) + (b ^ c ^ d) + e + w[i] + 0xCA62C1D6) & 0x0ffffffff;
            finishRound();
        }

        h0 = (h0 + a) & 0x0ffffffff;
        h1 = (h1 + b) & 0x0ffffffff;
        h2 = (h2 + c) & 0x0ffffffff;
        h3 = (h3 + d) & 0x0ffffffff;
        h4 = (h4 + e) & 0x0ffffffff;

        temp = toHexString(h0) + toHexString(h1) + toHexString(h2) + toHexString(h3) + toHexString(h4);
        return temp.toLowerCase();
    }

}