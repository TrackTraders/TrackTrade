const router = require("express").Router();

const uploader = require("../config/cloudinary-setup");

const userController = require("../controllers/userController");

router.post("/sign-up", userController.signUp);

router.post("/addConnection", userController.addConnection);

router.post("/removeConnection", userController.removeConnection);

router.post("/updateAvatar", uploader.single("imageUrl"), userController.updateAvatar);

router.get("/get-all-traders", userController.getAllTraders);

router.post("/find-other-profile", userController.findOtherProfile);

module.exports = router;