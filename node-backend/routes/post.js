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
const {requireSignin} = require("../controllers/auth")

// console.log(validator.createPostValidator)
router.post('/post/new/:userId', requireSignin, createPost, createPostValidator);
router.get('/posts/by/:userId', requireSignin, postsByUser);
router.get('/post/:postId', singlePost);
router.put('/post/:postId', requireSignin, isPoster, updatePost);
router.delete('/post/:postId', requireSignin, isPoster, deletePost);
// photo
router.get('/post/photo/:postId', photo);
router.get('/posts', getPosts)
router.get('',getPosts)
// any route containing :userId, our app will first execute userById()
router.param('userId', userById);
// any route containing :postId, our app will first execute postById()
router.param('postId', postById);


module.exports = router;
