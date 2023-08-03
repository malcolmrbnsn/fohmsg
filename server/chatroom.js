class Chatroom {
  constructor(chatroomID) {
    this.chatroomID = chatroomID;
    this.users = new Map();
    this.possibleStatuses = ["Offline", "Online", "Error"]
  }

  addUser(userID, username) {
    const user = {
      userID,
      username,
      status: 1, // 0: offline, 1: online, 2: error
      messages: []
    };
    this.users.set(userID, user);
  }

  getUser(userID) {
    return this.users.get(userID);
  }

  updateUser(user) {
    if (user && user.userID) {
      this.users.set(user.userID, user);
    }
  }

  addMessage(userID, message) {
    const user = this.getUser(userID);
    if (user) {
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

  // getMessages() {
  //   const usersWithLastMessage = this.users.map(user => {
  //     let message = null;
  //     const messagesLength = user.messages.length
  //     if (messagesLength >=1) {
  //       message = user.messages[messagesLength - 1]
  //     }

  //     return {
  //       userID: user.userID,
  //       username: user.username,
  //       message,
  //       status: this.possibleStatuses[user.status]
  //     };
  //   });
  //   return usersWithLastMessage;
  // }

  getmessages() {
    return Array.from(this.users.values());
    // Alternatively, you can use the spread syntax:
    // return [...this.users.values()];
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