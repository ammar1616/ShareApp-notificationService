const express = require('express');
const { WebSocketServer } = require('ws');
require('dotenv').config();

const app = express();

// const wss = new WebSocketServer({
//   port: process.env.NOTIFICATION_WEB_SOCKET_PORT || 8080,
// });

// wss.on('connection', function connection(ws) {
//   ws.send('Hello, client!');
// });

require('./startup/routes')(app);

const port = process.env.NOTIFICATION_SERVICE_PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

// module.exports.wss = wss;
