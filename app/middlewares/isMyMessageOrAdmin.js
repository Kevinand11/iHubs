let models = require("../../db/models");
let { notAuth, notFound } = require("../responses");

module.exports = (req, res, next) => {
    models.message.findByPk(req.params.id)
        .then((message) => {
            if (message.from === req.user.id || req.user.role === 2) {
                next();
            } else {
                res.status(400).json({ error: notAuth() }).end();
            }
        }).catch(() => res.status(400).json({ error: notFound() }).end());
};