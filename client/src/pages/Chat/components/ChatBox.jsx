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
        <div class="chat-footer">
            <p>{typing}</p>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                class="chat-box"
                placeholder="Type message..."
                value={message}
                onInput={handleInput}
            />
            </form>
        </div>
    );
}

