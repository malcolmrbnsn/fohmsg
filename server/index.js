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
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('newUser', data => {
      users.push(data);
      socketIO.emit('newUserResponse', users);
    })

    socket.on('message', data => {
      messages.push(data)
      socketIO.emit('messageResponse', messages)
    });

    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
      users = users.filter((user) => user.socketID !== socket.id);
      console.log(users);
      socketIO.emit('newUserResponse', users);
    });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});


http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});