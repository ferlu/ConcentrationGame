import { useEffect, useState } from "react";
import emoji from "./assets/thinking-emoji.png";
import "./styles.scss";
import cn from "classnames";

const Card = ({ id, src, alt, beenGuessed, onClick }) => {
	const [showFront, setShowFront] = useState(true);

	useEffect(() => {
		console.log(
			"🚀 ~ file: index.js:12 ~ useEffect ~ beenGuessed:",
			beenGuessed
		);
		if (beenGuessed) setShowFront(false);
	}, [beenGuessed]);

	const handleSelfClick = () => {
		if (!beenGuessed && !showFront) setShowFront(true);
		else {
			setShowFront(!showFront);
			onClick();
		}
	};

	let cardClass = cn(
		"card_container sm:h-30 relative m-2 flex h-40 cursor-pointer overflow-hidden rounded-md border-4 border-nord-8 shadow-md"
	);

	let innerCardClass = cn(
		"card_container__inner relative flex hover:bg-nord-3",
		{
			"card_container__inner--front": showFront,
		}
	);

	return (
		<div
			id={id}
			className={cardClass}
			onClick={handleSelfClick}>
			<div className={innerCardClass}>
				<div className='card card--front flex items-center justify-center fixed w-full h-full'>
					<img
						alt='thinking emoji'
						src={emoji}
						className='mx-auto my-0 h-10 w-10'
					/>
				</div>
				<div className='card card--back'>
					<img
						src={src}
						alt={alt}
						className='h-full w-full object-cover'
					/>
				</div>
			</div>
		</div>
	);
};

export default Card;
