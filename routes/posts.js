var express = require('express')
var router = express.Router()

var Post = require('../models/post')

var Comment = require('../models/comment')

router.get('/new', function (req, res) {
  res.render('posts/new')
})

router.get('/:id', function (req, res) {
  Post.findById({_id: req.params.id}, function (err, foundpost) {
    if (err) console.log(err)

    Comment.find({post: req.params.id}, function (err, postComment) {
      if (err) console.log(err)

      res.render('posts/createdpost', {
        foundpost: foundpost,
        postComments: postComment
      })
    })
  })
})

router.post('/', function (req, res) {
  var newPost = new Post({
    header: req.body.post.header,
    content: req.body.post.content,
    user: req.user.id
  })

  newPost.save(function (err, newPost) {
    if (err) throw new Error(err)

    res.redirect('/posts/' + newPost.id)
  })
})

router.post('/:id', function (req, res) {
  var newComment = new Comment({
    name: req.body.comment.name,
    content: req.body.comment.content,
    post: req.params.id
  })

  newComment.save(function (err, newComment) {
    if (err) throw new Error(err)
    res.redirect('/posts/' + req.params.id)
  })
})

router.get('/error', function (req, res) {
  res.render('posts/error')
})

router.delete('/:post/comments/:id', function (req, res) {
  Comment.findByIdAndRemove(req.params.id, function (err, comment) {
    if (err) {
      res.send('Error!')
      console.log(err)
    } else {
      res.redirect('/posts/' + req.params.post)
    }
  })
})
module.exports = router
