const router = require("express").Router();

const passport = require("../config/passport");

router.get("/is-logged-in", async (req, res, next) => {
    await res.json(req.user);
});

router.post(
    "/log-in",
    passport.authenticate("local"),
    async (req, res, next) => {
        await res.status(200).json(req.user);
    }
);

router.get("/log-out", async (req, res, next) => {
    await req.logout();
    res.status(200).json({ msg: "Logged out!" });
});

module.exports = router;
