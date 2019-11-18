const jwt = require("jsonwebtoken");
const env = require("dotenv").config().parsed;
let models = require("../../../db/models");
let { authValidator } = require("../../validators");

let jwtSignIn = (res, user) => {
	jwt.sign({ user }, env["SESSION_KEY"], (error, token) => {
		if (error) {
			res.status(400).json({ error }).end();
		}
		user.createToken({ token });
		res.json({ token }).end();
	});
};

module.exports = {
	register: (req, res) => {
		authValidator.register(req.body).then((result) => {
			models.user.create(result)
				.then((user) => jwtSignIn(res, user))
				.catch((error) => res.status(400).json({ error }).end());
		}).catch((error) => res.status(400).json({ error }).end());
	},
	login: (req, res) => {
		authValidator.login(req.body).then((result) => {
			models.user.attemptAuth(result).then((user) => {
				if (user) {
					user.getToken().then(({ token }) => {
						if (token) {
							res.json({ token }).end();
						}else {
							jwtSignIn(res, user);
						}
					}).catch((error) => res.status(400).json({ error }).end());
				} else {
					res.status(400).json({ error: "Invalid credentials." }).end();
				}
			});
		}).catch((error) => res.status(400).json({ error }).end());
	},
	profile: (req, res) => {
		models.user.findByPk(req.user.id, {
			include: [ "posts", "followers", "following",
				"token", "sentMessage", "receivedMessage"
			]
		}).then((user) => res.json(user).end())
			.catch((error) => res.status(400).json({ error }).end());
	}
};
