import './ChatHeader.css';

export function ChatHeader({user, connected}) {
	return (
		<div class="chat-header">
            <h2 class="header">{user.username} - {connected ?
                <span className="connected">Connected</span> :
                <span className="disconnected">Disconnected</span>}
            </h2>
            {/* <div className="leave-chat">Leave Chat</div> */}
		</div>
	);
}

