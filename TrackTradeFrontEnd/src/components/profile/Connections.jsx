import React, { Component } from 'react'
import actions from '../../services/index'
import { Link } from 'react-router-dom';

export default class Connections extends Component {


    //MAKE METHOD TO RUN ROUTE THROUGH BACKEND THAT GETS THE USERS DATA AND LOOP THROUGH LOGGED IN USER COLECTION AND GET THE CONNECTIONS KEYS, EACH PARAGRAPH INSIDE SCROLLABLE CONTAINER SHOULD HAVE AN ONCLICK THAT RENDERS THAT SPECIFIC USERS INFO ON THE RIGHT BUT NOT ALL OF IT, TO SEE MORE YOU CLICK ON THEIR NAME AGAIN ON THE RIGHT SIDE AND THEN YOULL SEE THEIR PROFILE WITH THEIR SPECIFIC TRADES
    
    //I love how im making this happen

    state = {}

    async componentDidMount() {
        let allTraders = await actions.getAllTraders();
        this.setState({allTraders: allTraders.data})

        let actualTrades = await actions.getAllTrades();
        this.setState({actualTrades: actualTrades.data})

        let user = await actions.isLoggedIn()
        this.setState({userData: user.data})

        console.log(this.state)
    }

    formatTime = (time) => String(new Date(time)).substring(0,24)

    winLossRatio = (user) => {

        if(this.state.actualTrades){
            let wins = 0;
            let losses = 0;

            let copyTrades = [...this.state.actualTrades]
            let userTrades = copyTrades.filter(eachTrade => {
                return eachTrade.trade.trader === user
            })
            // console.log(userTrades)
            userTrades.forEach(eachOne => {
                eachOne.trade.money > 0 ? wins++ : losses++
            })
            let percent = Math.ceil((wins / (wins + losses)) * 100)
            // console.log(wins, "--=-=-=-==--=-=-", losses)

            if(percent) {
                // this.setState({traders.: {wlr: percent}})
                return percent.toString() + "%"
            } else return null
        }
    }

    totalTrades = (user) => {
        if(this.state.actualTrades){
            let copyTrades = [...this.state.actualTrades]
            let userTrades = copyTrades.filter(eachTrade => {
                return eachTrade.trade.trader === user
            })
            if(userTrades.length > 0){
                // this.setState({traders: {totalTrades: userTrades.length}})
                //console.log(this.state)
                return userTrades.length
            }
        }
    }

    showConnections = () => {
        if(this.state.allTraders && this.state.userData){
            let copyTraders = [...this.state.allTraders]
            let filteredTraders = copyTraders.filter(eachTrader => {
                return this.state.userData.connections.includes(eachTrader._id)
                //loop through this.props.user to get connections and
                //only return those that match you know
            })
            return filteredTraders.map(eachOne=>{
                return (
                    <p onClick={() => this.setState({selectedProfile: eachOne})}>{eachOne.username}</p>
                )

            })

        }
    }

    render() {
        return (
            <div className="connections">
                <div className="connections-container">
                    {this.showConnections()}
                </div>
                <div className="connections-card">
                <div className="trade-ideas">
                {this.state.selectedProfile ?
                <Link className="home-card" to={`/profile/${this.state.selectedProfile.username}`} >
                    <div className="trade-ideas-card">
                    <div className="trade-ideas-card-more">visit profile</div>
                    
                    <div className="trade-ideas-card-link">
                        
                        <div className="trade-ideas-card__item">
                            <div className="trade-ideas-card__item-title-home">
                                <div>
                                {this.state.selectedProfile.avatar ?
                                <img className="trade-ideas-card__item__image" src={this.state.selectedProfile.avatar} alt="avatar"/>
                                :
                                <div className="trade-ideas-card__item__image-default"></div>      
                                }
                                </div>
                                <div className="trade-ideas-card__item-title-home-text">
                                    {this.state.selectedProfile.username}
                                </div>
                            </div>
                        </div>
                        {
                        this.state.selectedProfile.created_at &&
                        <div className="trade-ideas-card__item">
                            <div className="trade-ideas-card__item-title">
                                User since:
                            </div>
                            <div className="trade-ideas-card__item-content">
                                {this.formatTime(this.state.selectedProfile.created_at)}
                            </div>
                        </div>
                        }
                        {this.winLossRatio(this.state.selectedProfile.username) &&
                        <div className="trade-ideas-card__item">
                            <div className="trade-ideas-card__item-title">
                                Win Loss Ratio:
                            </div>
                            <div className="trade-ideas-card__item-content">
                                {this.winLossRatio(this.state.selectedProfile.username)}
                            </div>
                        </div>
                        }
                        {this.totalTrades(this.state.selectedProfile.username) ?
                        <div className="trade-ideas-card__item">
                            <div className="trade-ideas-card__item-title">
                                Total Trades:
                            </div>
                            <div className="trade-ideas-card__item-content">
                                {this.totalTrades(this.state.selectedProfile.username)}
                            </div>
                        </div>
                        :
                        <div className="trade-ideas-card__item">
                            <div className="trade-ideas-card__item-title">
                                This user has no trades posted
                            </div>
                        </div>
                        }
                        
                    </div>
                    </div>
                    </Link>

                    :
                    null
                
                }
                </div>
                </div>
            </div>
        )
    }
}
