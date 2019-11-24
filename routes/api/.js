const router = require("express").Router();

let indexController = require("../../app/controllers/api/index");
let { isLoggedIn } = require("../../app/middlewares");

router.get("/profile", isLoggedIn, indexController.profile);
router.post("/login", indexController.login);
router.post("/register", indexController.register);
router.get("/([A-zd/_.\\s]+)?", indexController.error);

module.exports = router;
