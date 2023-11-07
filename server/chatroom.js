const fs = require('fs');
const USERPATH = './users.bin'
const MSGPATH = './messages.bin'
const BACKUP = false;

class Chatroom {
  constructor() {
    this.users = new Map();
    this.messages = [];
    this.statuses = ["Offline", "Online"]

    // import users
    if (fs.existsSync(USERPATH)) {
      fs.readFile(USERPATH, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        this.users = new Map(JSON.parse(data));
      });
    }

    if (fs.existsSync(MSGPATH)) {
      fs.readFile(MSGPATH, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        this.messages = JSON.parse(data);
      });
    }

  }

  writeUsers() {
    if (BACKUP) {
      const data = JSON.stringify(Array.from(this.users.entries()));
      fs.writeFile(USERPATH, data, err => {
        console.error(err);
      })
    }
  }

  writeMessages() {
    if (BACKUP) {
      const data = JSON.stringify(this.messages);
      fs.writeFile(MSGPATH, data, err => {
        console.error(err);
      })
    }
  }


  getUsers() {
    return this.users;
  }

  getUserById(userId) {
    return this.users.get(userId);
  }

  addUser(userID, username, socketID) {
    const user = {
      userID,
      socketID,
      username,
      status: 1, // 0: offline, 1: online, 2: error
      statusSince: 0
    };
    this.users.set(userID, user);
    this.writeUsers()
  }

  updateUser(user) {
    if (user && user.userID) {
      this.users.set(user.userID, user);
    } else {
      console.error("fuck");
    }
    this.writeUsers()
  }

  setUserStatus(userID, newStatus) {
    const user = this.getUserByID(userID);
    if (user) {
      user.status = newStatus;
      user.statusSince = Date.now();
      this.updateUser(user);
    }
    this.writeUsers()
  }

  socketDisconnect(socketID) {
    for (const [userId, user] of this.users) {
      if (user.socketID === socketID) {
        user.status = 0;
        user.statusSince = Date.now();
        console.log(`STATUS: user ${user.username} disconnected`)
        this.users.set(userId, user);
        this.writeUsers();
      }
    }
  }


  addMessage(message) {
    const {
      userID,
      username,
      text,
      time,
      type
    } = message
    const user = this.getUserById(userID);
    if (user || userID === -1) {
      const newMessage = {
        username,
        text,
        time,
        id: this.messages.length,
        type
      };
      this.messages.push(newMessage);
      this.writeMessages();
    } else {
      console.log("SENDMESSAGE: message received doesnt have a user");
    }

  }

  clearMessages() {
    this.messages = [];
  }

  sweepUsers() {
    for (const [userId, user] of this.users) {
      if (user.status === 0) {
        this.users.delete(userId);
      }
    }
    this.writeUsers();
  }


  getMessages() {
    return this.messages;
  }
  getUsers() {
    return [...this.users.values()];
  }

  push() {
    const messages = this.getMessages() || [];
    const users = this.getUsers() || [];

    return {
      messages,
      users
    }
  }

  // debug() {
  //   return [this.users, this.messages];
  //   // return this.getMessages();
  // }

}

module.exports = Chatroom;