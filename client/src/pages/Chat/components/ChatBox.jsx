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

    return (
        <footer>
            <div class="typing">Someone is typing...</div>
        <form class="input-container" onSubmit={handleSubmit}>    
            <input
                type="text"
                placeholder="Type message..."
                value={message}
                onInput={handleInput}
            />
            <button type="submit">Send</button>
        </form>
        </footer>
    );
}

