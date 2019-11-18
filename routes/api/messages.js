const router = require("express").Router();

let messageController = require("../../app/controllers/api/messages");
let { isLoggedIn, isMyMessageOrAdmin,
    isMessageAssociatedWith, canReadMessage } = require("../../app/middlewares");

router.get("/", isLoggedIn, messageController.index);
router.post("/", isLoggedIn, messageController.store);
router.get("/:id", isLoggedIn, isMessageAssociatedWith, messageController.show);
router.put("/:id", isLoggedIn, isMyMessageOrAdmin, messageController.update);
router.post("/read/:id", isLoggedIn, canReadMessage, messageController.read);
router.delete("/:id", isLoggedIn, isMyMessageOrAdmin, messageController.delete);

module.exports = router;