// @vendors
import { useEffect, useState } from "react";
// @components
import Board from "./components/board";
// @styles
import "./App.scss";

function App() {
	const [askUsername, setAskUsername] = useState(true);
	const [tempUsername, setTempUsername] = useState("");
	const [username, setUsername] = useState(localStorage.getItem("username"));

	// Ask for user's name on the first page load
	useEffect(() => {
		const storedUsername = localStorage.getItem("username");
		if (storedUsername) {
			setUsername(storedUsername);
			setAskUsername(false);
		}
	}, []);

	// Save username when clicking Save button
	const handleSaveUsername = () => {
		setUsername(tempUsername);
		localStorage.setItem("username", tempUsername);
		setAskUsername(false);
	};

	return (
		<div className='app flex justify-center text-center'>
			<header className='app__container'>
				{askUsername ? (
					<div className='username__input flex flex-col'>
						<label
							htmlFor='name'
							className='mb-4 text-xl text-nord-5'>
							Hi! Please tell us your name:
						</label>
						<div>
							<input
								autoFocus
								type='text'
								id='name'
								name='name'
								required
								minLength='3'
								maxLength='10'
								size='12'
								className='rounded-md border-4 border-nord-9 bg-transparent p-1'
								onChange={(e) => setTempUsername(e.target.value)}
							/>
							<button onClick={handleSaveUsername}>Save</button>
						</div>
					</div>
				) : (
					<Board username={username} />
				)}
			</header>
		</div>
	);
}

export default App;
