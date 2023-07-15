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

app.get("/help", (req, res, next) => {
  res.json(chatroom.debug());
});

socketIO.on('connection', (socket) => {
    console.log(`CONN: ${socket.id} connected`);

    socket.on('joinChatroom', data => {
      const {username} = data;
      if (chatroom.getUser(socket.id)) {
        chatroom.setUserStatus(socket.id, 1);
      } else {
        chatroom.addUser(socket.id, username);
      }
      
      console.log(`CONN: ${socket.id} logged in as ${username}`);
      socketIO.emit('push', chatroom.getLastMessages());
      // TODO: if username exists, replace socketID and set online>??? 
    });

    socket.on('sendMessage', data => {
      chatroom.addMessage(socket.id, data.message);
      console.log(`CONN: message ${data.text} from ${data.username}`);
      socketIO.emit('push', chatroom.getLastMessages());
    });

    socket.on('leaveChatroom', data => {
      chatroom.setUserStatus(socket.id, 0);
      socketIO.emit('push', chatroom.getLastMessages());

    })

    socket.on('disconnect', () => {
      console.log(`CONN: ${socket.id} disconnected`);
      chatroom.setUserStatus(socket.id, 0);
      socketIO.emit('push', chatroom.getLastMessages());
    });
});


http.listen(PORT, () => {
  console.log(`HTTP: Listening on ${PORT}`);
});