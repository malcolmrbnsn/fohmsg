import { useEffect, useState } from 'preact/hooks';
import './ChatBox.css';

export function ChatBox({ sendMessage, sendTyping, typing }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  }

  const handleInput = (e) => {
    setMessage(e.target.value);
    sendTyping();
  }

  const formatTypingUsers = (usersTyping) => {
    if (usersTyping.length === 0) {
      return ''; // Return empty string if nobody is typing
    } else if (usersTyping.length === 1) {
      return `${usersTyping[0]} is typing...`; // Format for one person typing
    } else {
      const typingUsersExceptLast = usersTyping.slice(0, -1).join(', ');
      const lastTypingUser = usersTyping[usersTyping.length - 1];
      return `${typingUsersExceptLast}, and ${lastTypingUser} are typing...`; // Format for multiple people typing
    }
  };
  const formattedTyping = formatTypingUsers(typing);


  return (
    <footer class="chat-footer">
      {formattedTyping && <div class="typing">{formattedTyping}</div>}

      <form class="message-form" onSubmit={handleSubmit}>
        <input
        className="message-input"
          type="text"
          placeholder="Type a message..."
          value={message}
          onInput={handleInput}
        />
      </form>
    </footer>


  );
}

