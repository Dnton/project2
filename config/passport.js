var LocalStrategy = require('passport-local').Strategy

var User = require('../models/user')

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'user[name]',
    passwordField: 'user[password]',
    passReqToCallback: true
  }, function (req, email, password, next) {
    console.log("hello world")
    // the authentication flow on our local auth routes
    User.findOne({'email': email }, function (err, foundUser) {
      // if user is found, dont create new user
      // if user is not found, create new user
      console.log(foundUser)
      console.log("something")
      if (err) return next(err)

      if (foundUser) {
        return next(null, false, req.flash('signupMessage', 'Email has been taken'))
      } else {
        User.create(req.body.user, function (err, newUser) {
          if (err) throw err
          return next(null, false, req.flash('signupMessage', 'Sign up successful! You can now login to your account.'))
        })
      }
    })
  }))

  passport.use('local-login', new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
    passReqToCallback: true
  }, function (req, email, password, next) {
    console.log('authenticating with given email and password')
    console.log(email, password)

    User.findOne({ 'email': email }, function (err, foundUser) {
      if (err) return next(err)

    console.log(foundUser)
      // if cannot find use by email, return to route with flash message
      if (!foundUser)
        return next(null, false, req.flash('loginMessage', 'No user found with this email'))

      foundUser.authenticate(password, function (err, authenticated) {
        if (err) return next(err)

        if (authenticated) {
          return next(null, foundUser, req.flash('loginMessage', ''))
        } else {
          return next(null, false, req.flash('loginMessage', 'Password don\'t match'))
        }
      })
    })
  }))
}
