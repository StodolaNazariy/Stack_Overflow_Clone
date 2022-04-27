const { ErrorHandler } = require('../utils');
const { Users, Auth } = require('../database/database');
const { jwtService } = require('../services');

const checkAuth = async (req, res, next) => {
	try {
		console.log('---------------------------------');
		console.log(' ');
		console.log('Stuk to CHECK ACCESS TOKEN');
		console.log(' ');
		console.log(req.cookies);
		console.log('---------------------------------');

		const token = req.get('Authorization');

		const userByAccessToken = await Users.findOne({
			attributes: ['id', 'email', 'name'],
			include: [
				{
					model: Auth,
					where: { access_token: token },
					attributes: ['id', 'userId', 'role'],
				},
			],
			raw: true,
		});

		if (userByAccessToken) {
			req.currentUser = userByAccessToken;
			next();
		}

		const userByRefreshToken = await Users.findOne({
			attributes: ['id', 'email', 'name'],
			include: [
				{
					model: Auth,
					where: { refresh_token: req.cookies['refresh_token'] },
					attributes: ['id', 'userId', 'role'],
				},
			],
			raw: true,
		});

		if (!userByRefreshToken) {
			throw new ErrorHandler(401, 'Invalid token');
		}

		const tokenPair = jwtService.generateTokenPair();

		await Auth.update(
			{ ...tokenPair },
			{ where: { userId: userByRefreshToken.id } },
		);

		res.cookie('refresh_token', tokenPair.refresh_token, {
			httpOnly: true,
			secure: true,
		});

		req.access_token = tokenPair.access_token;
		next();
	} catch (e) {
		next(e);
	}
};

module.exports = checkAuth;
