const User = require('../models/user')
const _ = require("lodash")
const formidable = require("formidable")
const fs = require('fs')

exports.userById=(req,res,next,id)=>{
    // console.log("***")
    User.findById(id)
    .populate('followers','_id name')
    .populate('following','_id name')
    .exec((err,user)=>{
        // console.log("User found")
        if(err || !user)
        {
            return res.status(404).json({
                error:"User not found"
            })
        }
        req.profile = user //add profile object in request 

        next();
    });
};

exports.hasAuthorization =(req,res,next)=>{
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id
    if(!authorized)
    {
        return res.status(403).json({
            error:"User is not authorized to perform this action"
        })
    }
    next();
}

exports.allUsers = (req,res,next) =>{
    User.find((err,users)=>{
        if(err)
        {
            return res.status(400).json({
                error:err
            })
        }

        res.json(users)
    })
    .select("name email updated created")
}

exports.getUser = (req,res) =>{
    // console.log("get user")
    console.log("HELLO")
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    // console.log(req.profile)
    return res.json(
        req.profile
    )
}

// exports.updateUser = (req,res,next)=>{
//     let user = req.profile
//     user = _.extend(user,req.body)  // mutates the source object
//     user.updated = Date.now()
//     user.save((err)=>{
//         if(err) {
//             return res.status(400).json({
//                 error:"You are not authorized to perform this action!"
//             })
//         }
//         req.profile.hashed_password = undefined
//         req.profile.salt = undefined        
//         res.json({user})

//     })

// }
exports.getParticularUser = (req, res, next) => {
    return res.json({
        "user": req.profile
    })
}

exports.userPhoto = (req,res,next)=>{
    // console.log(req.profile.photo)
    // console.log("Profile photo requested")

    if(req.profile.photo.data)
    {
        // console.log("YES")
        res.set(("Content-Type",req.profile.photo.contentType))
        // console.log("YES")
        return res.send(req.profile.photo.data)
    //    next();
    }
    // next();
    
}
exports.updateUser = (req,res,next)=>{
    // console.log(req.body)
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err,fields,files)=>{
        if(err)
        {
            return res.status(400).json({
                error:"Photo could not be uploaded"
            })
        }
        let user = req.profile
        user = _.extend(user,fields)
        user.updated = Date.now()
        if(files.photo)
        {
            // console.log("Photo is present")
            user.photo.data = fs.readFileSync(files.photo.path)
            user.photo.contentType = files.photo.type
        }
        user.save((err,result)=>{
            if(err)
            {
                return res.status(400).json({
                    error:err
                })
            }
            user.hashed_password = undefined
            user.salt = undefined
            return res.json(user);
        
        })
    })
}
exports.deleteUser = (req,res,next)=>{
    let user = req.profile
    user.remove((err,user)=>{
        if(err)
        {
            return res.status(400).json({
                error:err
            })
        }

        res.json({message:"User has been deleted successfully"})
        // next();

    })
    // next();
}
exports.addFollowing = (req,res,next) =>{
    console.log("Add following")
    User.findByIdAndUpdate(req.body.userID,
        {$push:{following:req.body.followId}},
        (err,result)=>{
            if(err)
            {
                return res.status(400).json({
                    err:err
                })
            }
            next();
    })
}
exports.addFollower = (req,res) =>{
    console.log("Add follower")
    User.findByIdAndUpdate(
        req.body.followId,
        {$push:{followers:req.body.userID}},
        {new:true}      
       )
    .populate('following','_id name')
    .populate('followers','_id name')
    .exec((err,result)=>{
        if(err)
        {
            return res.status(400).json({
                err:err
            })
        }
        result.hashed_password = undefined
        result.salt = undefined
        res.json(result)
    })
}

// remove following follower

exports.removeFollowing = (req,res,next) =>{
    User.findByIdAndUpdate(req.body.userID,
        {$pull:{following:req.body.unfollowId}},
        (err,result)=>{
        if(err)
        {
            return res.status(400).json({
                error:err
            })
        }
        next();
    })
}
exports.removeFollower = (req,res) =>{
    User.findByIdAndUpdate(
        req.body.unfollowId,
        {$pull:{followers:req.body.userID}},
        {new:true}      
       )
    .populate('following','_id name')
    .populate('followers','_id name')
    .exec((err,result)=>{
        if(err)
        {
            return res.status(400).json({
                error:err
            })
        }
        result.hashed_password = undefined
        result.salt = undefined
        res.json(result)
    })
}

exports.findPeople = (req,res)=>{
    console.log("^^^^^")
    let following = req.profile.following
    // console.log(req.profile)
    following.push(req.profile._id)
    console.log(following)
    User.find({_id: {$nin:following}},(err,users)=>{
        console.log("&&&&")
        if(err){
            return res.status(400).json({
                error:err
            })

        }
        console.log(users)
        res.json(users)
    })
    
}