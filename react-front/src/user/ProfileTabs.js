import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import DefaultProfile from '../images/avatar.png'


class ProfileTabs extends Component {
    render()
    {
        const {followers ,following,posts}  =this.props;
        return (
            <div>
               <div className="row">
                   <div className="col-md-4">
                       <h3 className="text-primary">Followers</h3>
                       <hr/>
                       {
                        followers.map((person,i) => (
                            <div key={i}>
                               <hr/>
                                    <div>
                                        <Link to={`/user/${person._id}`}>
                                            <img
                                            className="float-left mr-2"
                                                height="50px"
                                                width="50px"
                                                style={{borderRadius:"50%",border:"1px solid black" }}
                                                onError={i=>(i.target.src=`${DefaultProfile}`)}
                                                src={`${process.env.REACT_APP_API_URL}/userk/photo/${person._id}`}
                                                alt={person.name}
                                            />
                                           <div>
                                               <p className="lead">{person.name}</p>
                                           </div>
                                        </Link>
                                        {/* <p style={{clear:'both'}}>
                                            {person.about}
                                        </p> */}
                        {/* <div className="md-9 mt-6 mr-6 lead">{person.name}</div> */}
                                    </div>
                                </div>
                           
                        ))
                       }
                   </div>
                   <div className="col-md-4">
                       <h3 className="text-primary">Following</h3>
                       <hr/>
                       {
                        following.map((person,i) => (
                            <div key={i}>
                                <hr/>
                                {/* <div className="row"> */}
                                    <div>
                                        <Link to={`/user/${person._id}`}>
                                            <img
                                            className="float-left mr-2"
                                                height="50px"
                                                width="50px"
                                                style={{borderRadius:"50%",border:"1px solid black" }}
                                                onError={i=>(i.target.src=`${DefaultProfile}`)}
                                                src={`${process.env.REACT_APP_API_URL}/userk/photo/${person._id}`}
                                                alt={person.name}
                                            />
                                           <div>
                                               <p className="lead">{person.name}</p>
                                           </div>
                                        </Link>
                                      
                        {/* <div className="md-9 mt-6 mr-6 lead">{person.name}</div> */}
                                    </div>
                                {/* </div> */}
                            </div>
                        ))
                       }
                   </div>
                   <div className="col-md-4">
                    <h3 className="text-primary">Posts</h3>
                       <hr/>
                       {
                        posts.map((post,i) => (
                            <div key={i}>
                               <hr/>
                                    <div>
                                        <Link to={`/post/${post._id}`}>
                                            <img
                                            className="float-left mr-2"
                                                height="50px"
                                                width="50px"
                                                style={{borderRadius:"50%",border:"1px solid black" }}
                                                onError={i=>(i.target.src=`${DefaultProfile}`)}
                                                src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                                                alt={post.title}
                                            />
                                           <div>
                                               <p className="lead">{post.title}</p>
                                           </div>
                                        </Link>
                                        {/* <p style={{clear:'both'}}>
                                            {person.about}
                                        </p> */}
                        {/* <div className="md-9 mt-6 mr-6 lead">{person.name}</div> */}
                                    </div>
                                </div>
                           
                        ))
                       }
                    </div>   
               </div>
            </div>
        )
    }
}export default ProfileTabs