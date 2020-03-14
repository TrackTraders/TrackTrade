import React, { Component } from 'react'
import Header from '../partials/Header'
import Footer from '../partials/Footer'
import ShowIdeas from './ShowIdeas'
import ShowTrades from './ShowTrades'
import ShowStats from './ShowStats'
import Connections from './Connections'
import actions from '../../services/index'

export default class Profile extends Component {

    state = {
        display: "ideas"
    }

    displayStuff = () => {
        if(this.state.display){
            if(this.state.display === "ideas"){
                return <ShowIdeas />
            } else if(this.state.display === "trades"){
                return <ShowTrades />
            } else if(this.state.display === "stats"){
                return <ShowStats />
            } else if(this.state.display === "connections"){
                return <Connections />
            }
        }
        else {
            return <ShowIdeas />
        }
    }

    handleSubmit = async e => {
        
        console.log("SUBMITTED BABY!!!!!!!!!",  e.target.files[0])

        // e.preventDefault()
        // try{
        //     let user = await actions.changeAvatar(this.state);
        //     this.props.setUser({...user.data})  
        //     this.props.history.push('/home')
        // } catch(err){
        //     console.log('*****',err.message)
        // }
    }


    // changeProfileState = ()

    render() {
        return (
            <div>
                <Header {...this.props} isProfile={true} loggedIn={true}/>
                <div className="profile">
                    <div className="profile-nav">
                        <div className="profile-nav__user">
                            <div className="profile-nav__user-avatar">
                                <div className="profile-nav__user-avatar__change">
                                <form className="profile-nav__user-avatar__change-form">
                                    <label className="profile-nav__user-avatar__change-form--label" for="img">Change Avatar</label>
                                    <input className="profile-nav__user-avatar__change-form--input" onChange={this.handleSubmit} type="file" id="img" name="img" accept="image/*"/>
                                </form>
                                </div>
                            </div>
                            <h1 className="profile-nav__user-username">{this.props.user.username}</h1>
                        </div>
                        <ul className="profile-nav__links">
                            <li className={this.state.display === "ideas" ? "profile-nav__links-text-active" : "profile-nav__links-text"} onClick={() => this.setState({display:"ideas"})}>Ideas</li>
                            <li className={this.state.display === "trades" ? "profile-nav__links-text-active" : "profile-nav__links-text"} onClick={() => this.setState({display:"trades"})}>Trades</li>
                            <li className={this.state.display === "stats" ? "profile-nav__links-text-active" : "profile-nav__links-text"} onClick={() => this.setState({display:"stats"})}>Stats</li>
                            <li className={this.state.display === "connections" ? "profile-nav__links-text-active" : "profile-nav__links-text"} onClick={() => this.setState({display:"connections"})}>Connections</li>
                        </ul>
                    </div>
                    <div className="profile-content">
                        {this.displayStuff()}
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
