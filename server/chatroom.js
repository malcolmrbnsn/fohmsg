class Chatroom {
    constructor(chatroomID) {
      this.chatroomID = chatroomID;
      this.users = [];
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
  
    getUser(userID) {
      return this.users.find(user => user.userID === userID);
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
    }

    setUserStatus(userID, newStatus) {
        const user = this.getUser(userID);
        if (user) {
          user.status = newStatus;
        }
      }
  
    getMessages(userID) {
      const user = this.getUser(userID);
      return user ? user.messages : [];
    }
  
    getChatroomID() {
      return this.chatroomID;
    }
  }