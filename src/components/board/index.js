// @vendors
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
// @components
import Card from "../card";
// @constants
import { fetchImages } from "../../constants";
// @assets
import winAnimation from "../../assets/celebration.json";
import loadingAnimation from "../../assets/loading.json";

const Board = ({ username, rightGuess, wrongGuess }) => {
	const [images, setImages] = useState();
	const [clickedCards, setClickedCards] = useState([]);
	const [guessedCards, setGuessedCards] = useState([]);
	const [completedGame, setCompletedGame] = useState(false);

	useEffect(() => {
		if (guessedCards.length === images?.length / 2) {
			setCompletedGame(true);
		}
	}, [guessedCards, images]);

	useEffect(() => {
		fetchImages().then((response) => {
			let arrImgs = [...response.entries, ...response.entries];
			arrImgs.sort(() => Math.random() - 0.5);
			setImages(arrImgs);
		});
	}, []);

	useEffect(() => {
		if (!completedGame)
			if (clickedCards.length === 2) {
				let ids = clickedCards.map((card) => card.imageId);
				if (ids[0] === ids[1]) {
					if (!guessedCards.includes(ids[0])) {
						rightGuess((prevVal) => prevVal + 1);
						setGuessedCards((prev) => {
							let newGuesses = [...prev, ids[0]];
							return newGuesses;
						});
					}
				} else {
					wrongGuess((prevVal) => prevVal + 1);
				}
			}
	}, [clickedCards, guessedCards, completedGame, rightGuess, wrongGuess]);

	const handleCardClick = (data) => {
		if (clickedCards.length === 2) setClickedCards([]);

		// We can't compare the same card twice
		if (!clickedCards.find((card) => card.id === data.id)) {
			setClickedCards((prev) => {
				let newValues = [...prev];
				if (newValues.length < 2) {
					newValues.push(data);
				}
				return newValues;
			});
		}
	};

	const imagesComponent = () => {
		return images.map((item, index) => {
			let { image } = item.fields;
			let data = {
				imageId: image.uuid,
				id: `${index}_${image.uuid}`,
				src: image.url,
				alt: image.title,
			};

			return (
				<Card
					key={data.id}
					imageId={data.imageId}
					src={data.src}
					alt={data.alt}
					showFront={
						!guessedCards.includes(data.imageId) &&
						!clickedCards.map((card) => card.id).includes(data.id)
					}
					onClick={() => handleCardClick(data)}
				/>
			);
		});
	};

	const loadingImg = () => {
		return (
			<div className='flex justify-center items-center w-full'>
				<Lottie
					animationData={loadingAnimation}
					loop={true}
				/>
			</div>
		);
	};

	return (
		<div className='board-wrapper p-10'>
			{completedGame ? (
				<div>
					<h2 className='my-10 text-5xl'>Congrats, {username}!</h2>
					<Lottie
						animationData={winAnimation}
						loop={true}
					/>
				</div>
			) : images ? (
				<div className='board pt-12 grid grid-cols-2 sm:grid-cols-4 sm:grid-rows-[10] md:grid-cols-5 md:grid-rows-[8] lg:grid-cols-8 lg:grid-rows-5 gap-1'>
					{imagesComponent()}
				</div>
			) : (
				loadingImg()
			)}
		</div>
	);
};

export default Board;
