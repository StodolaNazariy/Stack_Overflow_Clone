const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../utils');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACTION_TOKEN_SECRET } =
	require('../configs').Params;

module.exports = {
	generateTokenPair: () => {
		const access_token = jwt.sign({}, ACCESS_TOKEN_SECRET, {
			expiresIn: '15m',
		});
		const refresh_token = jwt.sign({}, REFRESH_TOKEN_SECRET, {
			expiresIn: '31d',
		});
		return {
			access_token,
			refresh_token,
		};
	},

	verifyToken: (token, tokenType = 'access') => {
		try {
			let secret;
			switch (tokenType) {
				case 'access':
					secret = ACCESS_TOKEN_SECRET;
					break;
				case 'action':
					secret = ACTION_TOKEN_SECRET;
					break;
				case 'refresh':
					secret = REFRESH_TOKEN_SECRET;
					break;
			}
			// tokenType === 'access' ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;

			jwt.verify(token, secret);
		} catch (e) {
			throw new ErrorHandler(401, 'Invalid token');
		}
	},

	generateActionToken: () => {
		const action_token = jwt.sign({}, ACTION_TOKEN_SECRET, {
			expiresIn: '5m',
		});
		return action_token;
	},
};
