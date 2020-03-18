import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Header from '../partials/Header'
import Footer from '../partials/Footer'
import ShowIdeas from './ShowIdeas'
import ShowTrades from './ShowTrades'
import ShowStats from './ShowStats'
import Connections from './Connections'
import actions from '../../services/index'

export default class OtherProfile extends Component {

    state = {
        display: "ideas"
    }

    async componentDidMount(){
        
        let otheruser = await actions.findOtherProfile({username: this.props.match.params.otheruser})
        this.setState({...otheruser.data})
        console.log('-==-=-=-=-=-=-', this.state)
    }

    displayStuff = () => {
        if(this.state.display){
            if(this.state.display === "ideas"){
                return <ShowIdeas tradeIdeas={this.state.tradeIdeas} otherProfile={true} />
            } else if(this.state.display === "trades"){
                return <ShowTrades trades={this.state.trades} otherProfile={true} />
            } else if(this.state.display === "stats"){
                return <ShowStats otherProfile={true} />
            }
        }
        else {
            return <ShowIdeas otherProfile={true} />
        }
    }

    imageLoad = () => {
        // console.log(this.props.avatar)
        return this.state.userdata[0].avatar ?
        <img className="profile-nav__user-avatar__image" src={this.state.userdata[0].avatar} alt="Avatar"/>
        :
        <div className="profile-nav__user-avatar__image-default"></div>
               
    }


    // changeProfileState = ()

    render() {
        console.log(this.state)
        if(this.props.match.params.otheruser !== this.props.username){
        return this.state.userdata ?
         (
            <div>
            
                <Header {...this.props} loggedIn={true}/>
                <div className="profile">
                    <div className="profile-nav">
                        <div className="profile-nav__user">
                            <div className="profile-nav__user-avatar">
                                {this.imageLoad()}
                                <div className="profile-nav__user-avatar__image-default"></div>
                                <div className="profile-nav__user-avatar__change">
                                <form className="profile-nav__user-avatar__change-form">
                                    <label className="profile-nav__user-avatar__change-form--label" htmlFor="img">Change Avatar</label>
                                    <input className="profile-nav__user-avatar__change-form--input" onChange={this.handleSubmit} type="file" id="img" name="img" accept="image/*"/>
                                </form>
                                </div>
                            </div>
                            <h1 className="profile-nav__user-username">{this.state.userdata[0].username}</h1>
                            <li className= "profile-nav__links-text-profile">Connect</li>
                            <li className= "profile-nav__links-text-profile">Message</li>
                        </div>
                        <ul className="profile-nav__links">

                            
                            <li className={this.state.display === "ideas" ? "profile-nav__links-text-active" : "profile-nav__links-text"} onClick={() => this.setState({display:"ideas"})}>Ideas</li>
                            <li className={this.state.display === "trades" ? "profile-nav__links-text-active" : "profile-nav__links-text"} onClick={() => this.setState({display:"trades"})}>Trades</li>
                            <li className={this.state.display === "stats" ? "profile-nav__links-text-active" : "profile-nav__links-text"} onClick={() => this.setState({display:"stats"})}>Stats</li>

                        </ul>
                    </div>
                    <div className="profile-content">
                        {this.displayStuff()}
                    </div>
                </div>
                <Footer/>
                
            </div>
        ) : null
        } else {
            return <Redirect to="/profile"/>
        }
    }
}
