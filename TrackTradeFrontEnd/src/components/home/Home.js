import React, { Component } from 'react'
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import ShowTraders from './ShowAllTraders'
import ShowIdeas from './ShowAllIdeas'
import ShowTrades from './ShowAllTrades'
import ShowStats from './ShowAllStats'
// import Connections from '../profile/Connections'

export default class Home extends Component {
    state = {
        display: "traders"
    }
    displayStuff = () => {
        if(this.state.display){
            if(this.state.display === "traders"){
                return <ShowTraders />
            } else if(this.state.display === "ideas"){
                return <ShowIdeas />
            } else if(this.state.display === "trades"){
                return <ShowTrades />
            } else if(this.state.display === "stats"){
                return <ShowStats />
            }
        }
        else {
            return <ShowIdeas />
        }
    }
    render() {
        return (
            <div>
            <Header {...this.props} where={"Home"} loggedIn={true}/>
            <div className="home">
                    <div className="home-nav">
                        
                        <ul className="home-nav__links">
                            <li className={this.state.display === "traders" ? "home-nav__links-text-active" : "home-nav__links-text"} onClick={() => this.setState({display:"traders"})}>All Traders</li>
                            <li className={this.state.display === "ideas" ? "home-nav__links-text-active" : "home-nav__links-text"} onClick={() => this.setState({display:"ideas"})}>All Ideas</li>
                            <li className={this.state.display === "trades" ? "home-nav__links-text-active" : "home-nav__links-text"} onClick={() => this.setState({display:"trades"})}>All Trades</li>
                            <li className={this.state.display === "stats" ? "home-nav__links-text-active" : "home-nav__links-text"} onClick={() => this.setState({display:"stats"})}>All Stats</li>
                            {/* <li className={this.state.display === "connections" ? "home-nav__links-text-active" : "home-nav__links-text"} onClick={() => this.setState({display:"connections"})}>Connections</li> */}
                        </ul>
                    </div>
                    <div className="home-content">
                        
                        <div className="home-content-section2">
                            {this.displayStuff()}
                        </div>                        
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
