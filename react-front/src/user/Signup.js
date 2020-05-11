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
            captcha_key:""

        }
        this.captchaMap = new Map([['1' ,'P4A2H' ],['4' ,'83tsU' ],['6' ,'PQJRYD' ],['7' ,'duolingoTM' ],['8' ,'2VYK' ],['2' ,'8HP' ],['3' ,'0096' ],['5' , '7329'],['9' ,'76447' ]])

    }

    setCaptchaKey = () => {
        
    }
    clickSubmit = event =>{
        event.preventDefault();
        const {name,email,password} = this.state;
        const user = {
            name,
            email,
            password
        };
        console.log(this.state.captcha,this.captchaMap.get(this.state.captcha_key) )


        if(this.state.captcha === this.captchaMap.get(this.state.captcha_key)) {
            signUp(user)
            .then(data=>{
                if(data.error)
                {
                    this.setState({error:data.error})
                }
                else{
                    console.log("GHYYYH")
                    // this.renew_captcha();
                    this.setState({
                        error:"",
                        name:"",
                        password:"",
                        email:"",
                        open:true,
                        captcha:"",
                        recaptcha:"",
                    })
                    let x = String(Math.floor(Math.random() * 9) + 1);
                    this.setState({captcha_key: x});
                    console.log(this.state.captcha_key)
                }
            })
      }
      else {
          this.setState({error:"Please enter a correct captcha"})
      }
    //   window.location.reload();
    }
    handleChange = (name) => (event) =>{
        this.setState({error:""})
        this.setState({[name]:event.target.value});
    }
    componentWillMount() {
        // window.location.reload();
        let x = String(Math.floor(Math.random() * 9) + 1);
        this.setState({captcha_key: x});

    }
    render(){
        
        return (
            <div>
                {/* {console.log(this.state.captcha_key,this.state.captcha)} */}
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
                        
                        <img 
                            style={{height:"100px", width:'auto',margin:10}} 
                            className="img-thumbnail" 
                            src={require("../captcha/c" + this.state.captcha_key +  ".png")} 
                            
                            alt={`Y`}>
                        </img>
                        <br/>
                        <div className="form-group">
                            <label className="text-muted">Please Enter the Captcha</label>
                            <input onChange={this.handleChange("captcha")} className="form-control" value={this.state.captcha}></input>
                        </div>
                        <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
                            Submit
                        </button>
                    </form>
                    {/* {console.log(this.captcha)} */}
                </div>
            </div>
        )
    }
}