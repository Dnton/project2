var express = require('express')
var router = express.Router()

var Post = require('../models/post')

router.get('/', function (req, res) {
  Post.find({}, function (err, allPost) {
    if (err) console.log(err)
    console.log(allPost)
    res.render('posts/new', {
      allPosts: allPost
    })
  })
})

// router.get('/:id', function (req, res) {
//   Post.find({}, function (err, post) {
//     if (err) console.log(err)
//     console.log(post)
//     res.render('posts/createdpost', {
//       post: post
//     })
//   })
// })


router.get('/:id', function (req, res) {
  Post.findById({_id: req.params.id}, function (err, foundpost) {
    if (err) console.log(err)

      res.render('posts/createdpost', {
        foundpost: foundpost
      })
    })
  })

router.post('/', function (req, res) {
  var newPost = new Post({
    header: req.body.post.header,
    content: req.body.post.content,
    // user: req.user.id
  })

  newPost.save(function (err, newPost) {
    if (err) throw new Error(err)

    res.redirect('/posts/' + newPost.id)
  })
//
// res.render('/post/:id', {
//   newPost: newPost
})

router.get('/error', function (req, res) {
  res.render('posts/error')
})

// router.get('/profile', function (req, res) {
//   res.render('users/profile')
// })

module.exports = router
