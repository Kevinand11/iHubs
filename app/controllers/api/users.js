let models = require("../../../db/models");
let { userValidator } = require("../../validators");
let { validateError, databaseError, notFound, invalid } = require("../../responses");

module.exports = {
	index: (req, res) => {
		models.user.latest(req.query.page || 1)
			.then((results) => res.json(results).end())
			.catch(() => res.status(400).json({ error: databaseError() }).end())
	},
	store: (req, res) => {
		userValidator.create(req.body)
			.then((result) => {
				models.user.create(result)
					.then((user) => res.json(user).end())
					.catch(() => res.status(400).json({ error: databaseError() }).end());
			}).catch((error) => res.status(400).json({ error: validateError(error) }).end());
	},
	show: (req, res) => {
		models.user.findByPk(req.params.id)
			.then((user) => res.json(user).end())
			.catch(() => res.status(400).json({ error: notFound("user") }).end());
	},
	update: (req, res) => {
		userValidator.update(req.body, req.params.id)
			.then((result) => {
				models.user.findByPk(req.params.id)
					.then((user) => {
						user.update(result)
							.then((user) => res.json(user).end())
							.catch(() => res.status(400).json({ error: databaseError() }).end());
					}).catch(() => res.status(400).json({ error: notFound("user") }).end());
			}).catch((error) => res.status(400).json({ error: validateError(error) }).end());
	},
	updatePassword: (req, res) => {
		userValidator.updatePassword(req.body)
			.then((result) => {
				models.user.findByPk(req.params.id)
					.then((user) => {
						if (user.comparePassword(result.password)) {
							user.update({ password: result.newPassword })
								.then((user) => res.json(user).end())
								.catch(() => res.status(400).json({ error: databaseError() }).end());
						} else {
							res.status(401).json({ error: invalid("password") }).end();
						}
					}).catch(() => res.status(400).json({ error: notFound("user") }).end());
			}).catch((error) => res.status(400).json({ error: validateError(error) }).end());
	},
	delete: (req, res) => {
		models.user.destroy({ where: { id: req.params.id } })
			.then((result) => res.json(result).end())
			.catch(() => res.status(400).json({ error: databaseError() }).end());
	}
};
