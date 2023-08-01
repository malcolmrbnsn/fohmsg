import React from "react";

const ChatBody = ({ chatroom, handleTyping, message }) => {

    const onChange = ((e) => {
        e.preventDefault();
        handleTyping(e.target.value);
    });

    const messages = chatroom.map(user => <div key={user.userID}><h4>{user.username}</h4><p>{user.message?.text ?? ""}</p></div>)

    return  <div className="col h-100">
                <div>
                    <h1>Default</h1>
                </div>

                {messages}

                <div className="input-group">
                    <textarea name="" className="form-control type_msg" placeholder="Type your message..."
                        value={message.text}
                        onChange={onChange}
                    ></textarea>
                </div>
            </div>

}

export default ChatBody