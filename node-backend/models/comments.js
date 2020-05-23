const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
const commentsSchema = new mongoose.Schema({
    body: {
        type:  String,
        maxlength: 400,
    },
    postReference: {
        type: ObjectId,
        ref: "Post"
    },
    authorReference: {
        type: ObjectId,
        ref: "User"
    },
    commentedAt: {
        type: Date
    }
})
module.exports = mongoose.model("Comments",commentsSchema);