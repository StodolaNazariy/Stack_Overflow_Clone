const { Sequelize } = require('sequelize');
const ErrorHandler = require('../utils').ErrorHandler;
const { jwtService, passwordService, emailService } = require('../services');
const {
	Users,
	Auth,
	UserProfile,
	Answers,
	Questions,
	QuestionLikes,
} = require('../database/database');
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

	async getUserProfileById(req, res, next) {
		try {
			const { id } = req.params;

			const user = await Users.findOne({
				subQuery: false,
				where: { id: id },
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'password', 'email'],
					include: [
						[
							Sequelize.fn(
								'COUNT',
								Sequelize.col('questions.userId'),
							),
							'questionCount',
						],
						[
							Sequelize.fn(
								'COUNT',
								Sequelize.col('answers.userId'),
							),
							'answersCount',
						],
					],
				},
				include: [
					{
						model: Questions,
						attributes: [],
					},
					{
						model: Answers,
						attributes: [],
					},
					{
						model: QuestionLikes,
						attributes: [],
					},
				],
				group: ['users.id'],
				raw: true,
			});

			if (!user) {
				throw new ErrorHandler(404, `User with id = ${id} not found`);
			}

			const user_profile = await Users.findOne({
				where: { id: id },
				attributes: [],
				include: [
					{
						model: UserProfile,
					},
				],
			});

			const likesPerQuestion = await Questions.findAll({
				subQuery: false,
				attributes: [
					[
						Sequelize.fn(
							'COUNT',
							Sequelize.col('question_likes.questionId'),
						),
						'likesCount',
					],
				],
				include: [
					{
						model: QuestionLikes,
						attributes: [],
					},
				],
				group: ['questions.id'],
				raw: true,
			});

			const receivedLikes = likesPerQuestion.reduce(
				(sum, current) => sum + current.likesCount,
				0,
			);

			res.status(200).json({
				user,
				user_profile,
				receivedLikes,
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

	async defineUserAuth(req, res, next) {
		try {
			console.log('---------------------------------');
			console.log(' ');
			console.log('Stuk to DEFINE USER');
			console.log(' ');
			console.log(req.cookies['refresh_token']);
			console.log('---------------------------------');

			const token = req.get('Authorization');
			console.log('token', token);

			if (!token) {
				throw new ErrorHandler(401, 'No Access token');
			}

			console.log('POINT 1');

			const userByAccessToken = await Users.findOne({
				attributes: ['id', 'email', 'name'],
				include: [
					{
						model: Auth,
						where: { access_token: token },
						attributes: ['id', 'userId', 'role'],
					},
				],
				// raw: true,
			});

			console.log('POINT 2', userByAccessToken);

			if (userByAccessToken) {
				const { id, email, name, auth } = userByAccessToken;

				res.status(200).json({
					user: { id, email, name },
					isAuth: true,
					role: auth.role,
				});

				console.log('POINT 3');
				return;
			}

			console.log('POINT 4');

			if (!req.cookies['refresh_token']) {
				throw new ErrorHandler(401, 'No refresh token');
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

			console.log('POINT 5');

			if (!userByRefreshToken || !userByAccessToken['auth.access_token']) {
				throw new ErrorHandler(401, 'Unauthorized');
			}

			console.log('POINT 6');

			const tokenPair = jwtService.generateTokenPair();

			await Auth.update(
				{ ...tokenPair },
				{ where: { userId: userByRefreshToken.id } },
			);

			res.cookie('refresh_token', tokenPair.refresh_token, {
				httpOnly: true,
				secure: true,
			});

			const { id, email, name, auth } = userByRefreshToken;

			res.status(200).json({
				user: { id, email, name },
				isAuth: true,
				access_token: tokenPair.access_token,
			});
		} catch (e) {
			next(e);
		}
	}

	async logOut(req, res, next) {
		try {
			console.log('LOG OUT');
			const { id } = req.currentUser;

			await Auth.update(
				{ access_token: null, refresh_token: null },
				{ where: { userId: id } },
			);

			res.clearCookie('refresh_token');
			res.cookie('refresh_token', 'refresh_token', {
				httpOnly: true,
				secure: true,
			});

			res.status(200).json();
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new UserController();
