const router = require("express").Router();

const tradeController = require("../controllers/tradeController");

router.post("/postTrade", tradeController.postTrade);

router.get("/get-trades", tradeController.getTrades);

router.get("/get-all-trades", tradeController.getAllTrades);

router.post("/delete-trades", tradeController.deleteTrades);

// trade image upload

// router.post('/tradeUpload', uploader.single("imageUrl"), (req, res, next) => {
//   if (!req.file) {
//     next(new Error('No file uploaded!'));
//     return;
//   }
//   Trade.updateOne("trade.trader": req.user.username,
//     {imageURL: req.file.secure_url}, { new: true }).then(whatever => {
//     console.log(whatever);
//     res.json({ secure_url: req.file.secure_url });
//   }).catch(err => console.log(err))
// })

module.exports = router;