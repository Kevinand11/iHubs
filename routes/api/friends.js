const router = require("express").Router();

let friendController = require("../../app/controllers/api/friends");
let { isLoggedIn } = require("../../app/middlewares");

router.get("/following", isLoggedIn, friendController.following);
router.get("/followers", isLoggedIn, friendController.followers);
router.post("/follow/:id", isLoggedIn, friendController.follow);
router.post("/unfollow/:id", isLoggedIn, friendController.unfollow);

module.exports = router;