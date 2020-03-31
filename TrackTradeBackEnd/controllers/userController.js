const User = require("../models/User");
const Trade = require("../models/Trade");
const TradeIdea = require("../models/TradeIdea");

exports.signUp = (req, res, next) => {
  User.register({ username: req.body.username }, req.body.password)
    .then(user => {
      req.login(user, (err, result) => {
        res.status(201).json(user);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

exports.addConnection = (req, res, next) => {
  console.log("-=-= ", req.body);

  User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { connections: req.body.userID } },
    { new: true }
  )
    .then(whatever => {
      console.log("-=-=-=-=-=-=-=-=-=-=-=-= ", whatever);
      res.json({ connections: req.body.userID });
    })
    .catch(err => console.log(err));
};

exports.removeConnection = (req, res, next) => {
  console.log("-=-= ", req.body);

  User.findByIdAndUpdate(
    req.user._id,
    { $pull: { connections: req.body.userID } },
    { new: true }
  )
    .then(whatever => {
      console.log("-=-=-=-=-=-=-=-=-=-=-=-= ", whatever);
      res.json({ connections: req.body.userID });
    })
    .catch(err => console.log(err));
};

exports.updateAvatar = (req, res, next) => {
  console.log("--------file:", req.file);
  console.log(req.user);

  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.file.secure_url },
    { new: true }
  )
    .then(whatever => {
      console.log(whatever);
      res.json({ secure_url: req.file.secure_url });
    })
    .catch(err => console.log(err));
};

exports.getAllTraders = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
};

exports.findOtherProfile = (req, res, next) => {
  User.find({ username: req.body.username }, (err, userdata) => {
    if (err) {
      console.log(err);
    } else {
      console.log("+_++_+_+__+_+_+_+ other profile", userdata);
      Trade.find({ "trade.trader": userdata[0].username }, (err, trades) => {
        if (err) {
          console.log(err);
        } else {
          TradeIdea.find(
            { "trade.trader": userdata[0].username },
            (err, tradeIdeas) => {
              if (err) {
                console.log(err);
              } else {
                res.json({ trades, tradeIdeas, userdata });
              }
            }
          );
        }
      });
    }
  });
};
