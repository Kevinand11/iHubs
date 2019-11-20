let models = require("../../../db/models");
let { postValidator } = require("../../validators");

module.exports = {
	index: (req, res) => {
		models.post.latest(req.query.page || 1)
			.then((results) => res.json(results).end())
			.catch((error) => res.status(500).json({ error }).end());
	},
	following: (req, res) => {
		models.post.latestFromFollowing(req.user.id, req.query.page || 1)
			.then((results) => res.json(results).end())
			.catch((error) => res.status(500).json({ error }).end());
	},
	store: (req, res) => {
		postValidator.create(req.body).then((result) => {
			models.user.findByPk(req.user.id).then((user) => {
				user.createPost(result)
					.then((post) => res.json(post).end())
					.catch((error) => res.status(400).json({ error }).end());
			}).catch((error) => res.status(400).json({ error }).end());
		}).catch((error) => res.status(400).json({ error }).end());
	},
	show: (req, res) => {
		models.post.findByPk(req.params.id)
			.then((post) => res.json(post).end())
			.catch((error) => res.status(400).json({ error }).end());
	},
	update: (req, res) => {
		postValidator.update(req.body).then((result) => {
			models.post.findByPk(req.params.id).then((post) => {
				post.update(result).then((post) => res.json(post).end())
					.catch((error) => res.status(400).json({ error }).end());
			}).catch((error) => res.status(400).json({ error }).end());
		}).catch((error) => res.status(400).json({ error }).end());
	},
	delete: (req, res) => {
		models.post.destroy({ where: { id: req.params.id } })
			.then((result) => res.json(result).end())
			.catch((error) => res.status(400).json({ error }).end());
	}
};
