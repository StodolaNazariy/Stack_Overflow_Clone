const ErrorHandler = require('../utils').ErrorHandler;
const { jwtService, passwordService, emailService } = require('../services');
const {
	Users,
	Auth,
	UserPreferences,
	UserSettings,
	UserProfile,
} = require('../database/database');

module.exports = {
	createUser: async (req, res, next) => {
		try {
			const { password } = req.body;

			const hashPassword = await passwordService.hash(password);

			const user = await Users.create({
				...req.body,
				password: hashPassword,
			}).catch(e =>
				res.status(400).json({
					message: `User with this ${Object.keys(
						e.fields,
					)} is already exist`,
				}),
			);

			Auth.create({ userId: user.id });
			UserProfile.create({ userId: user.id });
			UserPreferences.create({ userId: user.id });
			UserSettings.create({ userId: user.id });

			// await emailService.sendMail('onepiece.nazar@gmail.com');

			res.status(200).json(user);
		} catch (e) {
			next(e);
		}
	},

	loginUser: async (req, res, next) => {
		try {
			console.log('STUK TO LOGIN');

			const { password, email } = req.body;

			const user = await Users.findOne({
				where: { email: email },
				raw: true,
				attributes: ['id', 'name', 'email', 'password'],
			});

			if (!user) {
				throw new ErrorHandler(404, 'User not found');
			}

			if (!(await passwordService.compare(password, user.password))) {
				throw new ErrorHandler(400, 'Password is wrong');
			}

			const tokenPair = jwtService.generateTokenPair();

			await Auth.update({ ...tokenPair }, { where: { userId: user.id } });

			delete user['password'];

			res.cookie('refresh_token', tokenPair.refresh_token, {
				httpOnly: true,
				secure: true,
			});

			res.status(200).json({
				access_token: tokenPair.access_token,
				user: user,
			});
		} catch (e) {
			next(e);
		}
	},
};
