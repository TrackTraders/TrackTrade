import React, { Component } from 'react'
import Header from '../partials/Header'
import Footer from '../partials/Footer'
import ShowIdeas from './ShowIdeas'
import ShowTrades from './ShowTrades'
import Stats from './Stats'
import Connections from './Connections'


export default class Profile extends Component {

    state = {
        display: null
    }

    displayStuff = () => {
        if(this.state.display){
            if(this.state.display === "ideas"){
                return <ShowIdeas />
            } else if(this.state.display === "trades"){
                return <ShowTrades />
            } else if(this.state.display === "stats"){
                return <Stats />
            } else if(this.state.display === "connections"){
                return <Connections />
            }
        }
        else {
            return <ShowIdeas />
        }
    }

    render() {
        return (
            <div>
                <Header {...this.props} isProfile={true} loggedIn={true}/>
                <div className="profile">
                    <div className="profile-nav">
                        <div className="profile-nav__user">
                            <div className="profile-nav__user-avatar"></div>
                            <h1 className="profile-nav__user-username">{this.props.user.username}</h1>
                        </div>
                        <ul className="profile-nav__links">
                            <li className="profile-nav__links-text" onClick={() => this.setState({display:"ideas"})}>Ideas</li>
                            <li className="profile-nav__links-text" onClick={() => this.setState({display:"trades"})}>Trades</li>
                            <li className="profile-nav__links-text" onClick={() => this.setState({display:"stats"})}>Stats</li>
                            <li className="profile-nav__links-text" onClick={() => this.setState({display:"connections"})}>Connections</li>
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
