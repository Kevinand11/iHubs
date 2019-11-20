let models = require("../../../db/models");

module.exports = {
    following: (req, res) => {
        models.friend.findAll({ where: { follower_id: req.user.id }})
            .then((result) => res.json(result).end())
            .catch((error) => res.status(400).json({ error }).end());
    },
    followers: (req, res) => {
        models.friend.findAll({ where: { user_id: req.user.id }})
            .then((result) => res.json(result).end())
            .catch((error) => res.status(400).json({ error }).end());
    },
    follow: (req, res) => {
        models.friend.findOrCreate({
            where: { follower_id: req.user.id, user_id: req.params.id}
        }).then((following) => res.json(following[0]).end())
            .catch((error) => res.status(400).json({ error }).end());
    },
    unfollow: (req, res) => {
        models.friend.destroy({
            where: { follower_id: req.user.id, user_id: req.params.id}
        }).then((result) => res.json(result).end())
            .catch((error) => res.status(400).json({ error }).end());
    }
};