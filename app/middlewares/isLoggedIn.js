const jwt = require("jsonwebtoken");
let env = require("dotenv").config().parsed;

module.exports = (req, res, next) => {
	let bearer = req.headers["authorization"];
	if (bearer && typeof bearer !== undefined) {
		let token = bearer.split(" ")[1];
		jwt.verify(token, env["SESSION_KEY"], (err, authData) => {
			if (err) {
				res.status(401).json({ error: "Invalid access token." });
			} else {
				req.user = authData.user;
				next();
			}
		});
	} else {
		res.status(401).json("Token not found").end();
	}
};
