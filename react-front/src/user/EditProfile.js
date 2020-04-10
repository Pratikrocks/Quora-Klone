import React,{Component} from 'react';
import {isAuthenticated} from '../auth'
import {update,updateUser} from './apiUser'
import {Link,Redirect} from 'react-router-dom'
import DefaultProfile from '../images/avatar.png'
export default class EditProfile extends Component
{
    constructor(props)
    {
        super()
        this.state = {
            id:"",
            name:"",
            password:"",
            redirectToProfile:false,
            error:"",
            fileSize:0,
            loading:false,
            about:""
        }
        this.userData = new FormData();
    }
    read = (userID,token) =>{
        return fetch(`${process.env.REACT_APP_API_URL}/user/${userID}`,{
            method:"GET",
            headers: {
                Accept:"application/json",
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        })
    }
    handleChange = (name) => (event) =>{
        this.setState({error:""})
        const value = name==='photo'?event.target.files[0]:event.target.value
        const fileSize = name==='photo'?event.target.files[0].size:0
        this.setState({error:""})
        this.userData.append(name,value);
        this.setState({fileSize:fileSize});
        // console.log(this.userData.get(name))
        // console.log(this.userData.entries())
        this.setState({[name]:value});
    }
    init = (userID) =>{
        
        const token = isAuthenticated().token
        this.read(userID,token)
        .then(response=>{
            return response.json()
        })

        .then(data => {
            if(data.error)
            {
                this.setState({redirectToProfile:true})
            }
            else{
                this.setState({id:data._id,
                    name:data.name,
                    email:data.email,
                    about:data.about});
            }
        })
    }
    clickSubmit = event =>{
        event.preventDefault();
        this.setState({loading:true})
        if(this.isValid())
        {
            const {name,email,password} = this.state;
            const user = {
                name,
                email,
                password:password||undefined
            };

            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;

            update(userId,token,this.userData)
            .then(data=>{
                if(data.error)
                {
                    this.setState({error:data.error})
                }
                else{
                    updateUser(data,()=>{
                        this.setState({
                            redirectToProfile:true
                        })
                    })

                }
            })
      }
    }

    isValid = () =>{
        const {name,email,password} = this.state;
        if(this.state.fileSize>700000)
        {
            this.setState({error:"File size must be less than 700kB"})
            this.setState({loading:false})
            return false
        }
        if(name.length==0)
        {
            this.setState({error:"Name is required"})
            this.setState({loading:false})
            return false
        }
        if(email.length==0)
        {
            this.setState({error:"Email is required"})
            this.setState({loading:false})
            return false
        }
        if(password.length>=1 && password.length<4)
        {
            this.setState({error:"Password must be atleast 4 characters long"})
            this.setState({loading:false})
            return false
        }
        return true;
        
    }
    componentDidMount()
    {
        // console.log(this.props.match.params.userId)
        
        const userID = this.props.match.params.userId
        this.init(userID);
        
    }
    
    render()
    {
        if(this.state.redirectToProfile)
        {
            return(
                <Redirect to={`/user/${this.state.id}`}></Redirect>
            )
        }
        console.log(`${process.env.REACT_APP_API_URL}/user/photo/${this.state.id}?${new Date().getTime()}`)
        const photoUrl = this.state.id?`${process.env.REACT_APP_API_URL}/user/photo/${this.state.id}?${new Date().getTime()}`: DefaultProfile
        return(
           
                <div className="container">
                    <h1 className="mt-5 mb-5">Edit Profile</h1>
                    <div className="container">

                    <div className="alert alert-danger" style={{display:this.state.error ? "":"none"}}>
                        {this.state.error}
                    </div>
                    <img style={{height:"200px", width:'auto'}} className="img-thumbnail" src={photoUrl} alt={this.state.name}></img>
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
                            <label className="text-muted">Name</label>
                            <input onChange={this.handleChange("name")} type="text" className="form-control" value={this.state.name}></input>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">About</label>
                            <textarea onChange={this.handleChange("about")} type="text" className="form-control" value={this.state.about}></textarea>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Email</label>
                            <input onChange={this.handleChange("email")} type="email" className="form-control" value={this.state.email}></input>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Password</label>
                            <input onChange={this.handleChange("password")} type="password" className="form-control" value={this.state.password}></input>
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