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

    getLastMessages() {
      const usersWithLastMessage = this.users.map(user => {
        const lastMessageIndex = user.messages.length - 1;
        const lastMessage = lastMessageIndex >= 0 ? user.messages[lastMessageIndex] : null;
  
        return {
          userID: user.userID,
          username: user.username,
          lastMessage,
          status: this.possibleStatuses[user.status]
        };
      });
  
      return usersWithLastMessage;
    }

    debug() {
      return this.users;
    }
  
    getChatroomID() {
      return this.chatroomID;
    }
  }

module.exports = Chatroom