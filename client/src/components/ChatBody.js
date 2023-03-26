import React from "react";
import { useNavigate } from "react-router-dom";


const ChatBody = ({ messages, lastMessageRef, typingStatus }) => {
    const navigate = useNavigate();

    const handleChatLeave = () => {
        localStorage.removeItem('username');
        navigate("/");
        window.location.reload();
    }

    return (
        <>
        <header>
          <h2>Chat Log</h2>
          <button onClick={handleChatLeave}>
            Leave
          </button>
        </header>
  
        <div>

          {messages.map((message) => {
            return (
            <div>
              <b>{message.username}</b>
              <p>{message.text}</p>
            </div>
            )
          })}
          <div ref={lastMessageRef}/>
            {/*This is triggered when a user is typing*/}
    
            <div>
              <i>{typingStatus}
              </i>
            </div>

        </div>
      </>
    )
}

export default ChatBody;