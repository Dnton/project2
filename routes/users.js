var express = require('express')
var router = express.Router()
var passport = require('passport')
// var LocalStrategy = require('passport-local').Strategy

var User = require('../models/user')
var Post = require('../models/post')

function authCheck (req, res, next) {
  if (req.isAuthenticated()) {
    req.flash('profileMessage', 'You have already logged in.')
    return res.redirect('/profile')
  } else {
    return next()
  }
}
router.route('/signup')
      .get(authCheck, function (req, res) {
        User.find({}, function (err, allUsers) {
          res.render('./users/signup', {
            allUsers: allUsers,
            message: req.flash('signupMessage')
          })
        })
      })
      .post(passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
      }))

router.route('/')
      .get(authCheck, function (req, res) {
        res.render('./users/login', {message: req.flash('loginMessage')})
      })
      .post(passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/',
        failureFlash: true
      }))

router.get('/profile', function (req, res) {

    Post.findById(req.params.id, function (err, foundpost) {

      if(err) console.log(err)

      console.log(foundpost)
      console.log(req.params.id)

      res.render('./users/profile', {
      message: req.flash('profileMessage'),
      user: req.user,
      foundpost: foundpost
    })
  })
})

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

module.exports = router
