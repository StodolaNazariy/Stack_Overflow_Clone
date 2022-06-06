const createSubject = (user_name, subject) => {
	return `${user_name}! ${subject}`;
};

module.exports = { createSubject };
