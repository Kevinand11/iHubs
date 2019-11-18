const nodeMailer = require("nodemailer");
const env = require("dotenv").config().parsed;

let transport = nodeMailer.createTransport({
	host: env["MAIL_HOST"],
	port: env["MAIL_PORT"],
	auth: {
		user: env["MAIL_USERNAME"],
		pass: env["MAIL_PASSWORD"]
	}
});

let mailOptions = {
	from: `${env["MAIL_FROM_NAME"]}<${env["MAIL_FROM_NAME"]}>`,
	to: "izuchukwukevin@gmail.com",
	subject: "Nice Nodemailer",
	html: "<b>Hey there!</b><br/>This is a test message from nodemailer",
	attachments: [
		{
			filename: "boy.png",
			path: __dirname + "/boy.png",
			cid: "uniq-mailtrap.png"
		}
	]
};

transport.sendMail(mailOptions, (err, info) => {
	if (err) {
		console.log(err);
	}
	console.log("Message sent: %s", info.messageId);
});
