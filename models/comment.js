var mongoose = require('mongoose')


var commentSchema = new mongoose.Schema({
    name: String,
    time: {
      type: Date,
      default: Date.now
    },
    comment: String,
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }

})

var Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
