import React from "react";

const ChatBody = ({ chatroom, handleTyping }) => {

    const onChange = ((e) => {
        e.preventDefault();
        handleTyping(e.target.value);
    });

    const messages = chatroom.map(user => <div key={user.socketID}><h4>{user.username}</h4><p>{user.lastMessage?.text ?? ""}</p></div>)
    // i


    return  <div class="col h-100">
                <div>
                    <h1>Default</h1>
                </div>

                {messages}

                <div class="input-group">
                    <textarea name="" class="form-control type_msg" placeholder="Type your message..."
                        // value={message.text}
                        value={"asdf"}
                        onChange={onChange}
                    ></textarea>
                </div>
            </div>

}

export default ChatBody