const http = require('http');
const app = require('./app');

console.log("INFO: Starting server");
const server = http.createServer(app);
const port = process.env.PORT || 8891;

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    console.log("ERROR: Error occured "+error);
}

function onListening() {
    console.log("SUCCESS: Listening on " + port);
}