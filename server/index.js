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

let users = [];
let message = {
  message: '',
  username: 'host',
  socketID: '',
  date: Date.now()
};

socketIO.on('connection', (socket) => {
    console.log(`CONN: ${socket.id} connected`);

    socket.on('newUser', data => {
      users.push(data);
      console.log(`CONN: ${socket.id} logged in as ${data.username}`);
      socketIO.emit('newUserResponse', users);
      socket.emit('messageResponse', message);
    });

    socket.on('message', data => {
      message = data;
      console.log(`CONN: message ${data.message} from ${data.username}`);
      socketIO.emit('messageResponse', data);
    });

    socket.on('disconnect', () => {
      console.log(`CONN: ${socket.id} disconnected`);
      users = users.filter((user) => user.socketID !== socket.id);
      socketIO.emit('newUserResponse', users);
    });
});


http.listen(PORT, () => {
  console.log(`HTTP: Listening on ${PORT}`);
});