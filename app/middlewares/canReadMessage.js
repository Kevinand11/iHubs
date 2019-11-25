let models = require("../../db/models");

module.exports = (req, res, next) => {
    models.message.findByPk(req.params.id)
        .then((message) => {
            if (message.to === req.user.id) {
                next();
            } else {
                res.status(400).json({ error: "Unauthorized access" }).end();
            }
        }).catch(() => res.status(400).json({ error: "No message with such id" }).end());
};
