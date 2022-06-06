const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');
const { EmailUtil } = require('../utils');
const { Environmet } = require('../configs');
const { EMAIL_SUBJECTS } = require('../constants');

//const pathToTemplates = path.join(process.cwd(), 'Email-Templates');
const pathToTemplates = path.join(__dirname, '../email_templates');

const templateParser = new EmailTemplates({
	views: {
		root: pathToTemplates,
	},
});

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: Environmet.EMAIL_ACCOUNT,
		pass: 'sboy tbiv lbkr dllp',
	},
});

module.exports = {
	sendMail: async (user, email_type) => {
		console.log('path to emails --->', pathToTemplates);
		console.log('USER ---> ', user);

		console.log('POINT FROM EMAIL SERVICE');

		const subject = EmailUtil.createSubject(
			user.name,
			EMAIL_SUBJECTS.SUCCESS_LOGIN,
		);

		const html = await templateParser.render(email_type, {
			userName: user.name,
		});

		return transporter.sendMail({
			from: Environmet.PROJECT_NAME,
			to: user.email,
			subject: subject,
			html: html,
		});
	},
};
