const router = require('express').Router();
const User = require('../models/User')
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


router.get("/auth/google",
    passport.authenticate("google", {scope:['profile']})
)

router.get("/auth/google/home",
    passport.authenticate('google', { prompt: 'select_account', failureRedirect: '/'}),
    (req,res, next)=>{
        res.redirect('/home')
    }
)

router.get("/auth/facebook",
  passport.authenticate("facebook")
);

router.get("/auth/facebook/home",
    passport.authenticate('facebook', {  prompt: 'select_account', failureRedirect: '/'}),
    (req,res, next)=>{
        res.redirect('/home')
    }
)






module.exports = router;