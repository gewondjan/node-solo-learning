const http = require('http');
const fs = require('fs');
const asyncLib = require('async');

asyncLib.waterfall([
    function (waterfallCallBack) {
        fs.readFile(process.argv[2], 'utf8', function (error, data) {
            if (error) {
                waterfallCallBack(error);
            }
            waterfallCallBack(null, data);
        });
    },
    function (lastFunctionResults, waterfallCallBack) {
        http.get(lastFunctionResults, function (response) {
            var body = '';
            response.setEncoding('utf8');
            response.on('data', function (chunk) {
                body += chunk;
            });
            response.on('end', () => waterfallCallBack(null, body));
            response.on('error', (error) => waterfallCallBack(error));
        });
    }


], function (error, results) {
    if (error) {
        console.log(error);
        return;
    }
    console.log(results);
});