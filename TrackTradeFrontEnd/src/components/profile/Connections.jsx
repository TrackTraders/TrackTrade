import React, { Component } from 'react'
import actions from '../../services/index'

export default class Connections extends Component {


    //MAKE METHOD TO RUN ROUTE THROUGH BACKEND THAT GETS THE USERS DATA AND LOOP THROUGH LOGGED IN USER COLECTION AND GET THE CONNECTIONS KEYS, EACH PARAGRAPH INSIDE SCROLLABLE CONTAINER SHOULD HAVE AN ONCLICK THAT RENDERS THAT SPECIFIC USERS INFO ON THE RIGHT BUT NOT ALL OF IT, TO SEE MORE YOU CLICK ON THEIR NAME AGAIN ON THE RIGHT SIDE AND THEN YOULL SEE THEIR PROFILE WITH THEIR SPECIFIC TRADES
    
    //I love how im making this happen

    state = {}

    async componentDidMount() {
        let allTraders = await actions.getAllTraders();
        this.setState({allTraders: allTraders.data})
        console.log(this.state)
    }

    showConnections = () => {
        if(this.state.allTraders){
            let copyTraders = [...this.state.allTraders]
            let filteredTraders = copyTraders.filter(eachTrader => {
                return eachTrader._id
                //loop through this.props.user to get connections and
                //only return those that match you know
            })
            console.log(filteredTraders)

        }
    }

    render() {
        return (
            <div>
                <div className="connections-container">
                    {this.showConnections()}
                </div>
            </div>
        )
    }
}
