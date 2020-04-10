import React, {Component} from 'react';
import {list} from './apiUser'
import DefaultProfile from '../images/avatar.png'
import { Link } from 'react-router-dom';
export default class User extends Component
{
    constructor(props)
    {
        super()
        this.state = {
            users:[]
        }
    }

    componentDidMount()
    {
        list()
        .then(response=>{
            if(response.error)
            {

            }
            return response.json();
        })
        .then((res)=>{
            console.log(res)
            this.setState({users:res});
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
                
                    alt={i => (i.target.src = `${DefaultProfile}`)}
                    // alt={user.name}
                    >

                    </img>
                <div className="card-body">
                      <h5 className="card-title">{user.name}</h5>
                            <p className="card-text">{user.email}</p>
                      <p>
                          {console.log(user.id)}
                           <Link href="#" class="btn btn-raised btn-primary" to={`/user/${user._id}`}>View Profile</Link>
                      </p>

                </div>    
                </div>
                // </div>
            ))}
        </div>
    
    );
    render()
    {
        {console.log("YYYy",this.state.users)}
        return(
            <div className="container">
                {console.log(this.state.users)}
                <h2 className="mt-5 mb-5">Users</h2>
                    {this.renderUser(this.state.users)}
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