const http = require('http');
const asyncLib = require('async');

asyncLib.reduce(['one', 'two', 'three'], 0, function (sum, currentNumber, reduceCallBack) {
    http.get(process.argv[2] + '?number=' + currentNumber, function (res) {
        var body = '';
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('error', reduceCallBack);
        res.on('end', () => reduceCallBack(null, sum + Number(body)));
    }).on('error', reduceCallBack);


}, function (error, results) {
    if (error) {
        console.log(error);
        return;
    }
    console.log(results);

});