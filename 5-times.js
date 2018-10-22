const http = require('http');
const asyncLib = require('async');




asyncLib.series([
    function (seriesCallBack) {

        asyncLib.times(5, function (i, timesCallBack) {
            var options = {
                hostname: process.argv[2],
                port: process.argv[3],
                path: '/users/create',
                method: 'POST'
            };

            var object = JSON.stringify({
                user_id: i + 1
            });

            var req = http.request(options, function (res) {
                res.on('data', function (chunk) {
                    //do nothing.
                });
                res.on('end', () => timesCallBack(null, object));
                res.on('error', timesCallBack);
            }).on('error', timesCallBack);
            req.write(object);
            req.end();


        }, function (error, results) {
            if (error) {
                seriesCallBack(error);
            }
            seriesCallBack(null, results);
        });

    },
    function (seriesCallBack) {
        var options = {
            hostname: process.argv[2],
            port: process.argv[3],
            method: 'GET',
            path: '/users'
        }
        http.get(options, function (res) {
            var body = '';
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                body += chunk;
            });

            res.on('end', () => seriesCallBack(null, body));
            res.on('error', seriesCallBack);

        }).on('error', seriesCallBack);
    }
], function (error, results) {
    if (error) {
        console.log(error);
        return;
    }
    console.log(results[1]);
})