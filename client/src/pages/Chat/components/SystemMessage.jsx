import './SystemMessage.css';
import format from 'date-fns/format';

export function SystemMessage({ username, text, time }) {

    function formatTime(t) {
        return format(t, "p")
    }

    return (
        <div class="system-message">
            <i>{formatTime(time)} system: {text}</i>
        </div>
    )
}

