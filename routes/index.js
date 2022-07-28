
const express = require("express");
const router = express.Router();
const passport = require("passport");


router.get("/", (req, res) => {
  res.render("index");
 
});

// The function of LOGIN
router.post( "/",passport.authenticate("local", {
    successRedirect: "/dash",
    failureRedirect: "/",
    failureFlash: true
  })
);  


  module.exports = router;