const { ErrorHandler } = require('../utils');
const { Users, Auth } = require('../database/database');

class AuthMiddleware {
	async checkAuth(req, res, next) {
		try {
			const token = req.get('Authorization');

			const user = await Users.findOne({
				attributes: ['id', 'email', 'name'],
				include: [
					{
						model: Auth,
						where: { access_token: token },
						attributes: ['id', 'userId', 'role'],
					},
				],
			});

			if (!user) {
				throw new ErrorHandler(401, 'Unauthorized');
			}

			req.currentUser = user;
			next();
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new AuthMiddleware();
