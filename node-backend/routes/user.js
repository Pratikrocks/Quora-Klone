const express = require("express")

const router = express.Router();
const {userById,
    allUsers,
    getUser,
    updateUser,
    deleteUser,
    userPhoto,
    addFollowing,
    addFollower,
    removeFollower,
    removeFollowing,
    findPeople
    } = require("../controllers/user")
const {requieSignin} = require("../controllers/auth")

// console.log(validator.createPostValidator)
router.get('/users',allUsers)
router.get('/user/:userId', requieSignin, getUser)
router.put('/user/:userId', requieSignin, updateUser)
router.delete('/user/:userId', requieSignin, deleteUser)
router.get('/user/photo/:userId',userPhoto)
router.put('/xx/follow/',requieSignin,addFollowing,addFollower)
router.put('/xx/unfollow/',requieSignin,removeFollowing,removeFollower)

router.get("/yy/findpeople/:userId",requieSignin,findPeople)

// any route containing userId our app will execute userById()
router.param("userId",userById)
module.exports = router;