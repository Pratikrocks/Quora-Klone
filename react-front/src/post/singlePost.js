import React,{Component} from 'react';
import {SinglePost ,remove} from "./apiPost"
import { Link ,Redirect} from 'react-router-dom';
import {isAuthenticated} from "../auth/index"
export default class singlePost extends Component {
    state = {
        postId : "",
        title : '',
        body : '',
        postedBy: '',
        created:"",
        loading:true,
        deleted:false
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
            </div>
                }
             
        </div>









        )
    }
}