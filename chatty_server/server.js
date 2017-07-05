const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');


const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`listening on ${PORT}`));

const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', function connection(ws, req) {
  console.log('Client connected');
  const userCount = wss.clients.size;
  const userCountObj = {
    id: uuidv1(),
    type: 'userCountChanged',
    userCount: userCount,
  }

  wss.broadcast(JSON.stringify(userCountObj));
 
  ws.on('message', function incoming(message) {
    const parsedMessage = JSON.parse(message);

    switch(parsedMessage.type) {
      case "postMessage":
      const newMessage = {
        id: uuidv1(),
        type: "incomingMessage",
        username: parsedMessage.username,
        content: parsedMessage.content
      };
      wss.broadcast(JSON.stringify(newMessage));
      break;

      case "postNotification":
      const newNotification = {
        id: uuidv1(),
        type: "incomingNotification",
        username: parsedMessage.username,
        content: parsedMessage.content
      };
      wss.broadcast(JSON.stringify(newNotification));
      break;
      
      case "userCountChanged":
      const userCount = wss.clients.size;
      wss.broadCast(userCount);
      default:
        throw new Error("Unknown event type " + message.type);
    }
  });

  ws.on('close', () => console.log('Client disconnected'));
});

