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

const usersTyping = new Set(); // Initialize an empty Set to track typing users
// Check if nobody is typing after a certain period and emit a clear signal
function clearTypingUsers() {
  if (usersTyping.size === 0) {
      socketIO.emit('clearTyping'); // Emit an event to clear the typing indicator on all clients
  }
}


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
    if (message.text === "/clear") {
      chatroom.clearMessages();
    }
      socketIO.emit('push', chatroom.push());
  });

  socket.on('typing', (username) => {
    usersTyping.add(username);
    socketIO.emit('currentlyTyping', Array.from(usersTyping)); // Broadcast the updated list to all clients
});

// When a user stops typing, remove them from the usersTyping Set
socket.on('notTyping', (username) => {
  usersTyping.delete(username);
  socketIO.emit('currentlyTyping', Array.from(usersTyping)); // Broadcast the updated list to all clients
});

// Set up an interval to periodically check and clear typing users
const typingCheckInterval = setInterval(clearTypingUsers, 6000); // Check every 3 seconds


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