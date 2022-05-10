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
				},
				include: [
					{
						model: Questions,
						attributes: [],
					},
				],
				group: ['users.id'],
				raw: true,
			});

			if (!user) {
				throw new ErrorHandler(404, `User with id = ${id} not found`);
			}

			const user_profile = await UserProfile.findOne({
				where: { userId: user.id },
			});

			const likesPerQuestion = await Questions.findAll({
				where: { userId: user.id },
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

			const likesCount = likesPerQuestion.reduce(
				(sum, current) => sum + current.likesCount,
				0,
			);

			const questions = await Questions.findAndCountAll({
				where: { userId: user.id },
			});

			const answers = await Answers.findAndCountAll({
				where: { userId: user.id },
			});

			res.status(200).json({
				user,
				user_profile,
				likesCount,
				questionsCount: questions.count,
				answersCount: answers.count,
			});
		} catch (e) {
			next(e);
		}
	}

	async updateProfile(req, res, next) {
		try {
			const { employement, residence, aboutMe } = req.body;
			// const { avatar } = req.files;
			// let fileName = 'vfdbdfndnfndfndf' + '.jpg';
			// avatar.mv(path.resolve(__dirname, '..', 'static', fileName));
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
				},
				{ where: { userId: 1 } },
			);

			res.json(status);
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
