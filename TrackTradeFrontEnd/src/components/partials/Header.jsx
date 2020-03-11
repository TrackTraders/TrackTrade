import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import actions from '../../services/index'

export default class Header extends Component {

    logOut = async () => {
        let res = await actions.logOut()
        this.props.history.push('/')
        window.location.reload()
    }

    render() {
        return (
            !this.props.loggedIn ?
            <nav className="navbar navbar-default">    
                <div className="navigation">
                    <Link to="/" className="navigation--brand">Track Trade</Link>
                    <ul className="navigation--right">
                    <li id="about"><Link className="navigation--link navigation--login" to="/log-in">Log In</Link></li>
                    <li id="contact"><Link className="navigation--link navigation--signup" to="/sign-up">Sign Up</Link></li>
                    </ul>
                </div>
            </nav>
            :
            <nav className="navbar navbar-default">    
                <div className="navigation">
                    <Link to="/" className="navigation--brand">Track Trade</Link>
                    <ul className="navigation--right">
                    <li id="about"><Link className="navigation--link navigation--login" to="/profile">Profile</Link></li>
                    <li id="contact"><Link onClick={this.logOut} className="navigation--link navigation--signup" to="/">Log Out</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}
