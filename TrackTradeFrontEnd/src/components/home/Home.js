import React, { Component } from 'react'
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import ShowIdeas from './ShowAllIdeas'
import ShowTrades from './ShowAllTrades'
import ShowStats from './ShowAllStats'
// import Connections from '../profile/Connections'

export default class Home extends Component {
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
            }
            // else if(this.state.display === "connections"){
            //     return <Connections />
            // }
        }
        else {
            return <ShowIdeas />
        }
    }
    render() {
        return (
            <div>
            <Header {...this.props} loggedIn={true}/>
            <div className="home">
                    <div className="home-nav">
                        
                        <ul className="home-nav__links">
                            <li className={this.state.display === "ideas" ? "home-nav__links-text-active" : "home-nav__links-text"} onClick={() => this.setState({display:"ideas"})}>Ideas</li>
                            <li className={this.state.display === "trades" ? "home-nav__links-text-active" : "home-nav__links-text"} onClick={() => this.setState({display:"trades"})}>Trades</li>
                            <li className={this.state.display === "stats" ? "home-nav__links-text-active" : "home-nav__links-text"} onClick={() => this.setState({display:"stats"})}>Stats</li>
                            {/* <li className={this.state.display === "connections" ? "home-nav__links-text-active" : "home-nav__links-text"} onClick={() => this.setState({display:"connections"})}>Connections</li> */}
                        </ul>
                    </div>
                    <div className="home-content">
                        {this.displayStuff()}
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
