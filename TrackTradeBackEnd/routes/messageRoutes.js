const router = require("express").Router();

const messageController = require("../controllers/messageController");

router.post("/addMessage", messageController.addMessage);

router.get("/get-all-messages", messageController.getAllMessages);

module.exports = router;