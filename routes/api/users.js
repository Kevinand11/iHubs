const router = require("express").Router();

let { isLoggedIn, isMeOrAdmin } = require("../../app/middlewares");
let usersController = require("../../app/controllers/api/users");

router.get("/", usersController.index);
router.get("/:id", usersController.show);
router.put("/:id", isLoggedIn, isMeOrAdmin, usersController.update);
router.put("/password/:id", isLoggedIn, isMeOrAdmin, usersController.updatePassword);
router.delete("/:id", isLoggedIn, isMeOrAdmin, usersController.delete);

module.exports = router;
