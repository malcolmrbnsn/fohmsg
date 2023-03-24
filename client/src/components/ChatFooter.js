import React, { useState } from "react";

const ChatFooter = () => {

    const [message, setMessage] = useState('');

    const handleMessageSend = (e) => {
        e.preventDefault();
        console.log({ userName: localStorage.getItem('userName'), message });
        setMessage('');
    }

    return (
        <div>
            <form onSubmit={handleMessageSend}>
                <input type="text" placeholder="type something..." value={message} onChange={e => setMessage(e.target.value)}/>
            </form>

        </div>
    )
}

export default ChatFooter