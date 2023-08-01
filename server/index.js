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

app.get("/help/all", (req, res, next) => {
  res.json(chatroom.debug());
});


app.get("/help/user", (req, res, next) => {
  res.json(chatroom.getMessages());
});

socketIO.on('connection', (socket) => {
    console.log(`CONN: ${socket.id} connected`);

    socket.on('joinChatroom', data => {
      const {username} = data;
      foundUser = chatroom.getUserByID(socket.id);
      if (foundUser) {
        foundUser.username = username;
        foundUser.status = 1;
        chatroom.updateUser(foundUser);
      } else {
        chatroom.addUser(socket.id, username);
      }
      
      console.log(`CONN: ${socket.id} logged in as ${username}`);
      socketIO.emit('push', chatroom.getMessages());
      // TODO: if username exists, replace socketID and set online>??? 
    });

    socket.on('message', data => {
      const {message} = data;
      chatroom.addMessage(socket.id, message);
      console.log(`CONN: message ${message.text} from ${message.userID}`);
      socketIO.emit('push', chatroom.getMessages());
    });

    socket.on('leaveChatroom', data => {
      chatroom.setUserStatus(socket.id, 0);
      socketIO.emit('push', chatroom.getMessages());

    })

    socket.on('disconnect', () => {
      console.log(`CONN: ${socket.id} disconnected`);
      if (chatroom.getUserByID(socket.id)){
        chatroom.setUserStatus(socket.id, 0);
    }
      socketIO.emit('push', chatroom.getMessages());
    });
});


http.listen(PORT, () => {
  console.log(`HTTP: Listening on ${PORT}`);
});