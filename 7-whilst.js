const http = require('http');
const asyncLib = require('async');
var count = 0;
var requestBody = '';
asyncLib.whilst(
    function () {
        return requestBody.trim() !== 'meerkat';
    },
    function (whilstCallBack) {
        http.get(process.argv[2], function (res) {
            var body = '';
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                requestBody = body;
                count++;
                whilstCallBack(null, count);
            });
            res.on('error', whilstCallBack);
        }).on('error', whilstCallBack);
    },
    function (error, results) {
        if (error) {
            console.log(error);
            return;
        }
        console.log(results);
    }
);