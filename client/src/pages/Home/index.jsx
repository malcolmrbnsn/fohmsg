import { useState } from 'preact/hooks';
import './style.css';
import { useLocation } from 'preact-iso';

export function Home() {
	const [username, setUsername] = useState("");
	const [formError, setFormError] = useState('')
	const location = useLocation();

	function handleSubmit(e) {
		e.preventDefault();
		if (username.length >= 1) {
			console.log(username);
			const newUserID = String(Math.floor(Math.random() * 1000000000))
			localStorage.setItem("userID", newUserID);
			localStorage.setItem("username", username);
			location.route('/chat');
		} else {
			console.error("ERROR: username too short")
			setFormError("Username too short")
		}
	}

	function handleInput(e) {
		setUsername(e.target.value);
	}

	return (
		<div class="home">
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">Username</label>
				<input type="text" name="username" onInput={handleInput}/>
				<button type="submit">Sign In</button>
				{Boolean(formError) &&
        <div className="form-error">{formError}</div>
      }
			</form>
		</div>
	);
}

