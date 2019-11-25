let models = require("../../db/models");
let { notAuth, notFound } = require("../responses");

module.exports = (req, res, next) => {
	models.post.findByPk(req.params.id)
		.then((post) => {
			if (req.user.id === Number(post.userId) || req.user.role === 2) {
				next();
			} else {
				res.status(400).json({ error: notAuth() }).end();
			}
		}).catch(() => res.status(400).json({ error: notFound("post") }).end());
};
