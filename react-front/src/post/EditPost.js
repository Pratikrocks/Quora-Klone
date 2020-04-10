import React,{Component} from 'react'
import {SinglePost, update} from './apiPost'
import {isAuthenticated} from '../auth/index'

export default class EditPost extends Component {
    constructor() {
        super()
        this.state = {
            id: "",
            title: "",
            body : "",
            error: "",
            fileSize:0,
            loading:false,
        }
    }
    handleChange = (name) => (event) =>{
        console.log("*#")
        this.setState({error:""})
        const value = name==='photo'?event.target.files[0]:event.target.value
        const fileSize = name==='photo'?event.target.files[0].size:0
        this.setState({error:""})
        this.postData.set(name,value);
        this.setState({fileSize:fileSize});
        // console.log(this.userData.get(name))
        // console.log(this.userData.entries())
        this.setState({[name]:value});
        // console.log(this.state)
        // console.log(this.postData.get("title"))
    }
    clickSubmit = event =>{
        event.preventDefault();
        console.log(this.props.match)
        this.setState({loading:true})
        // console.log(this.postData.get("title"))
        if(this.isValid())
        {
            // console.log("Valid "+ this.props.match.params.postId)
            const postId = this.props.match.params.postId;
            const token = isAuthenticated().token;
            // console.log(postId)
            update(postId,token,this.postData)
            .then(data=>{
                if(data.error)
                {
                    
                    this.setState({error:data.error})
                }
                else{
                    console.log("***")
                    console.log(data)
                    this.setState({loading:false,title:"",body:"",photo:"",redirectToProfile:true})
                }
            })
      }
    }

    isValid = () =>{
        const {title,body} = this.state;
        if(this.state.fileSize>700000)
        {
            this.setState({error:"File size must be less than 700kB"})
            this.setState({loading:false})
            return false
        }
        if(title.length===0 || body.length===0)
        {
            this.setState({error:"All fields are required"})
            this.setState({loading:false})
            return false
        }
        return true;
        
    }
    init = (postID) =>{

        SinglePost(postID)
        .then(data => {
            console.log(data)
            if(data.error)
            {
                this.setState({error:data.error })
            }
            else{
                this.setState({id:data._id,
                    title:data.title,
                    body:data.body
                });
            }
            console.log(this.state)
        })
    }
    componentDidMount()
    {
        // console.log(this.props.match.params.userId)
        this.postData = new FormData()
        const postID = this.props.match.params.postId
        this.init(postID);
        
    }
    render() {
        return(
           
            <div className="container">
                <h1 className="mt-5 mb-5">Edit Post</h1>
                <div className="container">

                <div className="alert alert-danger" style={{display:this.state.error ? "":"none"}}>
                    {this.state.error}
                </div>
                {/* <img style={{height:"200px", width:'auto'}} className="img-thumbnail" src={photoUrl} alt={this.state.name}></img> */}
                <form>
                      <div className="form-group">
                        <label className="text-muted">Profile Photo</label>
                        <input onChange={this.handleChange("photo")} type="file" className="form-control" accept="image/*"></input>
                        {this.state.loading ?
                            <div className="jumbotron text-center">
                                <h2>Loading...</h2>
                            </div>:
                            (null)}
                           
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Title</label>
                        <textarea onChange={this.handleChange("title")} type="text" className="form-control" value={this.state.title}></textarea>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Body</label>
                        <textarea onChange={this.handleChange("body")} type="text" className="form-control" value={this.state.body}></textarea>
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
                        Update
                    </button>
                </form>
                
            </div>
            </div>
        
    )
    }
}