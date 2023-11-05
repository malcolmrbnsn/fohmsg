import { useEffect, useState } from 'preact/hooks';
import './ChatBox.css';

export function ChatBox({ sendMessage }) {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage("");
    }

    const handleInput = (e) => {
        setMessage(e.target.value);
    }

    return (
        <div class="chat-footer">
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

