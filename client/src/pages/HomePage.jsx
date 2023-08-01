import { useState } from 'react';
import './HomePage.css';

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
        // TODO: doesnt float centre
        <div className="d-flex align-items-center py-4">
          <div className="form-signin w-100 m-auto text-center">
          <h1>FOHMSG</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" id="username" value={username} onChange={handleChange}/>
            </div>
            {/* <div className="mb-3">
              <label for="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" />
            </div> */}
            <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
          </form>
        </div>
        </div>
    )
}

export default HomePage;