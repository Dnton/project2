var mongoose = require('mongoose')


var postSchema = new mongoose.Schema({
    header: String,
    time: {
      type: Date,
      default: Date.now
    },
    content: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
})

var Post = mongoose.model('Post', postSchema)

module.exports = Post
