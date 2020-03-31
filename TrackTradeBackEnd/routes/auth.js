const router = require("express").Router();

const passport = require("../config/passport");

router.get("/is-logged-in", (req, res, next) => {
  console.log("-=-=--=-=-=-=-=-");
  res.json(req.user);
});

router.post("/log-in", passport.authenticate("local"), (req, res, next) => {
  console.log("-==-=-=-=-=-=-=-");
  res.status(200).json(req.user);
});

router.get("/log-out", (req, res, next) => {
  req.logout();
  res.status(200).json({ msg: "Logged out!" });
});

module.exports = router;
