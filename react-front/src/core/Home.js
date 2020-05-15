import React, { Component } from 'react'
import Posts from '../post/Posts'
import './Home.css'

class Home extends Component {
    render(){
        return (
            <body className="background">
                <div className="container gradient">
                        <p className="lead">Welcome to Quora Klone</p>
                        <div>
                            <Posts/>
                        </div>
                </div>
            </body>
        )}    
}
export default Home;