const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: process.env.NOTIFICATION_WEB_SOCKET_PORT || 8080,
});

function sendNotification(user, notification) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          user,
          notification,
        })
      );
    }
  });
}

module.exports = { sendNotification };
