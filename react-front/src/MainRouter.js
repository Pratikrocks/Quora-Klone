import React from 'react'
import Home from './core/Home'
import Menu from './core/Menu'
import {Route,Switch} from 'react-router-dom'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Profile from './user/Profile'
import User from './user/User'
import EditProfile from './user/EditProfile'
import FindPeople from './user/FindPeople'
import PrivateRoute from './auth/PrivateRoute'
import NewPost from "./post/NewPost"
import singlePost from "./post/singlePost"
import Post from "./post/Posts"
import EditPost from './post/EditPost'

const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/post/:postId" component={singlePost}></Route>
            <PrivateRoute exact path="/post/edit/:postId" component={EditPost}></PrivateRoute>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/signin" component={Signin}></Route>
            <PrivateRoute 
                exact 
                path="/user/:userId" 
                component={Profile}>

            </PrivateRoute>
            <Route exact path="/users" component={User}></Route>
            <PrivateRoute 
                exact 
                path="/user/edit/:userId"
                component={EditProfile}>
            </PrivateRoute>
            <PrivateRoute exact path="/findpeople/" component={FindPeople}></PrivateRoute>
            <PrivateRoute exact path="/create/post/:userId" component={NewPost}></PrivateRoute>
            <Route exact path="/posts" component={Post}></Route>

        </Switch>
    </div>
)

export default MainRouter;