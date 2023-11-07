import './ChatMessage.css';
import format from 'date-fns/format';

export function ChatMessage(props) {
    const { username, text, time, key } = props

    function formatTime(t) {
        return format(t, "p")
        // return new Date(t).toLocaleTimeString;
    }

    const splittedBody = text.split("\n").map((line) => (<p class="message-content">{line}</p>))

    return (
        <div class="chat-message">
            <div className="message-header">
                <h3 class="username">{username}</h3>
                <span className="time">{formatTime(time)}</span>
            </div>
            <div class="message-content">{splittedBody}</div>       
        </div>
    )
}

