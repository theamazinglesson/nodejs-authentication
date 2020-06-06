const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");
const {isAuthenticated, isNotAuthenticated } = require('../config/auth');

/* GET users listing. */
router.get("/signup", isNotAuthenticated , (req, res, next) => {
  res.render("users/signup");
});
// SIGNUP HANDLE
router.post("/signup", isNotAuthenticated , (req, res, next) => {
  let { name, email, password, password2 } = req.body;
  let err;
  if (!name || !email || !password || !password2) {
    err = "Please Fill All The Fields...";
    res.render("users/signup", { err });
  }
  if (password != password2) {
    err = "Passwords Don't Match";
    res.render("users/signup", { err });
  }

  if (err == null) {
    User.findOne({ email }, function (err, data) {
      if (err) throw err;
      if (data) {
        console.log("User Exists");
        err = "User Already Exists With This Email...";
        res.render("users/signup", { err });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            password = hash;
            User({
              name,
              email,
              password,
            }).save((err, data) => {
              if (err) throw err;
              res.redirect("/users/signin");
            });
          });
        });
      }
    });
  }
});

router.get("/signin", isNotAuthenticated , (req, res, next) => {
  res.render("users/signin");
});

router.post("/signin", isNotAuthenticated , (req, res, next) => {
  passport.authenticate(
    "local",
    {
      successRedirect: "/users/profile",
      failureRedirect: "/users/signin",
      failureFlash: true
    }
  )(req, res, next);
});

router.get("/profile", isAuthenticated, (req, res, next) => {
  res.render("users/profile", {name: req.user.email});
});



// app.delete('/logout', (req, res, next) => {
//     req.logOut(); // FROM PASSPORT
//     res.redirect('/login');
// })


router.delete('/signout', (req, res, next)=>{
  req.logOut();
  res.redirect('/');
});

module.exports = router;
