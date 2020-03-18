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

    connectUser = async (userID) => {
        console.log(userID)
        try {
            await actions.addConnection({userID});
        }
        catch(err) {console.log(err)}
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
                            </div>
                            <h1 className="profile-nav__user-username">{this.state.userdata[0].username}</h1>
                            <div onClick={() => this.connectUser(this.state.userdata[0]._id)} className= "profile-nav__links-text-profile">Connect</div>
                            <div onClick={null} className= "profile-nav__links-text-profile">Message</div>
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
