const { ErrorHandler } = require('../utils');
const { Users, Auth } = require('../database/database');
const { STATUS_CODE } = require('../constants');

class RoleMiddleware {
	checkRole(role) {
		return async (req, res, next) => {
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
					throw new ErrorHandler(
						STATUS_CODE.UNAUTHORIZED,
						'Unauthorized',
					);
				}

				if (user.auth.role !== role) {
					throw new ErrorHandler(STATUS_CODE.FORBIDEN, 'Not Allowed');
				}

				req.currentUser = user;
				next();
			} catch (e) {
				next(e);
			}
		};
	}
}

module.exports = new RoleMiddleware();
