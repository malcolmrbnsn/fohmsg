import './ChatMessage.css';
import format from 'date-fns/format';

export function ChatMessage(props) {
    const { username, text, time, key } = props

    function formatTime(t) {
        return format(t, "p")
        // return new Date(t).toLocaleTimeString;
    }

    return (
        <div class="chat-message">
            <div className="message-header">
                <h3 class="username">{username}</h3>
                <span className="time">{formatTime(time)}</span>
            </div>
            <p class="message-content">{text}</p>
        </div>
    )
}

