module.exports = {
	createAuthModel: require('./auth.model'),
	createUserModel: require('./user.model'),
	createUserPreferencesModel: require('./user_preferences.model'),
	createUserProfileModel: require('./user_profile.model'),
	createUserSettingsModel: require('./user_settings.model'),
	createQuestionsModel: require('./questions.model'),
	createAnswersModel: require('./answers.model'),

	createQuestionLikesModel: require('./question_likes.model'),
	createAnswersLikesModel: require('./answers_likes.model'),

	createFollowingsModel: require('./user_followings.model'),
};
