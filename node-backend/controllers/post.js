const Post = require("../models/post")
const Comments = require('../models/comments')
const formidable = require("formidable")
const fs = require('fs')
const jwt = require("jsonwebtoken")
const _ = require('lodash')
exports.postById = (req,res,next,id)=>{

    Post.findById(id)
    .populate("postedBy", "_id name")
    .then((post,err)=>{
        console.log(err)
        if(err)
        {
            return res.status(420).json({
                error:err
            })
        }
        req.post = post
        next();
    })
}

exports.getPosts = (req,res) =>{
    const posts = Post.find()
    .populate("postedBy","_id name")
    .select("_id title body created")
    .sort({created : -1})
    .then((posts)=>{
        res.json({posts:posts})
    })
    .catch(err=>console.log(err))
}

exports.createPost = (req,res,next) =>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,(err,fields,files)=> {
        if(err)
        {
            return res.status(400).json({
                error:"Image couldnot be uploaded"
            })
        }
        let post = new Post(fields)
        req.profile.hashed_password = undefined
        req.profile.salt = undefined
        post.postedBy = req.profile
        if(files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path)
            post.photo.contentType = files.photo.type
        }
        post.save((err,result)=>{
            if(err)
            {
                return res.status(401).json({
                    error:err
                })
            }
            res.json(result)
        })
    })
}
exports.postsByUser = (req,res) =>{
    console.log("postByUser")
    Post.find({postedBy:req.profile._id})
    .populate("postedBy","_id name")
    .sort("_created")
    .exec((err,posts)=>{
        if(err)
        {
            return res.status(400).json({
                error:err
            })
        }
        res.json(posts)
    })
}

exports.isPoster = (req,res,next)=>{
    let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth.user._id
    console.log("isPoster")
    if(!isPoster){
        return res.status(400).json({
            error:"User is not authorized"
        })
    }
    next();
}

exports.deletePost = (req,res)=>{
    let post = req.post;
    post.remove((err,post)=>{
        if(err)
        {
            return res.status(400).json({
                error:err
            })
        }
        res.json({
            message:"Post Deleted Successfully"
        })
    })
}

exports.updatePost = (req,res,next) =>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err,fields,files)=> {
        console.log(fields)
        if(err) {
            return res.status(400).json({
                error:"Image can not be uploaded"
            })
        }
        let post = req.post
        console.log("POST " + post)
        post = _.extend(post, fields)
        post.updated = Date.now()
        if(files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path)
            post.photo.contentType = files.photo.type
        }
        post.save(err =>{
            if(err) {
                return res.status(400).json({
                    error:err
                })
            }
            res.json(post)
        })
    })
}
exports.photo = (req,res,next) => {
    res.set("Content-Type",req.post.photo.contentType)
    return res.send(req.post.photo.data)
}

exports.singlePost = (req,res,next) =>{
    console.log(req.post)
    return res.json(req.post)
}
//    comments backend
exports.addComment = (req ,res ,next) => {
    try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZvbGxvd2luZyI6W10sImZvbGxvd2VycyI6W10sIl9pZCI6IjVlYzE2ZmRiYjUzZWI5MGM0NzljOWNhYiIsIm5hbWUiOiJ1c2VyXzIiLCJlbWFpbCI6InVzZXJfMkBnbWFpbC5jb20iLCJzYWx0IjoiMzYxYTYyZDAtOTg2MS0xMWVhLTk3OWUtNzFjNTkxOWMyZmM1IiwiaGFzaGVkX3Bhc3N3b3JkIjoiYWNlMjA0N2I1ZjAwMjk0OGVkMjYwNDA0YzlkNmRkOTFlNmU0MmE2OCIsImNyZWF0ZWQiOiIyMDIwLTA1LTE3VDE3OjA5OjQ3LjUxOFoiLCJfX3YiOjB9LCJpYXQiOjE1ODk3NzI5MjF9.Ig74NaGb72k1SUgCaZpQoEwO7q4r1UjrQcNzCXnph-M"
        var decode = jwt.decode(token, process.env.JWT_SECRET)
    } catch (err) {
        console.log(err)
    }
    const comments = Comments();
    comments.body = req.body.content
    comments.postReference = req.post._id
    comments.authorReference = decode.user._id
    console.log(req.body.content, req.post._id, decode.user._id)
    comments.save((err, result) => {
        if(err) {
            return res.status(401).json({
                error : err
            })
        }
        return res.json(result);
    })
    // return res.json({"good":"work"})
}
exports.loadComments = (req , res, next) => {    
    Comments.find({postReference : req.post._id})
    .then(data => {
        console.log(data);
        res.json(data)
    })
    .catch(err=>{console.log(err)})
    // res.json({"search": "processing"})
}
exports.commentById = (req, res ,next, id) => {
    Comments.find({_id:id})
    .then((result, error) => {
        if(error) {
            console.log(error);
            res.status(403).json({
                error:error
            })
        }
        req.comments = result;
        next();
    })
    
}
exports.deleteComment = (req, res, next) => {
    let comment = req.comments;
    console.log(comment)
    comment[0].remove((err, com)=> {
        if(err) {
            res.status(401).json({
                error : err,
            })
        }
        console.log("Deleted")
        res.json({
            "message":"comment deleted successfully"
        })
    })
}