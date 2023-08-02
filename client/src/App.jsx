import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import socketIO from 'socket.io-client';
import ChatPage from './pages/ChatPage';
import './App.css';

const socket = socketIO.connect("http://100.97.123.8:3001");

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [chatroom, setChatroom] = useState([]);
  const [message, setMessage] = useState({});

  function handleLogin(value) {
    localStorage.setItem('username', value);
    socket.emit('joinChatroom', { username: value });
    setLoggedIn(true);
    setUsername(value);
  }

  function handleLogout() {
    socket.emit("leaveChatroom");
    localStorage.removeItem('username');
    setLoggedIn(false);
  }

  function handleTyping(text) {
    socket.emit('message', {
      message: {
        text,
        userID: socket.id,
        date: Date.now()
      }
    });
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

  useEffect(() => {
    if (!loggedIn) {
      const _username = localStorage.getItem('username')
      if (_username) {
        handleLogin(_username);
      }
    }
  }, [loggedIn]);

  useEffect(() => {
    socket.on('push', data => {
      // filter our user from message
      let user = data.filter(usr => usr.userID === socket.id);
      // // set our message
      let userMessage = {}
      if (user.message) {
        userMessage = user.message
      }
      setMessage(userMessage);
      // set chatroom
      setChatroom(data);
    });
    return () => {
      socket.off('push');
    }
  }, [chatroom, message]);

  let Element = loggedIn ?
    <ChatPage isConnected={isConnected} handleTyping={handleTyping} handleLogout={handleLogout} chatroom={chatroom} username={username} message={message} /> :
    <HomePage handleLogin={handleLogin} />

  return (
    Element
  );
}

export default App;
