import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import socketIO from 'socket.io-client';
import ChatPage from './components/ChatPage';
import React, {useState, useEffect} from 'react';

const socket = socketIO.connect("http://100.97.123.8:3001");



function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);


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
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Home socket={socket}/> } />
            <Route path="/chat" element={ <ChatPage socket={socket} isConnected={isConnected}/> } />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
