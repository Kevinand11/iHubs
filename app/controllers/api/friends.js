let models = require("../../../db/models");
let { databaseError } = require("../../responses");

module.exports = {
    following: (req, res) => {
        models.friend.findAll({ where: { follower_id: req.user.id } })
            .then((result) => res.json(result).end())
            .catch(() => res.status(400).json({ error: databaseError() }).end());
    },
    followers: (req, res) => {
        models.friend.findAll({ where: { user_id: req.user.id } })
            .then((result) => res.json(result).end())
            .catch(() => res.status(400).json({ error: databaseError() }).end());
    },
    follow: (req, res) => {
        models.friend.findOrCreate({
            where: { follower_id: req.user.id, user_id: req.params.id }
        }).then((following) => res.json(following[0]).end())
            .catch(() => res.status(400).json({ error: databaseError() }).end());
    },
    unfollow: (req, res) => {
        models.friend.destroy({
            where: { follower_id: req.user.id, user_id: req.params.id }
        }).then((result) => res.json(result).end())
            .catch(() => res.status(400).json({ error: databaseError() }).end());
    }
};