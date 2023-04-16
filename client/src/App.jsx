import React, {useState, useEffect, isValidElement} from 'react';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import { socket } from './socket';

import './App.css'

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);

  // if (localStorage.getItem('username')) {
  //   setLoggedIn(true);
  //   setUsername(localStorage.getItem('username'));
  // }

  function login(usr) {
    localStorage.setItem('username', usr);
    setUsername(usr);
    setLoggedIn(true);
  }

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <div>
        {
        loggedIn ? 
        <ChatPage messages={messages}/>
        : <LoginPage login={login}/>
        }
    </div>
  );
}

export default App;
