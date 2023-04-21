import { useState } from 'react';

<<<<<<<< HEAD:client/src/pages/LoginPage.jsx
const LoginPage = ({login}) => {
========
const HomePage = ({handleLogin}) => {
>>>>>>>> restructure:client/src/pages/HomePage.jsx
    const [username, setUsername] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
<<<<<<<< HEAD:client/src/pages/LoginPage.jsx
        login(username);
========
        handleLogin(username);
    }
    const handleChange = (e) => {
        setUsername(e.target.value)
>>>>>>>> restructure:client/src/pages/HomePage.jsx
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

<<<<<<<< HEAD:client/src/pages/LoginPage.jsx
export default LoginPage;
========
export default HomePage;
>>>>>>>> restructure:client/src/pages/HomePage.jsx
