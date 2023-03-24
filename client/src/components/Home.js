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
        <form className='home__container' onSubmit={handleSubmit}>
            <h2>Sign in to Chat</h2>
            <input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)}/>
            <button type="submit">Sign In</button>

        </form>
    )
}

export default Home;