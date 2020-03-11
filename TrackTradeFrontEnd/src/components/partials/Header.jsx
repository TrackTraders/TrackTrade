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
        
            if(!this.props.loggedIn){
            return (<nav className="navbar navbar-default">    
                <div className="navigation">
                    <Link to="/" className="navigation--brand">Track Trade</Link>
                    <ul className="navigation--right">
                    <li id="about"><Link className="navigation--link navigation--login" to="/log-in">Log In</Link></li>
                    <li id="contact"><Link className="navigation--link navigation--signup" to="/sign-up">Sign Up</Link></li>
                    </ul>
                </div>
            </nav>
            )
            } else {
                if(this.props.isProfile){
                    return (
                        <nav className="navbar navbar-default">    
                            <div className="navigation">
                                <Link to="/" className="navigation--brand">Track Trade</Link>
                                <ul className="navigation--right">
                                <li id="post idea"><Link className="navigation--link navigation--login" to="/postIdea">Post Idea</Link></li>
                                <li id="post-trade"><Link className="navigation--link navigation--login" to="/postTrade">Post Trade</Link></li>
                                <li id="logout"><Link onClick={this.logOut} className="navigation--link navigation--signup" to="/">Log Out</Link></li>
                                </ul>
                            </div>
                        </nav>
        
                        )
                }
                else {
                    return (
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

            
        
    }
}
