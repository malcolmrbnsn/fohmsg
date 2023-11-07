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
        console.log("socket: sending message")
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
        console.log("socket: sending typing")
        // Emit 'typing' event when user starts typing
        if (!isTyping) {
            setIsTyping(true);
            socket.emit('typing', user.username);
        }

        // Clear previous timeout and set a new one
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            setIsTyping(false);
            console.log("socket: sending notTyping")
            socket.emit('notTyping', user.username);
        }, 3000);
    }

    // function sendEffects(newEffects) {
    //     socket.emit('effects', newEffects);
    // } 

    useEffect(() => {
        console.log("UseEffect set: Typing")
        socket.on('currentlyTyping', (typingUsers) => {
            console.log("socket: received currentlyTyping")
            setTyping(typingUsers);
        });
        socket.on('clearTyping', () => {
            console.log("socket: received clearTyping")
            // Clear the typing indicator from the UI
            setTyping([]);
        });
        return () => {
            console.log("UseEffect unset: Typing")
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
        console.log("UseEffect set: Push")
        socket.on("push", (data) => {
            console.log("socket: push")
            setUsers(data.users);
            setMessages(data.messages);
            // setEffects(data.effects);
        })

        return () => {
            console.log("UseEffect unset: Push")
            socket.off('push');
        }
    }, [])

    function joinChatroom() {
        console.log("Socket: JoinChatroom requested");
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
    // // check login, redirect if not
    // useEffect(() => {
    //     console.log("joinChatroom")
    //     joinChatroom();
    // }, []);

    // tracks connection state
    useEffect(() => {
        console.log("UseEffect Set: Connection")
        function onConnect() {
            console.log("socket: connect")
            setConnected(true);
            joinChatroom();
        }
        function onDisconnect() {
            console.log("socket: disconnect")
            setConnected(false);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            console.log("UseEffect unset: Connection")
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, []);

    useEffect(() => {
        console.log("UseEffect set: Scroll")
        // scroll to bottom every time messages change
        lastMessageRef.current?.scrollIntoView({});
    }, [messages]);

    const messageList = messages?.reduce((acc, msg, index) => {
        if (msg.type === "message") {
            if (index === 0 || messages[index - 1].username !== msg.username) {
                acc.push({
                    username: msg.username,
                    text: msg.text,
                    time: msg.time,
                    id: msg.id,
                    type: msg.type
                });
            } else {
                acc[acc.length - 1].text += `\n${msg.text}`;
            }
        } else {
            acc.push({
                type: msg.type, // Add this line
                username: msg.username,
                text: msg.text,
                time: msg.time,
                id: msg.id
            });
        }
        return acc;
    }, []).map((msg) => (
        msg.type === "message" ?
            <ChatMessage
                username={msg.username}
                text={msg.text}
                time={msg.time}
                key={msg.id}
            /> : <SystemMessage username={msg.username} text={msg.text} time={msg.time} key={msg.id} />

    ));

    return (
        <div class="chat-page">
            <Sidebar visible={sidebarVisible} users={users} />
            <ChatHeader connected={connected} user={user} setSidebarVisible={setSidebarVisible} visible={sidebarVisible} />
            <div className="chat-body">
                {messageList}
                <div ref={lastMessageRef} />
            </div>
            <ChatBox sendMessage={sendMessage} sendTyping={sendTyping} typing={typing} />
        </div>
    );
}
