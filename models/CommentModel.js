var mongoose = require('mongoose'),
    commentSchema = rekuire('models/CommentSchema.js');

module.exports = mongoose.model('Comment', commentSchema, "korpus-comments");