const express = require("express")
// const app = express()
const {createPostValidator} = require("../validators/index")
const {
    createPost,
    getPosts ,
    postsByUser,
    postById,
    isPoster,
    deletePost,
    updatePost,
    photo,
    singlePost
} = require('../controllers/post')
const router = express.Router();
const {userById} = require("../controllers/user")
const {requieSignin} = require("../controllers/auth")

// console.log(validator.createPostValidator)
router.get('/posts',getPosts)
router.post(
    '/post/new/:userId',
    requieSignin,
    createPost,
    createPostValidator
)
router.get("/post/:postId",singlePost)
router.get("/post/by/:userId",postsByUser)
router.delete("/post/:postId",requieSignin,isPoster, deletePost);
router.put("/post/:postId",requieSignin,isPoster,updatePost);
router.param("userId",userById)
router.get('/post/photo/:postId',photo)
// any route containing userId our app will execute userById()
// router.param("userId",userById)
router.param("postId",postById)



module.exports = router;
