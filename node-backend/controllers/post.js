const Post = require("../models/post")
const formidable = require("formidable")
const fs = require('fs')
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