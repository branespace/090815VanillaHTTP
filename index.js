"use strict";

var http = require('http');

var server = http.createServer(function (req, res) {

    if (req.url.substring(0, 6).toLowerCase() === '/greet') {

        if (req.method === 'GET') {

            var name = parseName(req.url);
            return writeResponse(res, 200, 'It is dark out, ' + name +
                '. You are likely to be eaten by a grue!');

        } else if (req.method === 'POST') {

            req.on('data', function (data) {

                var name = (JSON.parse(data.toString())).name;
                return writeResponse(res, 200, 'Who do you think I am, ' + name +
                    '? The postman???!?!?!?11oneoneone');

            });
            return false;
        }
        
        return sendError404(res);

    } else if (req.url.substring(0, 5).toLowerCase() === '/time') {
        
        return writeResponse(res, 200, (new Date()).toUTCString());
    }
    
    return sendError404(res);
});

server.listen(3000, function () {
    console.log('Server Running!  Port: 3000');
});

function writeResponse(res, status, content) {
    res.writeHead(status, {"Content-Type": "text/plain"});
    res.write(content);
    return res.end();
}

function sendError404(res) {
    writeResponse(res, 404, 'Resource not found');
}

function parseName(string) {
    var match = string.match(/^\/greet\/([a-zA-Z]*)/);
    return match ? match[1] : 'whoever you are';
}
