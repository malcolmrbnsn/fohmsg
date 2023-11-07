import { useLocation } from 'preact-iso';
import { useEffect, useRef, useState } from 'preact/hooks';
import { io } from 'socket.io-client';

import { ChatHeader } from './components/ChatHeader';
import { ChatBox } from './components/ChatBox';
import { ChatMessage } from './components/ChatMessage';
import { SystemMessage } from './components/SystemMessage';

import './style.css';
import { Sidebar } from './components/Sidebar';

const SERVER_URL = "http://127.0.0.1:3001";
const socket = io(SERVER_URL);

export function Chat() {
    const [connected, setConnected] = useState(false);
    const [user, setUser] = useState({ userID: undefined, username: undefined });
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const lastMessageRef = useRef(null);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [effects, setEffects] = useState({});

    let typingTimeout = null;

    const location = useLocation();

    function sendMessage(text) {
        const message = {
            userID: user.userID,
            username: user.username,
            text,
            time: Date.now(),
            type: "message"
        }
        socket.emit("client-message", message);
    }

    function sendTyping() {
        // Emit 'typing' event when user starts typing
        if (!isTyping) {
            setIsTyping(true);
            socket.emit('typing', user.username);
        }

        // Clear previous timeout and set a new one
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            setIsTyping(false);
            socket.emit('notTyping', user.username);
        }, 3000);
    }

    // function sendEffects(newEffects) {
    //     socket.emit('effects', newEffects);
    // } 

    useEffect(() => {
        socket.on('currentlyTyping', (typingUsers) => {
            setTyping(typingUsers);
        });
        socket.on('clearTyping', () => {
            // Clear the typing indicator from the UI
            setTyping([]);
        });
        return () => {
            socket.off('clearTyping');
            socket.off('currentlyTyping');
        }
    }, []);

    // useEffect(() => {
    //     socket.on('effects', (newEffects) => {
    //         setEffects(newEffects);
    //     });

    //     return () => {
    //         socket.off('effects');
    //     }
    // }, []);

    useEffect(() => {
        socket.on("push", (data) => {
            setUsers(data.users);
            setMessages(data.messages);
            // setEffects(data.effects);
        })

        return () => {
            socket.off('push');
        }
    }, [])

    function joinChatroom() {
        const localUsername = localStorage.getItem("username");
        const localUserID = localStorage.getItem("userID");
        if (localUsername && localUserID) {
            socket.emit("joinChatroom", { userID: localUserID, username: localUsername })
            setUser({
                userID: localUserID,
                username: localUsername
            });
        } else {
            // route
            location.route("/");
        }
    }
    // check login, redirect if not
    useEffect(() => {
        joinChatroom();
    }, []);

    // tracks connection state
    useEffect(() => {
        function onConnect() {
            setConnected(true);
            joinChatroom();
        }
        function onDisconnect() {
            setConnected(false);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, []);

    useEffect(() => {
        // scroll to bottom every time messages change
        lastMessageRef.current?.scrollIntoView({});
    }, [messages]);

    const messageList = messages?.map((msg) => (
        msg.type === "message" ? 
            <ChatMessage
            username={msg.username}
            text={msg.text}
            time={msg.time}
            key={msg.id} 
        /> : <SystemMessage username={msg.username} text={msg.text} time={msg.time} key={msg.id}  />
        
    ));

    return (
        <div class="chat-page">
            <Sidebar visible={sidebarVisible} users={users} />
            <ChatHeader connected={connected} user={user} setSidebarVisible={setSidebarVisible} visible={sidebarVisible}/>
            <div className="chat-body">
                {messageList}
                <div ref={lastMessageRef} />
            </div>
            <ChatBox sendMessage={sendMessage} sendTyping={sendTyping} typing={typing} />
        </div>
    );
}
