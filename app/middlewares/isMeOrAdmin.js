let { notAuth } = require("../responses");

module.exports = (req, res, next) => {
	if (req.user.id === Number(req.params.id) || req.user.role === 2) {
		next();
	} else {
		res.status(400).json({ error: notAuth() }).end();
	}
};
