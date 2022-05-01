module.exports = {
	createAuthModel: require('./auth.model'),
	createUserModel: require('./user.model'),

	createUserBookmarksModel: require('./user_bookmarks.model'),
	createUserProfileModel: require('./user_profile.model'),

	createQuestionsModel: require('./questions.model'),
	createAnswersModel: require('./answers.model'),

	createQuestionLikesModel: require('./question_likes.model'),
	createAnswersLikesModel: require('./answers_likes.model'),

	createTagsModel: require('./tags.model'),
};
