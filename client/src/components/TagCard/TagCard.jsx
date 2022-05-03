import React, { useState, useEffect } from 'react';
import './TagCard.scss';

const checkLeftPosition = (offset, tagWidth) => {
	const vw = window.innerWidth;
	let left;
	if (offset < 200) {
		left = -(200 - tagWidth - 10);
	}
	if (offset > vw - 200) {
		left = (200 - (vw - offset)) / 2 - 20 - tagWidth;
	}
	if (offset > 200 && offset < vw - 200) {
		left = -((200 - tagWidth) / 2);
	}
	return left || 0;
};

const TagCard = ({ tag: { id, name, description }, handleClick }) => {
	const [posX, setPosX] = useState(0);

	const handleMouseOver = event => {
		event.stopPropagation();

		const tagWidth = event.target.clientWidth;
		const offset = window.innerWidth - event.clientX;

		const left = checkLeftPosition(offset, tagWidth);
		setPosX(left);
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
