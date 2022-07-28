const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app =new express();
const session =require("express-session")
const flash=require("connect-flash")
const passport= require("passport")


//viewengine 
app.set('view engine', 'ejs');

 app.use(express.static("assets"));


//configure session and flash
app.use(session({
  secret:'secret',
  
  resave:true,
  saveUninitialized:true
}))

app.use(flash());
//configure passport
require("./config/passport")
app.use(passport.initialize())
app.use(passport.session())



// add middleware for flash messages
app.use((req, res, next) => {
  res.locals.successMessage = req.flash("successMessage");
  res.locals.errorMessage = req.flash("errorMessage");
  res.locals.errors = req.flash("errors");
  res.locals.error = req.flash("error");

  if (req.user) {
    res.locals.user = req.user;
  }
  next();
});




//BODYPARSER
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/dash",require("./routes/dash"));
app.use("/",      require("./routes/index"));
app.use("/signup", require("./routes/signup"));
app.use("/coin",  require("./routes/coin"));







app.listen(3000);
