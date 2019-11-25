let models = require("../../../db/models");
let { messageValidator } = require("../../validators");
let { validateError, databaseError, notFound, notAuth } = require("../../responses");

module.exports = {
    index: (req, res) => {
        models.message.latest(req.user.id, req.query.page || 1)
            .then((messages) => res.json(messages).end())
            .catch(() => res.status(400).json({ error: databaseError() }).end())
    },
    between: (req, res) => {
        models.message.between(req.user.id, req.params.id, req.query.page || 1)
            .then((messages) => res.json(messages).end())
            .catch(() => res.status(400).json({ error: databaseError() }).end())
    },
    store: (req, res) => {
        messageValidator.create(req.body).then((result) => {
            models.user.findByPk(req.user.id).then((user) => {
                user.createSentMessage(result)
                    .then((message) => res.json(message).end())
                    .catch(() => res.status(400).json({ error: databaseError() }).end());
            }).catch(() => res.status(400).json({ error: notAuth() }).end());
        }).catch((error) => res.status(400).json({ error: validateError(error) }).end());
    },
    show: (req, res) => {
        models.message.findByPk(req.params.id)
            .then((message) => res.json(message).end())
            .catch(() => res.status(400).json({ error: notFound("message") }).end());
    },
    update: (req, res) => {
        messageValidator.update(req.body)
            .then((result) => {
                models.message.findByPk(req.params.id).then((message) => {
                    message.update(result).then((message) => res.json(message).end())
                        .catch(() => res.status(400).json({ error: databaseError() }).end());
                }).catch(() => res.status(400).json({ error: notFound("message") }).end());
            }).catch((error) => res.status(400).json({ error: validateError(error) }).end());
    },
    read: (req, res) => {
        models.message.findByPk(req.params.id)
            .then((message) => {
                message.updateReadAt()
                    .then((message) => res.json(message).end())
                    .catch(() => res.status(400).json({ error: databaseError() }).end());
            }).catch(() => res.status(400).json({ error: notFound("message") }).end());
    },
    delete: (req, res) => {
        models.message.destroy({ where: { id: req.params.id } })
            .then((result) => res.json(result).end())
            .catch(() => res.status(400).json({ error: databaseError() }).end());
    }
};
