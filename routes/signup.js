const express = require("express");
const router = express.Router();
const User = require("../modals/User");
const bcrypt = require("bcrypt");






router.get("/", (req, res) => {
    res.render("signup");
  });




 



  router.post("/", function (req, res) {
  
    
    
    const {
      firstname,
      email,
      password,
      password2,
  
    }=req.body
    let errors=[]
  if(!firstname||!email||!password||!password2  ){
    errors.push({
      msg:"Please enter all feilds"
    })
    
  }
  if(password!==password2){
    errors.push({
      msg:"Password does not match"
    })
    
  } 
  if(password.length<3 && password.length>0 ){
    errors.push({
      msg:"password must be more than 3 characters"
    })
    
  }
  if(errors.length>0){
   
    res.render("signup",{ errors })
   
   
  }else{
    //validation is OKEY
    //CHECK IF USER EXIST ON DATABASE
    User.findOne({
      where:{
        email:email
      }
    })
  .then(user=>{
    if(user){
      errors.push({
        msg:'user already exist'
      })
      
      res.render("signup", { errors });
    }else{
  // CREATE USER
  
      const newUser=new User({
        firstname,
        email,
        password
  
  
  
      })
    //  hashing the code
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;

        
        newUser.password = hash;
  
  
  
  
        newUser.save().then(user => {
            console.log("user created");
             req.flash(
               "successMessage",
               " Your account is created ,please login"
             );
             res.redirect("/#login");
          })
  
  
  
          .catch(err => {
            console.log(err);
            
            req.flash("ErrorMessage", "There an error");
            res.redirect("/signup");
          }); //end new user
      });
    });
  }
  })
  .catch(err => {
  console.log(err);
  });
  }
  });

 
  
  module.exports = router;