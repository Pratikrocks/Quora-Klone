import React,{Component} from 'react';
import {Redirect} from 'react-router-dom'
import {signIn,authenticate} from '../auth';
export default class Signin extends Component {
    constructor()
    {
        super()
        this.state = {
            email:"",
            password:"",
            error:"",
            redirectToRefer:false,
            loading:false,
            recaptcha:false,
        }
    }
    recaptchaHandler = (e) => {
        let day = e.target.value.toLowerCase();
        let dayCount ;
        console.log(day)
        if (day == "monday") {
            dayCount = 1;
        }
        if (day == "tuesday") {
            dayCount = 2;
        }
        if (day == "wednesday") {
            dayCount = 3;
        }
        if (day == "thursday") {
            dayCount = 4;
        }
        if (day == "friday") {
            dayCount = 5;
        }
        if (day == "saturday") {
            dayCount = 6;
        }
        if (day == "sunday") {
            dayCount = 0;
        }
        if (dayCount == new Date().getDay()) {
            this.setState({recaptcha:true});
            return true;
        }
        else {
            this.setState({recaptcha:false})
        }
        return false;
    }
    clickSubmit = event =>{
        event.preventDefault();
        this.setState({loading:true})
        const {email,password} = this.state;
        const user = {
            email,
            password
        };
        console.log(user)
        if(this.state.recaptcha) {
        signIn(user)
        .then( data =>{
            if(data.error)
            {
                console.log(data.error)
                this.setState({error:data.error,loading:false})
            }
            else{
                // authenticate and then redirect
                // console.log(data)
                authenticate(data,()=>{
                    this.setState({redirectToRefer:true})
                })
            }
        })
      }
      else {
          this.setState({error:"Please enter a correct Captcha"})
      }
    }
    handleChange = (name) => (event) =>{
        this.setState({error:""})
        this.setState({[name]:event.target.value});
    }
    render(){
        if(this.state.redirectToRefer)
        {
            return <Redirect to="/"/>
        }
        return (
            <div>
                <div className="container">
                    <h2 className="mt-5 mb-5">Signin</h2>
                    <div className="alert alert-danger" style={{display:this.state.error ? "":"none"}}>
                        {this.state.error}
                    </div>
                    {this.state.loading?
                        <div className="jumbotron text-center">
                            <h2>Loading...</h2>
                        </div>:null}
                    <form>
                        <div className="form-group">
                            <label className="text-muted">Email</label>
                            <input onChange={this.handleChange("email")} type="email" className="form-control" value={this.state.email}></input>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Password</label>
                            <input onChange={this.handleChange("password")} type="password" className="form-control" value={this.state.password}></input>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">
                                {this.state.recaptcha ? "Thanks you got it " : "What day is today ?"}
                                </label>
                            <input onChange={this.recaptchaHandler} type="text" className="form-control" ></input>
                        </div>

                        <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
                            Submit
                        </button>
                    </form>
                    
                </div>
            </div>
        )
    }
}