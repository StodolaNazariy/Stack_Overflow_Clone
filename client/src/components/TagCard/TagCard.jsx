import React, { useState } from 'react';
import './TagCard.scss';

const TagCard = ({ tag: { id, name, description }, handleClick }) => {
	const [posX, setPosX] = useState(-20);

	const handleMouseOver = event => {
		event.stopPropagation();
		console.log(event);
		console.log(window.innerWidth);
		console.log('tag width -->', event.target.clientWidth);

		const tagWidth = event.target.clientWidth;

		const offset = window.innerWidth - event.clientX;
		console.log('offset -->> ', offset);

		if (offset < 200) {
			setPosX(-(200 - offset) - 10);
		}

		if (offset > 200) {
			setPosX(-(200 - tagWidth) / 2);
		}
	};

	return (
		<div className='tag_card' onClick={handleClick} onMouseOver={handleMouseOver}>
			<div className='tag_card_title bg_3 color_1'>{name}</div>
			<div className='tag_card_description bg_3 color_1' style={{ left: `${posX}px` }}>
				{description}
			</div>
		</div>
	);
};

export default TagCard;
