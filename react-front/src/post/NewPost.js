import React,{Component} from 'react';
import {isAuthenticated} from '../auth'
import {create} from './apiPost'
import {Link,Redirect} from 'react-router-dom'
import DefaultProfile from '../images/avatar.png'
export default class NewPost extends Component
{
    constructor(props)
    {
        super()
        this.state = {
            title: "",
            body: "",
            photo: "",
            error: "",
            user: {},
            fileSize: 0,
            redirectToProfile:false,
            loading:false
        }
        this.postData = new FormData();
    }
    // read = (userID,token) =>{
    //     return fetch(`${process.env.REACT_APP_API_URL}/user/${userID}`,{
    //         method:"GET",
    //         headers: {
    //             Accept:"application/json",
    //             "Content-Type":"application/json",
    //             Authorization:`Bearer ${token}`
    //         }
    //     })
    // }
    handleChange = (name) => (event) =>{
        this.setState({error:""})
        const value = name==='photo'?event.target.files[0]:event.target.value
        const fileSize = name==='photo'?event.target.files[0].size:0
        this.setState({error:""})
        this.postData.append(name,value);
        this.setState({fileSize:fileSize});
        // console.log(this.userData.get(name))
        // console.log(this.userData.entries())
        this.setState({[name]:value});
    }
    // init = (userID) =>{
        
    //     const token = isAuthenticated().token
    //     this.read(userID,token)
    //     .then(response=>{
    //         return response.json()
    //     })

    //     .then(data => {
    //         if(data.error)
    //         {
    //             this.setState({redirectToProfile:true})
    //         }
    //         else{
    //             this.setState({id:data._id,
    //                 name:data.name,
    //                 email:data.email,
    //                 about:data.about});
    //         }
    //     })
    // }
    clickSubmit = event =>{
        event.preventDefault();
        console.log(this.props.match)
        this.setState({loading:true})
        if(this.isValid())
        {

            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;
            console.log(userId)
            create(userId,token,this.postData)
            .then(data=>{
                if(data.error)
                {
                    
                    this.setState({error:data.error})
                }
                else{
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
    componentDidMount()
    {
        // console.log(this.props.match.params.userId)
        this.setState({user:isAuthenticated().user})
        
    }
    
    render()
    {
        if(this.state.redirectToProfile)
        {
            return(
                <Redirect to={`/user/${this.state.user._id}`}></Redirect>
            )
        }

        // const photoUrl = this.state.id?`${process.env.REACT_APP_API_URL}/user/photo/${this.state.id}?${new Date().getTime()}`: DefaultProfile
        return(
           
                <div className="container">
                    <h1 className="mt-5 mb-5">Create Post</h1>
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
                            Post
                        </button>
                    </form>
                    
                </div>
                </div>
            
        )
    }
}