import React, { Component } from 'react'
import actions from '../../services/index'

export default class Login extends Component {

    state = {}
     
    handleChange = e => this.setState({[e.target.name]: e.target.value})

    handleSubmit = async e => {
        e.preventDefault()
        try{
            let user = await actions.logIn(this.state);
            console.log(user.data)
            this.props.setUser({...user.data})  
            // this.props.doFlashMessage('Logged In Successfully', true)
            this.props.history.push('/home')

        }catch(err){
            // console.log('=-=-=-=-=-',err.response.data)
            console.log(err)        

            // if(err.response.data ==="Unauthorized"){
            //     // this function is fake because we're not actually passing it in
            //     // look at the full-stack-library-app to see how to pass in this function for flash messages
            //     this.props.doFlashMessage('Email/Password Combination Incorrect, please check credentials and try again', false)
            // } else if(err.response.data ==="Bad Request"){
            //     this.props.doFlashMessage('Please make sure to enter an Email AND Password', false)
            // }
        }
    }

    render() {
        return (
            <div className="signuppage">
                <div className="navigation">
                    <a href="/" className="navigation--brand">Track Trade</a>
                </div>
                <div className="signup">
                <form className="signup-form" onSubmit={this.handleSubmit}>
                    
                    <div className="signup-form-group">
                        <label htmlFor="email">Username</label>
                        <input onChange={this.handleChange} type="text" className="signup-form-input" placeholder="smithjohntrades123" name="username" required />
                    </div>
                    <div className="signup-form-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={this.handleChange} type="password" className="signup-form-input" name="password" required />
                    </div>
                    <button type="submit" className="signup-form-btn">Log In</button>
                </form>
                </div>
            </div>
        )
    }
}
