const http = require('http');
const asyncLib = require('async');

asyncLib.map(process.argv.slice(2), function (url, mapCallBack) {

    http.get(url, function (res) {
        var body = '';
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('error', mapCallBack);
        res.on('end', () => mapCallBack(null, body));
    }).on('error', mapCallBack);


}, function (error, results) {
    if (error) {
        console.log(error);
        return;
    }
    console.log(results);
});