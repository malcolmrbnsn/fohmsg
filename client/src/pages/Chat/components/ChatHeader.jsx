import './ChatHeader.css';

export function ChatHeader({user, connected}) {
	return (
		<div class="chat-header">
            <h2>{user.username} - {connected ?
                <span className="connected">Connected</span> :
                <span className="disconnected">Disconnected</span>}
            </h2>
		</div>
	);
}

