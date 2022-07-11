import React, { useState, useEffect } from 'react';
import './TagCard.scss';

const TagCard = ({ tag: { id, name, description }, handleClick }) => {
	const [posX, setPosX] = useState(0);

	const handleMouseOver = event => {
		event.stopPropagation();
		// TODO fix ligoc
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
