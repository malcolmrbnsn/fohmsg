import './ChatMessage.css';
import format from 'date-fns/format';

export function ChatMessage(props) {
    const {username, text, time, key} = props

    function formatTime(t) {
        return format(t, "p")
        // return new Date(t).toLocaleTimeString;
    }

    return (
        <div class="chat-message">
                    <h3>{username} - {formatTime(time)}</h3>
                    <p>{text}</p>
        </div>
    )
}

