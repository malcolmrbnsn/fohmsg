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

  addMessage(userID, text) {
    const user = this.getUser(userID);
    if (user) {
      const message = {
        messageID: `message_${Date.now()}`,
        text,
        timestamp: new Date().toISOString()
      };
      user.messages.push(message);
    }
    this.updateUser(user);
  }

  setUserStatus(userID, newStatus) {
    const user = this.getUserByID(userID);
    if (user) {
      user.status = newStatus;
    }

    this.updateUser(user);
  }

  getMessages(userID) {
    const user = this.getUser(userID);
    return user ? user.messages : [];
  }

  getData() {
    return this.users;
  }

  debug() {
    return this.users;
  }

  getChatroomID() {
    return this.chatroomID;
  }
}

module.exports = Chatroom