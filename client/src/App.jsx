import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import socketIO from 'socket.io-client';
import ChatPage from './pages/ChatPage';
import './App.css';

const socket = socketIO.connect("http://127.0.0.1:3001");

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [chatroom, setChatroom] = useState([]);

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
    socket.emit('sendMessage', {
      text,
      username,
      socketID: socket.id,
      date: Date.now()
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
      setChatroom(data);
    });
    return () => {
      socket.off('push');
    }
  }, [chatroom]);

let Element = loggedIn ?
    <ChatPage isConnected={isConnected} handleTyping={handleTyping} handleLogout={handleLogout} chatroom={chatroom} /> :
    <HomePage handleLogin={handleLogin} />

  return (
    Element
  );
}

export default App;
