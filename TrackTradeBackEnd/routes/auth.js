const router = require('express').Router();
const User = require('../models/User')
const Trade = require('../models/Trade')
const TradeIdea = require('../models/TradeIdea')
const passport = require('../config/passport')


router.post('/sign-up', (req, res, next) => {
  User.register({username: req.body.username}, req.body.password)
  .then(user => {
      req.login(user, (err,result) => {
          res.status(201).json(user)
      })
      //res.redirect('/home')
  })
  .catch(err => {
      console.log(err)
      res.status(500).json({err})
  })

})

router.get('/is-logged-in', (req,res,next)=>{
    console.log('-=-=--=-=-=-=-=-');
    res.json(req.user)
})

router.post('/log-in', passport.authenticate("local"), (req,res, next)=>{
    console.log('-==-=-=-=-=-=-=-=-=wdfs=d-c-=sdc=-sdc-=sdc')
  const user = new User({
      username: req.body.username,
      password: req.body.password
  })
  res.status(200).json(user)
  
})

router.get("/log-out", (req,res, next)=>{
  req.logout()
  res.status(200).json({msg: "Logged out!"})
})

router.post('/postIdea', (req, res, next) => {
  console.log("--------id:", req.body._id)
  console.log("--------currency:", req.body.currency)
  console.log("--------kind:", req.body.kind)
  console.log("--------entry:", req.body.entry)
  console.log("--------stop loss:", req.body.stoploss)
  console.log("--------take profit:", req.body.takeprofit)
  console.log("--------lot:", req.body.lot)
  
  TradeIdea.create({trade: {trader: req.user.username,currency: req.body.currency, kind: req.body.kind, entry: req.body.entry, stoploss: req.body.stoploss, takeprofit: req.body.takeprofit, lot: req.body.lot, description: req.body.description}}).then(tradeIdea => {
    console.log(tradeIdea);
    res.json(tradeIdea);
  }).catch(err => console.log(err))
}
)

router.post('/postTrade', (req, res, next) => {
  console.log("--------id:", req.body._id)
  console.log("--------currency:", req.body.currency)
  console.log("--------kind:", req.body.kind)
  console.log("--------entry:", req.body.entry)
  console.log("--------close:", req.body.close)
  console.log("--------lot:", req.body.lot)
  
  Trade.create({trade: {trader: req.user.username,currency: req.body.currency, kind: req.body.kind, entry: req.body.entry, close: req.body.close, lot: req.body.lot}}).then(trade => {
    console.log(trade);
    res.json(trade);
  }).catch(err => console.log(err))
}
)

router.post('/delete-ideas', (req,res,next)=>{

  TradeIdea.deleteOne({_id: req.body.cardId}, (err,trades)=>{
    if(err){
      console.log(err)
    } else {
      res.json(trades)
    }
  })
})

router.post('/delete-trades', (req,res,next)=>{

  Trade.deleteOne({_id: req.body.cardId}, (err,trades)=>{
    if(err){
      console.log(err)
    } else {
      res.json(trades)
    }
  })
})

router.get('/get-trades', (req,res,next)=>{
  console.log('profile');
  console.log(req.user)
  Trade.find({"trade.trader": req.user.username}, (err,trades)=>{
    if(err){
      console.log(err)
    } else {
      res.json(trades)
    }
  })
})

router.get('/get-all-trades', (req,res,next)=>{
  console.log('profile');
  console.log(req.user)
  Trade.find({}, (err,trades)=>{
    if(err){
      console.log(err)
    } else {
      res.json(trades)
    }
  })
})

router.get('/get-ideas', (req,res,next)=>{
  console.log('profile');
  console.log(req.user)
  TradeIdea.find({"trade.trader": req.user.username}, (err,trades)=>{
    if(err){
      console.log(err)
    } else {
      res.json(trades)
    }
  })
})

router.get('/get-all-ideas', (req,res,next)=>{
  console.log('profile');
  console.log(req.user)
  TradeIdea.find({}, (err,trades)=>{
    if(err){
      console.log(err)
    } else {
      res.json(trades)
    }
  })
})

module.exports = router;