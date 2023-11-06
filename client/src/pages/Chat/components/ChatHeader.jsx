import './ChatHeader.css';

export function ChatHeader({user, connected, setSidebarVisible, visible}) {
	return (
		<div class="chat-header">
            <h2 class="header">{user.username} - {connected ?
                <span class="connected">Connected</span> :
                <span class="disconnected">Disconnected</span>}
            </h2>
            <button class="expand-sidebar" onClick={() => {setSidebarVisible(!visible)}}>{visible ? ">" : "<"}</button>
		</div>
	);
}

