const router = require("express").Router();

let indexController = require("../../app/controllers/api/index");
let { isLoggedIn, isLoggedOut } = require("../../app/middlewares");

router.get("/profile", isLoggedIn, indexController.profile);
router.post("/login", isLoggedOut, indexController.login);
router.post("/register", isLoggedOut, indexController.register);
router.get("/([A-zd/_.\\s]+)?", indexController.error);

module.exports = router;
