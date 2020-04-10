import React from 'react';
import {Redirect,Link} from 'react-router-dom'
import {isAuthenticated} from '../auth'
import {read} from './apiUser'
import DefaultProfile from '../images/avatar.png'
import DeleteUser from './DeleteUser'
import FollowProfileButton from './FollowerProfileButton'
import ProfileTabs from './ProfileTabs'
import {listByUser} from '../post/apiPost'


class Profile extends React.Component
{
    constructor(props)
    {
        super()
        this.state = {
            user:{followers:[],following:[]},
            redirectToSignin:false,
            following:false,
            posts:[]
        }
    }
    checkFollow = user =>{
        const jwt = isAuthenticated();
        const match = user.followers.find(follower=>{
            return follower._id === jwt.user._id
        })
        return match
    }
    init = userID =>{
        console.log(`${process.env.REACT_APP_API_URL}/${userID}`)
        const token = isAuthenticated().token
        // console.log(userID,token)
        read(userID,token)
        .then(data=>{
            console.log(data)
            if(data.error)
            {
                this.setState({redirectToSignIn:true})
            }
            else{
                let following = this.checkFollow(data)
                
                this.setState({user:data,following})
                this.loadPost(data._id)
            }
        })

        
    }

    loadPost = userId => {
        const token = isAuthenticated().token
        listByUser(userId,token)
        .then(data=>{
            if(data.error)
            {

            }
            else {
                this.setState({posts:data})
            }
        })
    }

    clickFollow = callApi =>{
        console.log("**")
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        callApi(userId,token,this.state.user._id)
        .then(data=>{
            if(data.error) {
                this.setState({error:data.error})
            } else {
                this.setState({user:data, following: !this.state.following})
            }
        })
    }

    componentDidMount()
    {
        // console.log(this.props)
        // console.log(this.props.match.params.userId)
        const userID = this.props.match.params.userId
        this.init(userID);
        
    }
    componentWillReceiveProps(props)
    {
        console.log(props.match.params.userId)
        const userID = props.match.params.userId
        this.init(userID);
    }
    render()
    {
        const redirectToSignIn = this.state.redirectToSignin;
        if(redirectToSignIn)
        {   return(
            <Redirect to="/new"/>)
        }
        const photoUrl = this.state.user._id?`${process.env.REACT_APP_API_URL}/user/photo/${this.state.user._id}?${new Date().getTime()}`: DefaultProfile
        // console.log(isAuthenticated().user._id)
        return(
            
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <div className="row">

                <div className="col-md-6">
                    
                <img 
                style={{height:"200px", width:'auto'}} 
                className="img-thumbnail" 
                src={photoUrl} 
                
                alt={this.state.name}></img>
               <br></br>
               <br></br>
               <hr/>
                <p className="mt-6 md-6 mb-5 lead">{this.state.user.about}</p>
                <hr/>
                <ProfileTabs
                        followers={this.state.user.followers}   
                        following={this.state.user.following}
                        posts={this.state.posts}
                    />
                </div>
                    <div className="lead ">
                        <p>Hello {this.state.user.name}</p>
                        <p>Email {this.state.user.email}</p>
                        <p>{`Joined on ${new Date(this.state.user.created).toDateString()}`}</p>
                        
                    {isAuthenticated().user && 
                    isAuthenticated().user._id == this.state.user._id ?
                    (
                        <div className="d-inline-block mt-5">
                            <Link className="btn btn-raised btn-success mr-5" to={`/user/edit/${this.state.user._id}`}>
                                Edit Profile
                            </Link>
                            <DeleteUser userID={this.state.user._id}/>
                        </div>
                    ) :
                    (<FollowProfileButton
                        following={this.state.following}
                        onButtonClick={this.clickFollow}
                        />)
                    
                     }
                    
                    
                    </div>
                </div>
                
                
            </div>
        )
    }
}
export default Profile;