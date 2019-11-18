let models = require("../../../db/models");
let { userValidator } = require("../../validators");

module.exports = {
	index: (req, res) => {
		models.user.latest(req.query.page || 1)
			.then((results) => res.json(results).end())
			.catch((error) => res.status(500).json({ error }).end())
	},
	store: (req, res) => {
		userValidator.create(req.body)
			.then((result) => {
				models.user.create(result)
					.then((user) => res.json(user).end())
					.catch((error) => res.status(400).json({ error }).end());
			}).catch((error) => res.status(400).json({ error }).end());
	},
	show: (req, res) => {
		models.user.findByPk(req.params.id)
			.then((user) => res.json(user).end())
			.catch((error) => res.status(400).json({ error }).end());
	},
	update: (req, res) => {
		userValidator.update(req.body)
			.then((result) => {
				models.user.findByPk(req.params.id)
					.then((user) => {
						user.update(result)
							.then((user) => res.json(user).end())
							.catch((error) => res.status(400).json({ error }).end());
					}).catch((error) => res.status(400).json({ error }).end());
			}).catch((error) => res.status(400).json({ error }).end());
	},
	delete: (req, res) => {
		models.user.destroy({ where: { id: req.params.id } })
			.then((result) => res.json(result).end())
			.catch((error) => res.status(400).json({ error }).end());
	}
};
