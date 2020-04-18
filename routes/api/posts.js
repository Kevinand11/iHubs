const router = require("express").Router();

let { isLoggedIn, isMyPostOrAdmin } = require("../../app/middlewares");
let postsController = require("../../app/controllers/api/posts");

router.get("/", postsController.index);
router.get("/of/:id", postsController.of);
router.post("/", isLoggedIn, postsController.store);
router.get("/following", isLoggedIn, postsController.following);
router.get("/:id", postsController.show);
router.put("/:id", isLoggedIn, isMyPostOrAdmin, postsController.update);
router.post("/like/:id", isLoggedIn, postsController.like);
router.post("/unlike/:id", isLoggedIn, postsController.unlike);
router.post("/save/:id", isLoggedIn, postsController.save);
router.post("/unsave/:id", isLoggedIn, postsController.unsave);
router.delete("/:id", isLoggedIn, isMyPostOrAdmin, postsController.delete);

module.exports = router;
