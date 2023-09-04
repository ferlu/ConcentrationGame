// @vendors
import cn from "classnames";
// assets
import emoji from "../../assets/thinking-emoji.png";
// styles
import "./styles.scss";

const Card = ({ id, src, alt, onClick, showFront, wasGuessed }) => {
	const handleSelfClick = () => {
		onClick();
	};

	let cardClass = cn(
		"card_container relative flex rounded-3xl cursor-pointer overflow-hidden shadow-lg border-white border-4 bg-slate-800 border-nord-14 w-32 h-40",
		{
			"border-nord-15": showFront,
			"pointer-events-none": wasGuessed,
		}
	);

	let innerCardClass = cn(
		"card_container__inner relative rounded-3xl flex hover:bg-nord-3 w-32 h-40",
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
						className='h-full w-full object-cover rounded-lg'
					/>
				</div>
			</div>
		</div>
	);
};

export default Card;
