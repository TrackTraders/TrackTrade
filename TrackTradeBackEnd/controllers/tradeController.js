const Trade = require("../models/Trade");

exports.postTrade = (req, res, next) => {
  Trade.create({
    trade: {
      trader: req.user.username,
      currency: req.body.currency,
      kind: req.body.kind,
      entry: req.body.entry,
      close: req.body.close,
      lot: req.body.lot,
      money: req.body.money
    }
  })
    .then(trade => {
      console.log(trade);
      res.json(trade);
    })
    .catch(err => console.log(err));
};

exports.getTrades = (req, res, next) => {
  Trade.find({ "trade.trader": req.user.username }, (err, trades) => {
    if (err) {
      console.log(err);
    } else {
      res.json(trades);
    }
  });
};

exports.getAllTrades = (req, res, next) => {
  Trade.find({}, (err, trades) => {
    if (err) {
      console.log(err);
    } else {
      res.json(trades);
    }
  });
};

exports.deleteTrades = (req, res, next) => {
  Trade.deleteOne({ _id: req.body.cardId }, (err, trades) => {
    if (err) {
      console.log(err);
    } else {
      res.json(trades);
    }
  });
};
