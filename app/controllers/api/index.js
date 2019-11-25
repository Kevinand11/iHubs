const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV === "production" ? process.env : require("dotenv").config().parsed;
let models = require("../../../db/models");
let { authValidator } = require("../../validators");
let { validateError, databaseError, notFound,
	invalid, noRoute } = require("../../responses");

let jwtSignIn = (res, user) => {
	jwt.sign({ user }, env["SESSION_KEY"], (err, token) => {
		if (err) {
			res.status(400).json({ error: "Error creating oauth token" }).end();
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
				.catch(() => res.status(400).json({ error: databaseError() }).end());
		}).catch((error) => res.status(400).json({ error: validateError(error) }).end());
	},
	login: (req, res) => {
		authValidator.login(req.body).then((result) => {
			models.user.attemptAuth(result).then((user) => {
				if (user) {
					user.getToken()
						.then((token) => res.json({ token: token.token }).end())
						.catch(() => res.status(400).json({ error: databaseError() }).end());
				} else {
					res.status(400).json({ error: invalid("credentials") }).end();
				}
			}).catch(() => res.status(400).json({ error: databaseError() }).end());
		}).catch((error) => res.status(400).json({ error: validateError(error) }).end());
	},
	profile: (req, res) => {
		models.user.findByPk(req.user.id)
			.then((user) => res.json(user).end())
			.catch(() => res.status(400).json({ error: notFound("user") }).end());
	},
	error: (req, res) => res.status(400).json({ error: noRoute() }).end()
};
