const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Object để lưu các room và các client trong từng room
const rooms = {};

wss.on('connection', ws => {
  console.log('A new client connected!');

  // Khi client gửi tin nhắn
  ws.on('message', message => {
    const parsedMessage = JSON.parse(message);
    const { type, room, text, username } = parsedMessage;

    if (type === 'join') {
      // Thêm client vào room
      if (!rooms[room]) {
        rooms[room] = new Set();
      }
      rooms[room].add(ws);
      ws.room = room;
      ws.username = username;
      console.log(`${username} joined room: ${room}`);
    } else if (type === 'message') {
      // Gửi tin nhắn tới tất cả các client trong cùng room
      const clientsInRoom = rooms[ws.room] || new Set();
      clientsInRoom.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          // client.send(JSON.stringify({ room: ws.room, text, username: ws.username }));
          client.send(JSON.stringify({ type: 'message', room: ws.room, text, username: ws.username }));
        }
      });
    } else if (type === 'save') {
      // Gửi tin nhắn tới tất cả các client trong cùng room
      const clientsInRoom = rooms[ws.room] || new Set();
      clientsInRoom.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          // client.send(JSON.stringify({ room: ws.room, text, username: ws.username }));
          client.send(JSON.stringify({ type: 'load', room: ws.room, text, username: ws.username }));
        }
      });
    }
  });
  ws.on('close', () => {
    console.log('A client disconnected');
    // Xóa client khỏi room khi đóng kết nối
    if (ws.room && rooms[ws.room]) {
      rooms[ws.room].delete(ws);
      if (rooms[ws.room].size === 0) {
        delete rooms[ws.room];
      }
    }
  });
});

server.listen(8000, () => {
  console.log('Server is listening on port 8000');
});
