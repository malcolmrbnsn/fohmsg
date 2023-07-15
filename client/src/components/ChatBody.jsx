import React from "react";

const ChatBody = ({ chatroom, handleTyping }) => {

    const onChange = ((e) => {
        e.preventDefault();
        handleTyping(e.target.value);
    });

    return (
        <div className="main">
            <textarea className="textbox"
                type="text"
                // value={message.text}
                // onChange={onChange}
            />
        </div>
    )
}

export default ChatBody