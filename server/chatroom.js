class Chatroom {
  constructor(chatroomID) {
    this.chatroomID = chatroomID;
    this.users = [];
    this.possibleStatuses = ["Offline", "Online", "Error"]
  }

  addUser(userID, username) {
    const user = {
      userID,
      username,
      status: 1, // 0: offline, 1: online, 2: error
      messages: []
    };
    this.users.push(user);
  }

  getUserByID(userID) {
    return this.users.find(user => user.userID === userID);
  }

  getUserByUsername(username) {
    return this.users.find(user => user.username === username);
  }

  updateUser(newUser) {
      let toReplace = this.getUserByID(newUser.userID);
      Object.assign(toReplace, newUser);
  }

  addMessage(userID, message) {
    const user = this.getUserByID(userID);
    if (user) {
      // const message = {
      //   messageID: `message_${Date.now()}`,
      //   text,
      //   timestamp: new Date().toISOString()
      // };
      user.messages.push(message);
      this.updateUser(user);
    }
  }

  setUserStatus(userID, newStatus) {
    const user = this.getUserByID(userID);
    if (user) {
      user.status = newStatus;
    }

    this.updateUser(user);
  }

  // getMessages(userID) {
  //   const user = this.getUserByID(userID);
  //   return user ? user.messages : [];
  // }

  getMessages() {
    const usersWithLastMessage = this.users.map(user => {
      let message = null;
      const messagesLength = user.messages.length
      if (messagesLength >=1) {
        message = user.messages[messagesLength - 1]
      }

      return {
        userID: user.userID,
        username: user.username,
        message,
        status: this.possibleStatuses[user.status]
      };
    });
    return usersWithLastMessage;
  }

  debug() {
    return this.users;
    // return this.getMessages();
  }

  getChatroomID() {
    return this.chatroomID;
  }
}

module.exports = Chatroom