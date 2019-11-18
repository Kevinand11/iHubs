const router = require("express").Router();

let indexController = require("../../app/controllers/api/index");
let { isLoggedIn, isLoggedOut } = require("../../app/middlewares");

router.get("/", isLoggedIn, indexController.profile);
router.post("/login", isLoggedOut, indexController.login);
router.post("/register", isLoggedOut, indexController.register);

module.exports = router;