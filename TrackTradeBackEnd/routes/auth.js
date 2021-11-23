const router = require("express").Router();

const passport = require("../config/passport");

router.get("/is-logged-in", (req, res, next) => {
    res.json(req.user);
});

router.post("/log-in", (req, res, next) => {
    res.status(200).json(req.user);
});

router.get("/log-out", (req, res, next) => {
    req.logout();
    res.status(200).json({ msg: "Logged out!" });
});

module.exports = router;
