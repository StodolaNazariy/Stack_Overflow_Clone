const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../utils');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } =
	require('../configs').Params;

module.exports = {
	generateTokenPair: () => {
		const access_token = jwt.sign({}, ACCESS_TOKEN_SECRET, {
			expiresIn: '5m',
		});
		const refresh_token = jwt.sign({}, REFRESH_TOKEN_SECRET, {
			expiresIn: '31d',
		});
		return {
			access_token,
			refresh_token,
		};
	},

	verifyTokens: (token, tokenType = 'access') => {
		try {
			const secret =
				tokenType === 'access'
					? ACCESS_TOKEN_SECRET
					: REFRESH_TOKEN_SECRET;

			jwt.verify(token, secret);
		} catch (e) {
			throw new ErrorHandler(401, 'Invalid token');
		}
	},
};
