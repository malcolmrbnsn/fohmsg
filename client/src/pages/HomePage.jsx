import { useState } from 'react';

const HomePage = ({handleLogin}) => {
    const [username, setUsername] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(username);
    }
    const handleChange = (e) => {
        setUsername(e.target.value)
    }

    return (
        <div className='home'>
            <form className='home form' onSubmit={handleSubmit}>
                <h1>Sign in to Chat</h1>
                <input type="text" className='' name="username" id="username" value={username} onChange={handleChange}/>
                <button type="submit">Sign In</button>

            </form>
        </div>
    )
}

export default HomePage;