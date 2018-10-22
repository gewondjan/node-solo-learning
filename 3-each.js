const http = require('http');
const asyncLib = require('async');

console.log(process.argv[2]);
console.log(process.argv[3]);
console.log(process.argv.slice(2));

asyncLib.each(process.argv.slice(2), function (url, eachCallBack) {
    http.get(url, function (response) {
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            //we are not asked to do anything here
        });
        response.on('error', (error) => eachCallBack(error));
        response.on('end', () => eachCallBack());

    }).on('error', (error) => eachCallBack(error));

}, function (error, results) {
    if (error) {
        console.log(error);
        return;
    }
    console.log(results);

});