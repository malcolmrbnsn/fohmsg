import { useState } from 'react';

const LoginPage = ({login}) => {
    const [username, setUsername] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username);
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

export default LoginPage;