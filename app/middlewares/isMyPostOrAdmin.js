let models = require("../../db/models");

module.exports = (req, res, next) => {
	models.post.findByPk(req.params.id)
		.then((post) => {
			if (req.user.id === Number(post.user_id) || req.user.role === 2) {
				next();
			} else {
				res.status(400).json({ error: "Unauthorized access." }).end();
			}
		}).catch((error) => res.status(400).json({ error: "No post with such id" }).end());
};
