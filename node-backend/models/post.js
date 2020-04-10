const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const postSchema = new mongoose.Schema({
    title :{
        type:String,
        requied:"Title is required",
        minlength:4,
        maxlength:150
    },
    body: {
        type:String,
        requied:"Body is required",
        minlength:4,
        maxlength:2000
    },
    photo: {
        data:Buffer,
        contenType:String,
    },
    postedBy: {
        type:ObjectId,
        ref:"User"
    },
    created: {
        type:Date,
        default:Date.now()
    }

})
module.exports = mongoose.model("Post",postSchema);
