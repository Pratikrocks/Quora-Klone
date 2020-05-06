import React,{Component} from 'react';
import {signUp} from '../auth';
import { Link } from 'react-router-dom';
import "./Signup.css"
export default class Signup extends Component {
    constructor()
    {
        super()
        this.state = {
            name:"",
            email:"",
            password:"",
            error:"",
            open:false,
            recaptcha:false,
            captcha:"",

        }
        this.unique_string = "lasdfv342535JKY#$%^&@#RGEBRNYSGERtWEewr4gEDEWF";
        this.captcha = "";

    }
    renew_captcha = () => {
        var i = 0;
        this.captcha=""
        for(i = 0;i<5;i++) {
            this.captcha += this.unique_string.charAt(Math.random() * 50);
        }
    }
    recaptchaHandler = (e) => {
        let day = e.target.value.toLowerCase();
        let dayCount ;
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
        const {name,email,password} = this.state;
        const user = {
            name,
            email,
            password
        };

        if(this.state.recaptcha && this.captcha === this.state.captcha) {
            signUp(user)
            .then(data=>{
                if(data.error)
                {
                    this.setState({error:data.error})
                }
                else{
                    this.renew_captcha();
                    this.setState({
                        error:"",
                        name:"",
                        password:"",
                        email:"",
                        open:true,
                        captcha:"",
                        recaptcha:"",
                    })
                }
            })
      }
      else {
          this.setState({error:"Please enter a correct captcha"})
      }
    }
    handleChange = (name) => (event) =>{
        this.setState({error:""})
        this.setState({[name]:event.target.value});
    }
    componentWillMount() {
        this.renew_captcha();
    }
    render(){
        
        return (
            <div>
                <div className="container">
                    <h2 className="mt-5 mb-5">Signup</h2>
                    <div className="alert alert-danger" style={{display:this.state.error ? "":"none"}}>
                        {this.state.error}
                    </div>
                    <div className="alert alert-info" style={{display:this.state.open ? "":"none"}}>
                        New Account is successfully created please <Link to="/signin">Signin</Link>
                    </div>
                    <form>
                        <div className="form-group">
                            <label className="text-muted">Name</label>
                            <input onChange={this.handleChange("name")} type="text" className="form-control" value={this.state.name}></input>
                        </div>
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
                            <input onChange={this.recaptchaHandler}  className="form-control" ></input>
                        </div>
                        <div 
                        style={{ fontFamily: "Playfair Display", color: "blue" }}
                        variant="h1"
                        gutterBottom
              
                       > 
                            {this.captcha} 
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Enter the above Captcha :)</label>
                            <input onChange={this.handleChange("captcha")}  className="form-control" value={this.state.captcha}></input>
                        </div>
                        <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
                            Submit
                        </button>
                        {console.log(this.unique_string.length)}
                    </form>
                    {console.log(this.captcha)}
                </div>
            </div>
        )
    }
}