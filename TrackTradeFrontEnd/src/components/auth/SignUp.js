import React, { Component } from 'react'
import actions from '../../services/index'

export default class Signup extends Component {

    // signMeUpScotty = () => {
    //     fetch("https://tracktradebackend.herokuapp.com/signup")
    // }

    state = {}

    handleChange = e => this.setState({[e.target.name]: e.target.value})

    handleSubmit = async e => {
        e.preventDefault()
        if(this.state.username.includes(" ") || this.state.password.includes(" ")){
            alert("No spaces allowed")
        }
        else if(this.state.username.length > 13){
            alert("Username cannot be bigger than 13 characters, sorry Mr. 'johnSmithTraderAccountTrackTrade123' ")
        }
        else{
            try{
                let user = await actions.signUp(this.state);
                this.props.setUser({...user.data})  
                this.props.history.push('/home')
            } catch(err){
                console.log('*****',err.message)
            }

        }
    }
    
    render() {
        return (
            <div className="signuppage">
                <div className="navigation">
                        <a href="/" className="navigation--brand">Track Trade</a>
                    </div>
                    <div className="signup">
                    <form className="signup-form" onSubmit={this.handleSubmit}
                    >
                        <div className="signup-form-group">
                            <label for="username">Username</label>
                            <input onChange={this.handleChange} type="text" className="signup-form-input" placeholder="smithjohntrades123" name="username" required />
                        </div>
                        <div className="signup-form-group">
                            <label for="password">Password</label>
                            <input onChange={this.handleChange} type="password" className="signup-form-input" name="password" required />
                        </div>
                        <button type="submit" className="signup-form-btn">Sign Up</button>
                    </form>
                    </div>                
            </div>
        )
    }
}
