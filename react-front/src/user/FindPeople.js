import React, {Component} from 'react';
import {findPeople, follow} from './apiUser'
import DefaultProfile from '../images/avatar.png'
import { Link } from 'react-router-dom';
import {isAuthenticated} from '../auth'
import '../core/Home.css'

export default class FindPeople extends Component
{
    constructor(props)
    {
        super();
        this.state = {
            users:[],
            error: "",
            open:false,
            followMessage:''
        }
    }

    componentDidMount()
    {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        console.log(userId)
        findPeople(userId,token)
        .then(response=>{
            if(response.error)
            {
                console.log(response.error)
            }
            this.setState({users:response});
        })      

    }
    clickFollow = (user,index) => {
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token
        follow(userId,token,user._id)
        .then(data=>{
            if(data.error) {
                this.setState({error:data.error})
            } else {
                let toFollow = this.state.users
                toFollow.splice(index,1)
                this.setState({
                    users: toFollow,
                    open :true,
                    followMessage: `following ${user.name}`
                })
            }
        })
    }
    renderUser = users =>(
        
        <div className="row">
            {users.map((user,i)=>(
                // <div className="card" style={{width:"22rem"}}>
                
                <div className="card col-md-4" key={i}>
                <img 
                    style={{height:"200px", width:'auto'}} 
                    className="img-thumbnail" 
                    src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}`} 
                    onError={i=>(i.target.src=`${DefaultProfile}`)}
                    // alt={i => (i.target.src = `${DefaultProfile}`)}
                    // alt={user.name}
                    >

                    </img>
                <div className="card-body">
                      <h5 className="card-title">{user.name}</h5>
                            <p className="card-text">{user.email}</p>
                      <p>
                          {console.log(user.id)}
                           <Link href="#" className="btn btn-raised btn-primary btn-sm" to={`/user/${user._id}`}>
                               View Profile
                           </Link>

                           <button onClick={()=>this.clickFollow(user,i)} className="btn btn-raised btn-success float-right btn-sm">
                               Follow
                           </button>
                      </p>

                </div>    
                </div>
                // </div>
            ))}
        </div>
    
    );
    render()
    {

        return(
            <div className="background">
                <div className="container">

                    <h2 className="mt-0 mb-5">Follow People</h2>
                    {this.state.open && <div className="alert alert-success">
                                {this.state.open && 
                                    <p>
                                        {this.state.followMessage}
                                    </p>
                                }
                        </div>
                    }
                        {this.renderUser(this.state.users)}
                </div>
            </div>
        )
    }
}
{/* <div className="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */}