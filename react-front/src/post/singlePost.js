import React,{Component} from 'react';
import {SinglePost ,remove ,getComments} from "./apiPost"
import { Link ,Redirect} from 'react-router-dom';
import {isAuthenticated} from "../auth/index"
import {getUser} from '../user/apiUser'

export default class singlePost extends Component {
    state = {
        postId : "",
        title : '',
        body : '',
        postedBy: '',
        created:"",
        loading:true,
        deleted:false,
        comments: 0,
        commentedBy: "",
    }
    componentDidMount = () => {
        const postId = this.props.match.params.postId
        SinglePost(postId)
        .then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({
                    posterId:data._id,
                    title: data.title,
                    body: data.body,
                    postedBy:data.postedBy,
                    created:data.created,
                    loading:false
                })
            }
        })
    }
    deletePost = () => {
        console.log("FF")
        console.log(this.props.match.params.postId )
        remove(this.props.match.params.postId,isAuthenticated().token)
        .then(data=>{
            if(data.err ){

            } else {
                this.setState({deleted:true})
            }

        })
    }
    deleteConfirmed =()=>{
       
        let answer = window.confirm("Are you sure you want to delete the post?");
        if(answer)
        {
            this.deletePost()
        }
    }
    componentWillMount = () => {
        const postId = this.props.match.params.postId;
        getComments(postId)
            .then((result) => {
                if(result.error) {

                }
                else {
                    this.setState({comments:result});
                }
            })
    }
    getUserName = (userId) => {
        let username;
        console.log(userId)
        getUser(userId)
        .then(data=> {
            if(data.error) {
                console.log(data.error)
            }
            // console.log(data.user.name)
            username = data.user.name;
            console.log(username)
            this.setState({commentedBy : username})
            return
        })
    }
    loadComments = (Comments) => {
        console.log(Comments)
        return (
            <div>
                {Comments.map((comment,i) =>{
                    return(
                    <div key={i}>
                            {/* {this.getUserName(comment.authorReference)} */}
                            <Link 
                                to={`/user/${comment.authorReference}`}
                            >
                                user
                            </Link>                          
                            <p>{comment.body}</p>                        
                        <hr/>
                    </div>
                    )
                })
                }
           </div>
        )
    }
    render() {
        if(this.state.deleted) {
            return (<Redirect to ={`/`}></Redirect>)
        }
        const {title ,body ,postedBy} = this.state
        const posterId = postedBy ? `/user/${postedBy._id}` : ''
        const posterName = postedBy.name
        return (
            
            <div className="container">
                {this.state.loading?
                        <div className="jumbotron text-center">
                            <h2>Loading...</h2>
                        </div>:
            <div className="container">
            <h2 className="display-2 mt-2 mb-3">{ title }</h2>
                     
              <div className="row">
                            <div className="card-body border-info">
                    <img 
                        className="img-thumbnail mb-3"  
                        src={`${process.env.REACT_APP_API_URL}/post/photo/${this.props.match.params.postId}` } 
                        alt=""
                        style={{height:"300px", width:"100%"}}
                        ></img>
                      {/* <h5 className="card-title">{title}</h5> */}
                            <p className="card-text">{body}{" ..."} </p>
                      <br/>
                        <p className="font-italic mark">
                            Posted By {" "} <Link to={`${posterId}`}>{posterName}</Link> {" "}
                            on {new Date(this.state.created).toDateString()}
                        </p>

                      <p>
                           <Link href="#" class="btn btn-raised btn-primary mr-5" to={`/posts/`}>Back to Post</Link>
                           {/* {"                 "}{"    "} */}
                            {isAuthenticated().user && isAuthenticated().user._id === postedBy._id ? 
                            <>
                           <Link href="#" class="btn btn-raised btn-info mr-5" to={`/post/edit/${this.props.match.params.postId}`}>Update Post</Link>
                           
                           <Link href="#" class="btn btn-raised btn-danger mr-5" to={`/posts/`} onClick={this.deleteConfirmed}>Delete Post</Link>
                            </> : null }
                   
                      </p>

                </div>    
                </div>
                <div className="container">
                    <p>Comments({this.state.comments.length})</p>
                    <hr/>
                    {this.state.comments.length ? this.loadComments(this.state.comments) : null}
                </div>
            </div>
                }
             
        </div>









        )
    }
}