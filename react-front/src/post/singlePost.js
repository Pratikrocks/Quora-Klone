import React,{Component} from 'react';
import {SinglePost ,
        remove ,
        getComments, 
        postComments,
        deleteComment} from "./apiPost"
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
        mapId_Author: new Map(),
        commentText:""
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
    onHandleChange = (name) => (event) => {

        this.setState({[name] : event.target.value});
        // console.log(this.state.commentText)
    }
    deletePost = () => {
        
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
                    result.map((res, i) => {
                        this.getUserName(res.authorReference)
                    })
                    console.log(this.state.mapId_Author)
                }
            })
    }
    getUserName = (userId) => {
        let username;
        getUser(userId)
        .then(data=> {
            if(data.error) {
                console.log(data.error)
            }
            username = data.user.name;
            this.setState({mapId_Author: this.state.mapId_Author.set(userId, username)})
            return
        })
    }
    deleteComments = (commentId) => (event) => {
        const tokens = isAuthenticated().token;
        deleteComment(commentId, tokens)
        .then(data => {
            if(data.error) {
                console.log("Error")
            }
            window.location.reload();
        })


    }
    loadComments = (Comments) => {
        return (
            <div>
                {Comments.map((comment,i) =>{
                    return(
                    <div key={i}>
                            <div style={{display:"inline-block"}}>
                                    Commented By : 
                                <Link
                                    to={`/user/${comment.authorReference}`}
                                >
                                {this.state.mapId_Author.get(comment.authorReference)}
                                </Link>   
                            </div>
                            <div style={{display:"inline-block", paddingLeft:"23px" }}>
                                {
                                    comment.commentedAt ?
                                    <>
                                        Commented On :{new Date(comment.commentedAt).toDateString()}, {(new Date(comment.commentedAt).toTimeString()).split(' ').slice(0,1)}    
                                    </> 
                                        :
                                    null
                                }
                            </div>      
                            <div style={{display:"inline-block", paddingLeft:"23px", float:"right" }}>
                                {
                                    comment.authorReference == isAuthenticated().user._id ?
                                    <a style={{}}>
                                    <button onClick={this.deleteComments(comment._id)}>Delete</button>
                                    </a> 
                                        :
                                    null
                                }
                            </div> 

                            <p>{comment.body}</p>                        
                        <hr/>
                    </div>
                    )
                })
                }
           </div>
        )
    }
    postComment = (event) => {
        event.preventDefault();
        var content = "";
        const user_id = isAuthenticated().user._id;
        const token = isAuthenticated().token
        const postId = this.props.match.params.postId
        content = this.state.commentText
        console.log("content is", content)

        const comment = {
            content,
            user_id           
        }

        console.log(this.state.commentText)
        // console.log(JSON.stringify(comment))
        postComments(comment, postId, token)
        .then(data => {
            if(data.error) {
                console.log("Error")
            }
            this.setState({commentText:""})
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        })
        
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
                
                <div className="container" display="block">
                    {isAuthenticated() ? 
                    <>
                        <textarea rows="3" cols="70" onChange={this.onHandleChange("commentText")} value={this.state.commentText} style={{whiteSpace: "pre-line"}}></textarea>
                        <button type="submit" onClick={this.postComment}>Comment</button>
                    </>
                    : 
                    null}
                    <p className="display-4 mt-2 mb-3">Comments({this.state.comments.length})</p>
                    <hr/>
                    {this.state.comments.length ? this.loadComments(this.state.comments) : null}
                </div>
                
            </div>

            
                }
             
        </div>









        )
    }
}