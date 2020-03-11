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
                    
                    <ul>
                        <li onClick={() => this.setState({display:"ideas"})}>Ideas</li>
                        <li onClick={() => this.setState({display:"trades"})}>Trades</li>
                        <li onClick={() => this.setState({display:"stats"})}>Stats</li>
                        <li onClick={() => this.setState({display:"connections"})}>Connections</li>
                    </ul>

                    {this.displayStuff()}
                <Footer/>
            </div>
        )
    }
}
