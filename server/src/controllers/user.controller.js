const ErrorHandler = require('../utils').ErrorHandler;
const { jwtService, passwordService, emailService } = require('../services');
const { Users, Auth, UserProfile } = require('../database/database');
const path = require('path');

class UserController {
	async createUser(req, res, next) {
		try {
			const { password } = req.body;

			const hashPassword = await passwordService.hash(password);

			const user = await Users.create({
				...req.body,
				password: hashPassword,
			});

			if (user) {
				Auth.create({ userId: user.id });
				UserProfile.create({ userId: user.id });
			}

			// await emailService.sendMail('onepiece.nazar@gmail.com');

			res.status(200).json(user);
		} catch (e) {
			next(e);
		}
	}

	async loginUser(req, res, next) {
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
	}

	async updateProfile(req, res, next) {
		try {
			const { employement, residence, aboutMe } = req.body;
			const { avatar } = req.files;
			let fileName = 'vfdbdfndnfndfndf' + '.jpg';
			avatar.mv(path.resolve(__dirname, '..', 'static', fileName));
			// const book = await Book.create({
			// 	name,
			// 	author,
			// 	description,
			// 	price,
			// 	genreId,
			// 	image: fileName,
			// });

			const status = await UserProfile.update(
				{
					employement: employement,
					residence: residence,
					about: aboutMe,
					avatar: fileName,
				},
				{ where: { userId: 2 } },
			);

			res.json(status);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new UserController();
