import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

const OpenSearch = ({ onClick }) => {
	return (
		<div className='search_box' style={{ paddingTop: '5px' }}>
			<SearchIcon sx={{ fontSize: 30 }} className='icon_fill_1' onClick={onClick} />
		</div>
	);
};

export default OpenSearch;
