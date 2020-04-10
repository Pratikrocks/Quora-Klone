import React,{Component} from 'react';
import {Link,Redirect} from 'react-router-dom'
import {isAuthenticated,signout} from '../auth'
import {remove} from './apiUser'
class DeleteUser extends Component{
    state = {
        reDirect:false
    }
    deleteAccount = () =>{
        const token = isAuthenticated().token;
        const userId = this.props.userID;
        console.log(userId)
        remove(userId,token)
            .then(data=>{
                console.log("**")
                console.log(data)
                console.log("**")
                if(data.error)
                {

                }
                else {
                    signout(()=>console.log("User is deleted"))
                    this.setState({reDirect:true})
                }
            })

    }
    deleteConfirmed =()=>{
       
        let answer = window.confirm("Are you sure you want to delete the account?");
        if(answer)
        {
            this.deleteAccount()
        }
    }
    render()
    {
        if(this.state.reDirect){
           return (<Redirect to="/"  />)
        }
        return(
            
                <Link onClick={this.deleteConfirmed} className="btn btn-raised btn-danger mr-5" to="/">
                                Delete Profile
                </Link>
        
        )
    }
}
export default DeleteUser;