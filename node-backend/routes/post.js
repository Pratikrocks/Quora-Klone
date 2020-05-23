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
    singlePost,
    addComment,
    loadComments,
    deleteComment,
    commentById
} = require('../controllers/post')
const router = express.Router();
const {userById} = require("../controllers/user")
const {requireSignin} = require("../controllers/auth")

// console.log(validator.createPostValidator)
router.post('/post/new/:userId', requireSignin, createPost, createPostValidator);
router.get('/posts/by/:userId', requireSignin, postsByUser);
router.get('/post/:postId', singlePost);
router.post('/post/:postId', requireSignin,addComment)  // this routes will be used for posting comments to the backend
router.put('/post/:postId', requireSignin, isPoster, updatePost);
router.delete('/post/:postId', requireSignin, isPoster, deletePost);
// photo
router.get('/post/photo/:postId', photo);
router.get('/posts', getPosts)
router.get('',getPosts)
//loading comments
router.get('/post/comments/:postId', loadComments)

//deleting comments
router.delete('/comments/:commentId', requireSignin, deleteComment);

// any route containing :userId, our app will first execute userById()
router.param('userId', userById);
// any route containing :postId, our app will first execute postById()
router.param('postId', postById);

//any route containing the commentId as a param will first execute the commentById function
router.param('commentId', commentById);

module.exports = router;
