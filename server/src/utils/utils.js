const { Sequelize } = require('sequelize');

const checkTab = tab => {
	const tabParam = {
		newest: ['id', 'DESC'],
		popular: [[Sequelize.col('likesCount'), 'DESC']],
		unanswered: [[Sequelize.col('answersCount'), 'ASC']],
	};

	return tabParam[tab] || ['id', 'DESC'];
};

module.exports = {
	checkTab,
};
