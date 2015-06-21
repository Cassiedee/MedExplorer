var http = require("http");
var https = require("https");

var API_KEY = 'yTYnUvdcecwjxEgbECMYviNmByhA7bhZi8OgAUKK';

var options = {
    host: 'api.fda.gov',
    port: 443,
    headers: {
        'Content-Type': 'application/json'
    }
};

/**
 * getJSON:  REST get request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */
exports.simplesearch = function(field, value, callback) {
    options.path = '/drug/event.json?api_key=' + API_KEY + '&search=' + encodeURIComponent(field) + ':"' + encodeURIComponent(value) + '"&limit=1';
    options.method = 'GET';

    console.log(options.path);
    var protocol = options.port == 443 ? https : http;
    var req = protocol.request(options, function(res) {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            callback(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
      req.send('error: ' + err.message);
    });

    req.end();
};
