const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const { Environmet } = require('../configs');

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
	sendMail: async userEmail => {
		console.log('path to emails --->', pathToTemplates);

		console.log('POINT FROM EMAIL SERVICE');

		const html = await templateParser.render('welcome', {
			userName: 'Igorechek',
		});

		return transporter.sendMail({
			from: 'No reply',
			to: userEmail,
			subject: 'Hello world',
			html: html,
			//html: '<h1>Test from Nazariy</h1>',
		});
	},
};
