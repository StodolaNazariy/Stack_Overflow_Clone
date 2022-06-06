const ErrorHandler = require('../utils').ErrorHandler;
const { jwtService } = require('../services');
const { Users, Auth } = require('../database/database');
const { STATUS_CODE } = require('../constants');

class AuthController {
	async defineUserAuth(req, res, next) {
		try {
			const token = req.get('Authorization');

			if (!token) {
				throw new ErrorHandler(
					STATUS_CODE.UNAUTHORIZED,
					'No Access token',
				);
			}

			const userByAccessToken = await Users.findOne({
				attributes: ['id', 'email', 'name'],
				include: [
					{
						model: Auth,
						where: { access_token: token },
						attributes: ['id', 'userId', 'role'],
					},
				],
			});

			if (userByAccessToken) {
				const { id, email, name, auth } = userByAccessToken;

				res.status(200).json({
					user: { id, email, name },
					isAuth: true,
					role: auth.role,
				});
				return;
			}

			if (!req.cookies['refresh_token']) {
				throw new ErrorHandler(
					STATUS_CODE.UNAUTHORIZED,
					'No refresh token',
				);
			}

			const userByRefreshToken = await Users.findOne({
				attributes: ['id', 'email', 'name'],
				include: [
					{
						model: Auth,
						where: { refresh_token: req.cookies['refresh_token'] },
						attributes: ['id', 'userId', 'role', 'access_token'],
					},
				],
				raw: true,
			});

			if (
				!userByRefreshToken ||
				!userByAccessToken['auth.access_token']
			) {
				throw new ErrorHandler(STATUS_CODE.UNAUTHORIZED, 'Unauthorized');
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

			const { id, email, name } = userByRefreshToken;

			res.status(200).json({
				user: { id, email, name },
				isAuth: true,
				access_token: tokenPair.access_token,
			});
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new AuthController();
