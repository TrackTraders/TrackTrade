const router = require("express").Router();

const uploader = require("../config/cloudinary-setup");

const tradeIdeaController = require("../controllers/tradeIdeaController");

router.post("/postIdea", tradeIdeaController.postIdea);

router.post("/updateIdea", tradeIdeaController.updateIdea);

router.post("/delete-ideas", tradeIdeaController.deleteIdeas);

router.get("/get-ideas", tradeIdeaController.getIdeas);

router.get("/get-all-ideas", tradeIdeaController.getAllIdeas);

//image upload for trade idea
router.post("/ideaUpload", uploader.single("imageUrl"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ secure_url: req.file.secure_url });
});

//image update for trade idea
router.post("/ideaUpdate", uploader.single("imageUrl"), (req, res, next) => {
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    res.json({ secure_url: req.file.secure_url });
  });

module.exports = router;
