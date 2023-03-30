import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({socket}) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('username', username);
        socket.emit('newUser', {username, socketID: socket.id});
        navigate("/chat");
    }

    return (
        <div className='home'>
            <form className='home form' onSubmit={handleSubmit}>
                <h1>Sign in to Chat</h1>
                <input type="text" className='' name="username" id="username" value={username} onChange={e => setUsername(e.target.value)}/>
                <button type="submit">Sign In</button>

            </form>
        </div>
    )
}

export default Home;