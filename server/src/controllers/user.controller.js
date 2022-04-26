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

			res.status(200).json(user);
		} catch (e) {
			next(e);
		}
	},

	loginUser: async (req, res, next) => {
		try {
			const { password, name } = req.body;

			const user = await Users.findOne({
				where: { name: name },
				raw: true,
				attributes: ['id', 'name', 'email', 'password'],
			});

			if (!user) {
				throw new ErrorHandler(
					404,
					'User not found. Please check if the login is correct',
				);
			}

			if (!(await passwordService.compare(password, user.password))) {
				throw new ErrorHandler(400, 'Password is wrong');
			}

			const tokenPair = jwtService.generateTokenPair();

			await Auth.update({ ...tokenPair }, { where: { userId: user.id } });

			delete user['password'];

			console.log(user.email);
			console.log('try send email');
			await emailService.sendMail('onepiece.nazar@gmail.com');
			console.log('we tried so hard');

			res.status(200).json({ tokens: tokenPair, user: user });
		} catch (e) {
			next(e);
		}
	},
};
