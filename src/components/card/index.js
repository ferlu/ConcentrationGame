// @vendors
import cn from "classnames";
// assets
import emoji from "../../assets/thinking-emoji.png";
// styles
import "./styles.scss";

const Card = ({ id, src, alt, onClick, showFront }) => {
	const handleSelfClick = () => {
		onClick();
	};

	let cardClass = cn(
		"card_container sm:h-30 relative m-2 flex h-40 cursor-pointer overflow-hidden rounded-md border-4 border-nord-8 shadow-md",
		{
			"border-nord-15": showFront,
		}
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
