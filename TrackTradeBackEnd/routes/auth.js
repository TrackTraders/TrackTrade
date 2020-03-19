const router = require('express').Router();
const User = require('../models/User')
const Trade = require('../models/Trade')
const TradeIdea = require('../models/TradeIdea')
const Chat = require('../models/Chat')
const Message = require('../models/Message')
const passport = require('../config/passport')


const uploader = require('../config/cloudinary-setup');


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
    res.status(200).json(req.user)
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

router.post('/updateIdea', (req, res, next) => {
  console.log("--------id:", req.body._id)
  console.log("--------currency:", req.body.currency)
  console.log("--------kind:", req.body.kind)
  console.log("--------entry:", req.body.entry)
  console.log("--------stop loss:", req.body.stoploss)
  console.log("--------take profit:", req.body.takeprofit)
  console.log("--------lot:", req.body.lot)
  
  TradeIdea.updateOne({_id: req.body.tradeID}, {trade: {trader: req.user.username,currency: req.body.currency, kind: req.body.kind, entry: req.body.entry, stoploss: req.body.stoploss, takeprofit: req.body.takeprofit, lot: req.body.lot, description: req.body.description}}).then(tradeIdea => {
    console.log(tradeIdea);
    res.json(tradeIdea);
  }).catch(err => console.log(err))
}
)

router.post('/updateAvatar', uploader.single("imageUrl"), (req, res, next) => {

  console.log("--------file:", req.file)
  console.log(req.user)
  
  User.findByIdAndUpdate(req.user._id,
    {avatar: req.file.secure_url}, { new: true }).then(whatever => {
    console.log(whatever);
    res.json({ secure_url: req.file.secure_url });
  }).catch(err => console.log(err))
}
)

router.post('/addConnection', (req, res, next) => {
  console.log("-=-= ",req.body)
  
  User.findByIdAndUpdate(req.user._id, {$addToSet: {connections: req.body.userID}}, { new: true })
  .then(whatever => {
    console.log("-=-=-=-=-=-=-=-=-=-=-=-= ",whatever);
    res.json({connections: req.body.userID});
  }).catch(err => console.log(err))
}
)

router.post('/removeConnection', (req, res, next) => {
  console.log("-=-= ",req.body)
  
  User.findByIdAndUpdate(req.user._id, {$pull: {connections: req.body.userID}}, { new: true })
  .then(whatever => {
    console.log("-=-=-=-=-=-=-=-=-=-=-=-= ",whatever);
    res.json({connections: req.body.userID});
  }).catch(err => console.log(err))
}
)

// Slight blocker: how can i get the data for each user from
// req.user.connections... i guess same way i did for home
// maybe i could do a.... loop
// //-----------------------------------------------------------
// router.get('/get-all-connections', (req,res,next)=>{

//   User.find({"trade.trader": req.user.username}, (err,trades)=>{
//     if(err){
//       console.log(err)
//     } else {
//       res.json(trades)
//     }
//   })
// })
//-----------------------------------------------------------


router.post('/postTrade', (req, res, next) => {
  console.log("--------id:", req.body._id)
  console.log("--------currency:", req.body.currency)
  console.log("--------kind:", req.body.kind)
  console.log("--------entry:", req.body.entry)
  console.log("--------close:", req.body.close)
  console.log("--------lot:", req.body.lot)
  
  Trade.create({trade: {trader: req.user.username,currency: req.body.currency, kind: req.body.kind, entry: req.body.entry, close: req.body.close, lot: req.body.lot, money: req.body.money}}).then(trade => {
    console.log(trade);
    res.json(trade);
  }).catch(err => console.log(err))
}
)




// router.post('/ideaUpload', uploader.single("imageUrl"), (req, res, next) => {
//   if (!req.file) {
//     next(new Error('No file uploaded!'));
//     return;
//   }
//   res.json({ secure_url: req.file.secure_url });
// })


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






router.post('/delete-ideas', async (req,res,next)=>{
  try {
  trades = await TradeIdea.deleteOne({_id: req.body.cardId})
  res.json(trades)
  } catch(err){ console.log(err) }
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

  Trade.find({"trade.trader": req.user.username}, (err,trades)=>{
    if(err){
      console.log(err)
    } else {
      res.json(trades)
    }
  })
})

router.get('/get-all-trades', (req,res,next)=>{

  Trade.find({}, (err,trades)=>{
    if(err){
      console.log(err)
    } else {
      res.json(trades)
    }
  })
})

router.get('/get-ideas', (req,res,next)=>{

  TradeIdea.find({"trade.trader": req.user.username}, (err,trades)=>{
    if(err){
      console.log(err)
    } else {
      res.json(trades)
    }
  })
})

router.get('/get-all-ideas', (req,res,next)=>{

  TradeIdea.find({}, (err,trades)=>{
    if(err){
      console.log(err)
    } else {
      res.json(trades)
    }
  })
})

router.get('/get-all-traders', (req,res,next)=>{

  User.find({}, (err,users)=>{
    if(err){
      console.log(err)
    } else {
      res.json(users)
    }
  })
})

router.post('/find-other-profile', (req,res,next)=>{
  // console.log('+_++_+_+__+_+_+_+ other profile');
  // console.log(req.user)
  // console.log(req.body)
  
  User.find({username: req.body.username}, (err,userdata)=>{
    if(err){
      console.log(err)
    } else {
      console.log('+_++_+_+__+_+_+_+ other profile', userdata)
      Trade.find({"trade.trader": userdata[0].username}, (err, trades)=>{
        if(err){
          console.log(err)
        } else {
          TradeIdea.find({"trade.trader": userdata[0].username}, (err, tradeIdeas)=>{
            if(err){
              console.log(err)
            } else {
              res.json({ trades, tradeIdeas, userdata });
            }
          })
        }
      })
    }
  })
  
})


router.post("/addMessage", (req,res,next) => {
  console.log("-=-= ",req.body)
  
  Message.create({content: req.body.message, receiver: req.body.otherProfile, sender: req.user._id})
  .then(message => {
    console.log(message);
    res.json(message);
  }).catch(err => console.log(err))
})

router.get('/get-all-messages', (req,res,next)=>{

  Message.find({}, (err,messages)=>{
    if(err){
      console.log(err)
    } else {
      res.json(messages)
    }
  })
})




module.exports = router;