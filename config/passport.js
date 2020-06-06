let localStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = (passport) => {
//   // ADD USER TO THE SESSION
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  // REMOVE USER FROM SESSION
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  passport.use(
    new localStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email }, (err, data) => {
        if (err) throw err;
        if (!data) {
          return done(null, false, {message: "Fill al the fields (flash)"});
        }
        bcrypt.compare(password, data.password, (err, match) => {
          if (err) throw err;
          if (!match) {
            return done(null, false, {message: "email or password didn't match"});
          }
          if (match) {
            return done(null, data);
          }
        });

        
      });
    }),
  );


      //WE NEED SERILIZE USER AND DESERELIZE USER
    // This is documantation for passport configure http://www.passportjs.org/docs/configure/
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};
