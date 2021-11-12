require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const path = require("path");

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const app = express();

app.use(
    cors({
        origin: function (origin, callback) {
            return callback(null, true);
        },
        optionsSuccessStatus: 200,
        credentials: true,
    })
);

app.use(
    session({
        secret: "Our little secret.",
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

///////////////////////////////////////////////////////////////////////
app.use(express.static(path.join(__dirname, "../TrackTradeFrontEnd/build")));
///////////////////////////////////////////////////////////////////////

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger("dev"));

const index = require("./routes/index");
const auth = require("./routes/auth");
const messageRoutes = require("./routes/messageRoutes");
const tradeIdeaRoutes = require("./routes/tradeIdeaRoutes");
const tradeRoutes = require("./routes/tradeRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/", index);
app.use("/", auth);
app.use("/", messageRoutes);
app.use("/", tradeIdeaRoutes);
app.use("/", tradeRoutes);
app.use("/", userRoutes);

let client = path.join(__dirname + "../public/index.html");
console.log("client", client);

let port = process.env.PORT;
if (port == null || port == "") {
    port = 5005;
}

app.listen(port, function () {
    console.log(`Server started on port ${port}`);
});

module.exports = app;
