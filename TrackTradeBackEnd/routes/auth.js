const router = require('express').Router();
const User = require('../models/User')
const Trade = require('../models/Trade')
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
    
  const user = new User({
      username: req.body.email,
      password: req.body.password
  })
  res.status(200).json(user)
  
})

router.get("/log-out", (req,res, next)=>{
  req.logout()
  res.status(200).json({msg: "Logged out!"})
})

router.post('/post', (req, res, next) => {
  console.log("--------id:", req.body._id)
  console.log("--------currency:", req.body.currency)
  console.log("--------type:", req.body.type)
  console.log("--------entry:", req.body.entry)
  console.log("--------close:", req.body.close)
  console.log("--------lot:", req.body.lot)
  let newTrade = new Trade({userID: req.body._id}, {trade: {currency: req.body.currency, type: req.body.type, entry: req.body.entry, close: req.body.close, lot: req.body.lot}})
  newTrade.save(err=>console.log(err))
}
)

module.exports = router;