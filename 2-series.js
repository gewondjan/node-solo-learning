const asyncLib = require('async');
const http = require('http');


asyncLib.series({
    requestOne: function (seriesCallBack) {
        http.get(process.argv[2], function (response) {
            var body = '';
            response.setEncoding('utf8');
            response.on('data', function (chunk) {
                body += chunk;
            });
            response.on('error', (error) => seriesCallBack(error));
            response.on('end', () => seriesCallBack(null, body));
        }).on('error', () => seriesCallBack(error));
    },
    requestTwo: function (seriesCallBack) {
        http.get(process.argv[3], function (response) {
            var body = '';
            response.setEncoding('utf8');
            response.on('data', function (chunk) {
                body += chunk;
            });
            response.on('error', (error) => seriesCallBack(error));
            response.on('end', () => seriesCallBack(null, body));
        }).on('error', () => seriesCallBack(error));
    }
}, function (error, results) {
    if (error) {
        console.log(error);
        return;
    }
    console.log(results);
});