const bcrypt = require('bcrypt');

module.exports = {
	hash: password => bcrypt.hash(password, 10),

	compare: async (password, hashPassword) => {
		const isPasswordMatch = await bcrypt.compare(password, hashPassword);

		return isPasswordMatch;
	},
};
