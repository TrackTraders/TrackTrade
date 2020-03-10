require('dotenv').config()

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const cors = require("cors")
const express = require("express");
const mongoose = require('mongoose')
const logger = require('morgan')
const session = require('express-session')
const passport = require('passport')
const path = require('path')


mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})

const app_name = require('.package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`)

const app = express();

app.use(cors({
  origin: function(origin, callback){
    return callback(null, true);
  },
  optionsSuccessStatus: 200,
  credentials: true
}));

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

///////////////////////////////////////////////////////////////////////
app.use(express.static(path.join(__dirname, '../TrackTradeFrontEnd/build')))
///////////////////////////////////////////////////////////////////////


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));

const index = require('./routes/index');
const auth = require('./routes/auth');
app.use('/', index);
app.use('/', auth);


////////////////////////////////////////////////////////////////////////

// Uncomment this line for production
let client = path.join(__dirname + '../public/index.html')
console.log('client',client)
//app.get('*', (req, res) => res.sendFile(client));
// For any other routes, redirect to the index.html file of React
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
// })

/////////////////////////////////////////////////////////////////////////


let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.listen(port, function() {
  console.log(`Server started on port ${port}`);
});

module.exports = app;