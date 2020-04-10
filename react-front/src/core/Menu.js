import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import {isAuthenticated,signout} from '../auth'
const isActive = (history,path)=>{
    // console.log(path)
    // console.log(history.location.pathname)
    if(history.location.pathname===path)
    {
        return {color:"#ff9900"}
    }
   
}


const Menu = ({history}) =>(
    <div>
       
        {!isAuthenticated() && (
            <nav class="navbar navbar-expand-sm navbar-info bg-dark">                
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                        <Link className="btn btn-raised btn-primary mr-5" style={isActive(history,"/")} to="/">Home</Link>
                        </li>
                        <li class="nav-item active ">
                        <Link className="btn btn-raised btn-info mr-5" style={isActive(history,"/users")} to="/users">Users</Link>
                         </li>
                        <li class="nav-item">
                        <Link className="btn btn-raised btn-info mr-5" style={isActive(history,"/signin")} to="/signin">Signin</Link>
                        </li>

                        <li class="nav-item">
                        <Link className="btn btn-raised btn-success mr-5" style={isActive(history,"/signup"),{cursor:"pointer",colour:"#fff"}} to="/signup">Signup</Link>  

                        </li>
                       
                    </ul>
                </div>
            </nav>        
    )}
        {isAuthenticated() && (
            <div className="d-inline mr-5">
            <nav class="navbar navbar-expand-lg navbar-danger bg-success">
            <ul class = "navbar-item">
                    
                    <Link className="btn btn-raised btn-dark mr-5"
                        
                        style={isActive(history,"/"),{cursor:"pointer",color:"#fff"}}                
                        to={'/'}
                        >
                            Home
                    </Link>  
              
                </ul>        

                    <ul class="nav-item active ">
                        <Link className="btn btn-raised btn-info mr-5" style={isActive(history,"/users")} to="/users">Users</Link>
                    </ul>
                    <ul className="nav-item ">
                        <Link
                            className="btn btn-raised btn-info mr-5"
                            style={isActive(history,`/findpeople`)}
                            to={`/findpeople/`}
                            >
                               Find People
                        </Link>  
                    </ul>  
                    <ul className="nav-item ">
                        <Link
                            className="btn btn-raised btn-info mr-5"
                            style={isActive(history,`/create/post/${isAuthenticated().user._id}`)}
                            to={`/create/post/${isAuthenticated().user._id}`}
                            >
                                Create Post
                        </Link>  
                    </ul> 
                    <ul className="nav-item ">
                        <Link
                            className="btn btn-raised btn-primary mr-5"
                            style={isActive(history,`/posts/`)}
                            to={`/posts/`}
                            >
                               Posts
                        </Link>  
                    </ul>   
                    <ul className="nav-item ">
                        <Link
                            className="btn btn-raised btn-primary mr-5"
                            style={isActive(history,`/user/${isAuthenticated().user._id}`)}
                            to={`/user/${isAuthenticated().user._id}`}
                            >
                                Welcome  {isAuthenticated().user.name}!
                        </Link>  
                    </ul>  
                    <ul class = "navbar-item">
                    
                    <Link className="btn btn-raised btn-danger mr-5"
                        
                        style={isActive(history,"/"),{cursor:"pointer",color:"#fff"}}                
                        onClick={()=>signout(()=>history.push('/'))}
                        >
                            Signout
                    </Link>  
              
                </ul> 
                    
            </nav>
            </div>
        )}
     
            
        
    </div>
)
export default withRouter(Menu);

