const router = require("express").Router();

let { isLoggedIn, isMyPostOrAdmin } = require("../../app/middlewares");
let postsController = require("../../app/controllers/api/posts");

router.get("/", postsController.index);
router.post("/", isLoggedIn, postsController.store);
router.get("/:id", postsController.show);
router.put("/:id", isLoggedIn, isMyPostOrAdmin, postsController.update);
router.delete("/:id", isLoggedIn, isMyPostOrAdmin, postsController.delete);

module.exports = router;
