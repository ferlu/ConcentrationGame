// @vendors
import { useEffect, useState } from "react";
// @components
import Board from "./components/board";
// @styles
import "./App.scss";

function App() {
	const [askUsername, setAskUsername] = useState(true);
	const [tempUsername, setTempUsername] = useState("");
	const [rightGuess, setRightGuess] = useState(0);
	const [wrongGuess, setWrongGuess] = useState(0);
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
			{askUsername ? (
				<div className='username__input flex flex-col'>
					<h1
						htmlFor='name'
						className='text-3xl text-nord-5'>
						What's your name?
					</h1>
					<input
						autoFocus
						type='text'
						id='name'
						name='name'
						required
						minLength='3'
						maxLength='10'
						size='12'
						className='rounded-md border-4 border-nord-9 bg-transparent p-1 my-4 w-full'
						onChange={(e) => setTempUsername(e.target.value)}
					/>
					<button
						onClick={handleSaveUsername}
						className='w-full m-0'>
						Save
					</button>
				</div>
			) : (
				<>
					<nav className='bg-gray-900 fixed w-full z-20 top-0 left-0'>
						<div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
							<h1
								href='https://flowbite.com/'
								className='flex items-center'>
								<span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white '>
									Hi, {username}
								</span>
							</h1>
							<div
								className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
								id='navbar-sticky'>
								<ul className='flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
									<li className='text-2xl font-bold text-nord-14'>
										{rightGuess} ✅
									</li>
									<li className='text-2xl font-bold text-nord-11'>
										{wrongGuess}❌
									</li>
								</ul>
							</div>
						</div>
					</nav>
					<Board
						username={username}
						rightGuess={setRightGuess}
						wrongGuess={setWrongGuess}
					/>
				</>
			)}
		</div>
	);
}

export default App;
