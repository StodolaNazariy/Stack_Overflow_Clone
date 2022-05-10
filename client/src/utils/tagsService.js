const joinTags = selected => {
	const tags = selected.map(item => item.value);
	return tags.join(' ');
};

const formatTagsToOptions = tags => {
	return tags.map(tag => {
		return { value: tag.name, label: tag.name };
	});
};

const splittedTags = tags => {
	return tags.split(' ');
};

export { joinTags, formatTagsToOptions, splittedTags };
