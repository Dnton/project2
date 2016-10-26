var express = require('express')
var router = express.Router()

var Post = require('../models/post')

var Comment = require('../models/comment')

router.get('/', function (req, res) {
  Post.find({}, function (err, allPost) {
    if (err) console.log(err)
    console.log(allPost)
    res.render('posts/new', {
      allPosts: allPost
    })
  })
})

router.get('/:id', function (req, res) {
  Post.findById({_id: req.params.id}, function (err, foundpost) {
    if (err) console.log(err)

    Comment.find({post_id: req.params.id}, function (err, allComment) {
      if (err) console.log(err)

      res.render('posts/createdpost', {
        foundpost: foundpost,
        allComments: allComment
      })
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
})

router.post('/:id', function (req, res) {
  var newComment = new Comment({
    header: req.body.comment.name,
    content: req.body.comment.content
  })

  newComment.save(function (err, newComment) {
    if (err) throw new Error(err)
    res.redirect('/posts/' + req.params.id)
  })
})

router.get('/error', function (req, res) {
  res.render('posts/error')
})

// router.get('/profile', function (req, res) {
//   res.render('users/profile')
// })

module.exports = router
