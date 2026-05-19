const http = require('http');
const app = require('./App');
const port = process.env.PORT || 3100;

const server = http.createServer(app);

server.listen(port);