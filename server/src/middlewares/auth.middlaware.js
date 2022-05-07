const { ErrorHandler } = require('../utils');
const { Users, Auth } = require('../database/database');

const checkAuth = async (req, res, next) => {
	try {
		console.log('---------------------------------');
		console.log(' ');
		console.log('Stuk to CHECK ACCESS TOKEN');
		console.log(' ');
		console.log(req.cookies);
		console.log('---------------------------------');

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
			raw: true,
		});

		req.currentUser = user;
		next();
	} catch (e) {
		next(e);
	}
};

module.exports = checkAuth;
