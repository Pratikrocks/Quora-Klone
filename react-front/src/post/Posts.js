import React, {Component} from 'react';
import { list } from './apiPost'
import DefaultProfile from '../images/PostImage.jpg'
import { Link } from 'react-router-dom';
import "./posts.css"

export default class Posts extends Component
{
    constructor(props)
    {
        super()
        this.state = {
            posts:[]
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
            this.setState({posts:res.posts});
        })

    }
    renderPosts = Posts =>{
        
       return ( 
        <div className="row">
            {Posts.map((post,i) => {
                // <div className="card" style={{width:"22rem"}}>
                const posterId = post.postedBy ? post.postedBy._id : ""
                const posterName = post.postedBy ? post.postedBy.name : ""
                const class_ = i%2 ? "light" : "dark"
                return (
                <div className={"card col-md-4 buldge_cards curve_borders " + (i % 2 ? "light" : "dark")}  key={i}>
                {/* <img 
                    style={{height:"200px", width:'auto'}} 
                    className="img-thumbnail" 
                    src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}`} 
                
                    alt={i => (i.target.src = `${DefaultProfile}`)}
                    // alt={user.name}
                    >

                    </img> */}
                <div className="card-body border-info">
                    <img className="img-thumbnail mb-3"  src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}` } alt=""></img>
                      <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.body.substring(0,100)}{" ..."} </p>
                      <br/>
                        <p className="font-italic mark">
                            Posted By {" "} <Link to={`/user/${posterId}`}>{posterName}</Link> {" "}
                            on {new Date(post.created).toDateString()}
                        </p>

                      <p>
                          {console.log(post._id)}
                           <Link href="#" class="btn btn-raised btn-primary" to={`/post/${post._id}`}>Read More</Link>
                      </p>

                </div>    
                </div>
                )
                // </div>
                })}
        </div>
        )
    
    };
    render()
    {
        {console.log("YYYy",this.state.posts)}
        return(
            <div className="container">
                {console.log(this.state.posts)}
                <h2 className="mt-5 mb-5 buldge">Recent Posts</h2>
                    {this.renderPosts(this.state.posts)}
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