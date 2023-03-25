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
let messages = [];

socketIO.on('connection', (socket) => {
    console.log(`CONN: ${socket.id} connected`);

    socket.on('newUser', data => {
      users.push(data);
      console.log(`CONN: ${socket.id} logged in as ${data.username}`);
      socketIO.emit('newUserResponse', users);
      socket.emit('messageResponse', messages);
    })

    socket.on('typing', data => {
      console.log(`CONN: ${data}`);
      socket.broadcast.emit('typingResponse', data);
    });

    socket.on('message', data => {
      messages.push(data);
      console.log(`CONN: message ${data.text} from ${data.username}`)
      socketIO.emit('messageResponse', messages);
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