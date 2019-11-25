const jwt = require("jsonwebtoken");
let { notAuth, invalid } = require("../responses");
let env = process.env.NODE_ENV === "production" ? process.env : require("dotenv").config().parsed;

module.exports = (req, res, next) => {
	let bearer = req.headers["authorization"];
	if (bearer && typeof bearer !== undefined) {
		let token = bearer.split(" ")[1];
		jwt.verify(token, env["SESSION_KEY"], (err, authData) => {
			if (err) {
				res.status(401).json({ error: invalid("token") });
			} else {
				req.user = authData.user;
				next();
			}
		});
	} else {
		res.status(401).json({ error: notAuth() }).end();
	}
};
