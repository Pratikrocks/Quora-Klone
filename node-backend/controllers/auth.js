const User = require("../models/user")
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")

const dotenv = require("dotenv")
dotenv.config()
exports.signup = async (req,res)=>{
    
    const userExists = await User.findOne({email:req.body.email})
    if(userExists) return res.status(403).json({
        error:"Email is already taken"
    });
    const user = await new User(req.body);
    await user.save()
    res.status(200).json({message:"Sign up success"});
}

exports.signin = (req,res) =>{

    const {email,password} = req.body;
    User.findOne({email},(err,user)=>{

        if(err || !user)
        {
            return res.status(401).json({
                error:"The user is not found"
            })
        }
        // if user is found check the password
        if(!user.authenticate(password))
        {
            return res.status(401).json({
                error:"Password and password do not match"
            })
        }
        // if user exists then we need to generatea token with user id 
        // store the token in a cookie with expiry date
        // return the response as a frontend client
        // console.log(user)
        const token = jwt.sign({user:user},process.env.JWT_SECRET)
        
        res.cookie("t",token,{expire: new Date()+9999});
        
        const name = user.name;
        const _id = user._id;
        const email = user.email
        
        return res.json({token,user:{_id,email,name}}) 
    })
    // console.log("User not found")
}

exports.signout = (req,res) =>{
    res.clearCookie("t")
    return res.json({message:"Signout Successful"})
}

exports.requireSignin = expressJwt({
    // if the token is valid ,express jwt appends the verified users id
    // in an auth key to the request object
    
    secret:process.env.JWT_SECRET,
    userProperty:'auth',
})