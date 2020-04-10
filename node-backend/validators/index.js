// const { check, validationResult } = require('express-validator');
exports.createPostValidator = (req,res,next) =>{
    console.log("Inside validators")
    req.check('title', 'Write a title').notEmpty();
    req.check("title","Title must be between 4 to 150 characters").isLength({
        min:4,
        max:150
    });

    req.check("body", 'Write a body').notEmpty();
    req.check("body","body must be between 4 to 2000 characters").isLength({
        min:4,
        max:2000
    });

    // check for errors


    const errors = req.validationErrors()
    // if error show the fist one as they appear
    if(errors)
    {
        const firstError = errors.map((error)=>error.msg)[0]
        return res.status(400).json({error:firstError})

    }
    next();
    // move to next middleware
}


exports.userSignupValidator = (req,res,next)=>{
    // name is not null
    req.check("name","Name is required").notEmpty();

    req.check("email","Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
        min:4,
        max:2000
    })

    // for password
    req.check("password","Password is required").notEmpty();
    req.check("password")
    .isLength({
        min:4
    })
    .withMessage("Password must contain atleast 4 characters")
    .matches(/\d/)
    .withMessage("Your password must contain atleast one number")

    const errors = req.validationErrors();
    if(errors)
    {
        const firstErrors = errors.map((error)=>error.msg)[0];
        return res.status(400).json({error:firstErrors})
    }
    next();
}