const router = require("express").Router();

let indexController = require("../../app/controllers/web/index");

router.get("/([A-zd/_.\\s]+)?", indexController.index);

module.exports = router;
