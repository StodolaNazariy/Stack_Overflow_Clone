const { Sequelize } = require('sequelize');

const { DB_DIALECT, DB_PASSWORD, DB_LOGIN, DB_HOST, DB_NAME } =
	require('../configs').Environmet;

const {
	createAnswersModel,
	createQuestionsModel,

	createTagsModel,
	createAuthModel,

	createUserModel,
	createUserProfileModel,

	createAnswersLikesModel,
	createQuestionLikesModel,

	createUserBookmarksModel,
} = require('./models');

const sequelize = new Sequelize(DB_NAME, DB_LOGIN, DB_PASSWORD, {
	host: DB_HOST,
	dialect: DB_DIALECT,
});

const Auth = createAuthModel(sequelize);
const Answers = createAnswersModel(sequelize);
const Questions = createQuestionsModel(sequelize);
const Users = createUserModel(sequelize);
const UserProfile = createUserProfileModel(sequelize);
const UserBookmarks = createUserBookmarksModel(sequelize);
const Tags = createTagsModel(sequelize);

// const QuestionLikes = createQuestionLikesModel(sequelize);
// const AnswersLikes = createAnswersLikesModel(sequelize);

Users.hasOne(Auth, { onDelete: 'cascade' });
Auth.belongsTo(Users);

Users.hasOne(UserProfile, { onDelete: 'cascade' });
UserProfile.belongsTo(Users);

Users.hasMany(Answers, { onDelete: 'cascade' });
Answers.belongsTo(Users);

Users.hasMany(Questions, { onDelete: 'cascade' });
Questions.belongsTo(Users);

Questions.hasMany(Answers, { onDelete: 'cascade' });
Answers.belongsTo(Questions);

const checkConnect = async () => {
	try {
		await sequelize.authenticate();

		// sequelize.sync({ force: true }).then(() => {
		// 	console.log('Drop and re-sync db.');
		// });

		console.log('-----------------------------------------------------');
		console.log('Connected successfully.');
		console.log('-----------------------------------------------------');
	} catch (error) {
		console.log('#######################################################');
		console.error('Unable to connect to the database:', error);
		console.log('#######################################################');
	}
};

module.exports = {
	Auth,
	Answers,
	Questions,

	Users,
	UserProfile,
	UserBookmarks,
	Tags,
	checkConnect,
};
