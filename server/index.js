const express = require('express');

const app = express();
const http = require('http').Server(app);

const PORT = 3001;
const IP = '127.0.0.1'

const socketIO = require('socket.io')(http, {
  cors: {
    origin: "http://127.0.0.1:3000"
  }
});

// create the chatroom
const Chatroom = require('./chatroom');
const chatroom = new Chatroom();

app.get("/help/users", (req, res, next) => {
  res.json([...chatroom.users.values()]);
});

app.get("/help/messages", (req, res, next) => {
  res.json(chatroom.messages);
});

socketIO.on('connection', (socket) => {
  console.log(`CONN: ${socket.id} connected`);

  socket.on('joinChatroom', data => {
    const { userID, username } = data;
    if (userID) {
      foundUser = chatroom.getUserById(userID);
      if (foundUser) {
        foundUser.username = username;
        foundUser.status = 1;
        foundUser.socketID = socket.id;
        chatroom.updateUser(foundUser);
      }  else {
      chatroom.addUser(userID, username, socket.id);
      }
    }

    console.log(`CONN: ${socket.id} logged in as ${username}`);
    socketIO.emit('push', chatroom.push());
  });

  socket.on('message', message => {
    chatroom.addMessage(message);
    console.log(`CONN: message ${message.text} from ${message.userID}`);
    socketIO.emit('push', chatroom.push());
  });

  socket.on('typing', data => {
    const {userID} = data;
    socketIO.emit('typing', {userID});
  })

  socket.on('leaveChatroom', data => {
    const {userID} = data;
    if (chatroom.getUserByID(userID)) {
      chatroom.setUserStatus(userID, 0);
    } else {
      console.log("user left chat without a valid uid");
    }
    socketIO.emit('push', chatroom.push());
  })

  socket.on('disconnect', () => {
    console.log(`CONN: ${socket.id} disconnected`);
    chatroom.socketDisconnect(socket.id);
    socketIO.emit('push', chatroom.push());
  });
});


http.listen(PORT, IP, () => {
  console.log(`HTTP: Listening on ${IP}:${PORT}`);
});