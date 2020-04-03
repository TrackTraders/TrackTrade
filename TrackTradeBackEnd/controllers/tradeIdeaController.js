const TradeIdea = require("../models/TradeIdea");

exports.postIdea = (req, res, next) => {
  TradeIdea.create({
    trade: {
      trader: req.user.username,
      currency: req.body.currency,
      kind: req.body.kind,
      entry: req.body.entry,
      stoploss: req.body.stoploss,
      takeprofit: req.body.takeprofit,
      lot: req.body.lot,
      description: req.body.description,
      imageUrl: req.body.imageUrl
    }
  })
    .then(tradeIdea => {
      console.log(tradeIdea);
      res.json(tradeIdea);
    })
    .catch(err => console.log(err));
};

exports.updateIdea = (req, res, next) => {
  TradeIdea.updateOne(
    { _id: req.body.tradeID },
    {
      trade: {
        trader: req.user.username,
        currency: req.body.currency,
        kind: req.body.kind,
        entry: req.body.entry,
        stoploss: req.body.stoploss,
        takeprofit: req.body.takeprofit,
        lot: req.body.lot,
        description: req.body.description,
        imageUrl: req.body.imageUrl
      }
    }
  )
    .then(tradeIdea => {
      console.log(tradeIdea);
      res.json(tradeIdea);
    })
    .catch(err => console.log(err));
};

exports.deleteIdeas = async (req, res, next) => {
  try {
    trades = await TradeIdea.deleteOne({ _id: req.body.cardId });
    res.json(trades);
  } catch (err) {
    console.log(err);
  }
};

exports.getIdeas = (req, res, next) => {
  TradeIdea.find({ "trade.trader": req.user.username }, (err, trades) => {
    if (err) {
      console.log(err);
    } else {
      res.json(trades);
    }
  });
};

exports.getAllIdeas = (req, res, next) => {
  TradeIdea.find({}, (err, trades) => {
    if (err) {
      console.log(err);
    } else {
      res.json(trades);
    }
  });
};
