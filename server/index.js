const express = require('express');

const app = express();
const http = require('http').Server(app);

const PORT = 3001;

const cors = require('cors');
app.use(cors());

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

// create the chatroom
const Chatroom = require('./chatroom');
const chatroom = new Chatroom("default");

socketIO.on('connection', (socket) => {
    console.log(`CONN: ${socket.id} connected`);

    socket.on('newUser', data => {
      const username = {data};
      chatroom.addUser(socket.id, username);
      console.log(`CONN: ${socket.id} logged in as ${username}`);
      socketIO.emit('pushMessages', chatroom.getLastMessages());
    });

    socket.on('message', data => {
      chatroom.addMessage(socket.id, data.message);
      console.log(`CONN: message ${data.text} from ${data.username}`);
      socketIO.emit('pushMessages', chatroom.getLastMessages());
    });

    socket.on('disconnect', () => {
      console.log(`CONN: ${socket.id} disconnected`);
      chatroom.setUserStatus(socket.id, 0);
      socketIO.emit('pushMessages', chatroom.getLastMessages());
    });
});


http.listen(PORT, () => {
  console.log(`HTTP: Listening on ${PORT}`);
});