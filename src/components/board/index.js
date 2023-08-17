// @vendors
import { useEffect, useState } from "react";
// @components
import Card from "../card";
// @constants
import { fetchImages } from "../../constants";

const Board = () => {
	const [images, setImages] = useState();
	const [clickedCards, setClickedCards] = useState({});
	const [rightGuess, setRightGuess] = useState(0);
	const [wrongGuess, setWrongGuess] = useState(0);
	const [guessedCards, setGuessedCards] = useState([]);

	useEffect(() => {
		fetchImages().then((response) => {
			let arrImgs = [...response.entries, ...response.entries];
			arrImgs.sort(() => Math.random() - 0.5);
			setImages(arrImgs);
		});
	}, []);

	useEffect(() => {
		if (Object.keys(clickedCards).length === 2) {
			let ids = Object.values(clickedCards).map((value) => value);
			if (ids[0] === ids[1]) {
				if (!guessedCards.includes(ids[0])) {
					setRightGuess((prevVal) => prevVal + 1);
					setGuessedCards((prev) => {
						let newGuesses = [...prev, ids[0]];
						return newGuesses;
					});
				}
			} else setWrongGuess((prevVal) => prevVal + 1);
			// empty object
			setClickedCards({});
		}
	}, [clickedCards, guessedCards]);

	const handleCardClick = (i, id) => {
		// We can't compare the same card twice
		if (!Object.keys(clickedCards).includes(i)) {
			setClickedCards((prev) => {
				let newValues = { ...prev };
				if (Object.keys(newValues).length < 2) {
					newValues[i] = id;
				}
				return newValues;
			});
		}
	};

	return (
		<>
			<div className='flex justify-center'>
				<h2 className='mx-8'>Right Guesses: {rightGuess} </h2>
				<h2 className='mx-8'>Wrong Guesses: {wrongGuess}</h2>
			</div>
			<div className='grid-rows-20 sm:grid-rows-10 md:grid-rows-8 mt-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 lg:grid-rows-4'>
				{images ? (
					images.map((item, index) => {
						let { image } = item.fields;
						let data = {
							id: image.uuid,
							src: image.url,
							alt: image.title,
						};
						return (
							<Card
								key={`${index}_${data.id}`}
								id={data.id}
								src={data.src}
								alt={data.alt}
								beenGuessed={guessedCards.includes(data.id)}
								onClick={() => handleCardClick(index, data.id)}
							/>
						);
					})
				) : (
					<svg
						className='mr-3 h-5 w-5 animate-spin'
						viewBox='0 0 24 24'></svg>
				)}
			</div>
		</>
	);
};

export default Board;
