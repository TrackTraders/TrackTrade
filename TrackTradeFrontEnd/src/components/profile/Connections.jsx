import React, { Component, Fragment } from 'react'
import actions from '../../services/index'
import { Link } from 'react-router-dom';

export default class Connections extends Component {


    //MAKE METHOD TO RUN ROUTE THROUGH BACKEND THAT GETS THE USERS DATA AND LOOP THROUGH LOGGED IN USER COLECTION AND GET THE CONNECTIONS KEYS, EACH PARAGRAPH INSIDE SCROLLABLE CONTAINER SHOULD HAVE AN ONCLICK THAT RENDERS THAT SPECIFIC USERS INFO ON THE RIGHT BUT NOT ALL OF IT, TO SEE MORE YOU CLICK ON THEIR NAME AGAIN ON THE RIGHT SIDE AND THEN YOULL SEE THEIR PROFILE WITH THEIR SPECIFIC TRADES
    
    //I love how im making this happen

    state = {}

    async componentDidMount() {
        let allTraders = await actions.getAllTraders();
        this.setState({allTraders: allTraders.data})

        this.setState({traders: allTraders.data})

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

    searchTraders = (e) => {
        let tradersList = [...this.state.traders]
        let filteredTraders = tradersList.filter(eachTrader=>{
          return eachTrader.username.toLowerCase().includes(e.target.value.toLowerCase())      
        })
        console.log(filteredTraders)
        if(filteredTraders){
          this.setState({
            traders:filteredTraders
          })
        }
    }

    sortTraders = (e) => {
        console.log(e.target.value)
        if(e.target.value === ""){
            this.setState({traders:this.state.allTraders})
        }
        else if(e.target.value === "wlr-best"){
            let tradersList = [...this.state.allTraders]
            tradersList.sort((b,a) => {
                
                return a.wlr - b.wlr
                
            })
            this.setState({traders: tradersList})            
        }
        else if(e.target.value === "wlr-worst"){
            let tradersList = [...this.state.allTraders]
            tradersList.sort((a,b) => {
                
                return a.wlr - b.wlr
                
            })
            this.setState({traders: tradersList})            
        }
        else if(e.target.value === "total-most"){
            let tradersList = [...this.state.allTraders]
            tradersList.sort((b,a) => {
                
                return a.totalTrades - b.totalTrades
                
            })
            this.setState({traders: tradersList})            
        }
        else if(e.target.value === "total-least"){
            let tradersList = [...this.state.allTraders]
            tradersList.sort((a,b) => {
                
                return a.totalTrades - b.totalTrades
                
            })
            this.setState({traders: tradersList})            
        }
        else if(e.target.value === "joined-newest"){
            let tradersList = [...this.state.allTraders]
            tradersList.sort((b,a) => {
                // console.log(a.created_at, "-----", b.created_at)
                return a.created_at.localeCompare(b.created_at)
                
            })
            this.setState({traders: tradersList})            
        }
        else if(e.target.value === "joined-oldest"){
            let tradersList = [...this.state.allTraders]
            tradersList.sort((a,b) => {
                // console.log(a.created_at, "-----", b.created_at)
                return a.created_at.localeCompare(b.created_at)
                
            })
            this.setState({traders: tradersList})            
        }
        
    }

    showConnections = () => {
        if(this.state.traders && this.state.userData){
            let copyTraders = [...this.state.traders]
            let filteredTraders = copyTraders.filter(eachTrader => {
                return this.state.userData.connections.includes(eachTrader._id)
                //loop through this.props.user to get connections and
                //only return those that match you know
            })
            return filteredTraders.map(eachOne=>{
                return (
                    
                        <Link className="home-card" to={`/profile/${eachOne.username}`} >
                        <div className="trade-ideas-card">
                        <div className="trade-ideas-card-more">visit profile</div>
                        
                        <div className="trade-ideas-card-link">
                            
                            <div className="trade-ideas-card__item">
                                <div className="trade-ideas-card__item-title-home">
                                    <div>
                                    {eachOne.avatar ?
                                    <img className="trade-ideas-card__item__image" src={eachOne.avatar} alt="avatar"/>
                                    :
                                    <div className="trade-ideas-card__item__image-default"></div>      
                                    }
                                    </div>
                                    <div className="trade-ideas-card__item-title-home-text">
                                        {eachOne.username}
                                    </div>
                                </div>
                            </div>
                            {
                            eachOne.created_at &&
                            <div className="trade-ideas-card__item">
                                <div className="trade-ideas-card__item-title">
                                    User since:
                                </div>
                                <div className="trade-ideas-card__item-content">
                                    {this.formatTime(eachOne.created_at)}
                                </div>
                            </div>
                            }
                            {this.winLossRatio(eachOne.username) &&
                            <div className="trade-ideas-card__item">
                                <div className="trade-ideas-card__item-title">
                                    Win Loss Ratio:
                                </div>
                                <div className="trade-ideas-card__item-content">
                                    {this.winLossRatio(eachOne.username)}
                                </div>
                            </div>
                            }
                            {this.totalTrades(eachOne.username) ?
                            <div className="trade-ideas-card__item">
                                <div className="trade-ideas-card__item-title">
                                    Total Trades:
                                </div>
                                <div className="trade-ideas-card__item-content">
                                    {this.totalTrades(eachOne.username)}
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
                    
                )

            })

        }
    }

    render() {
        return (
            <Fragment>
            {/* <div className="home-content-search-sort">
                <div className="home-content-section1">
                    <input onChange={this.searchTraders} className="home-content--search" type="text" placeholder="Search for traders by their username" />
                    <label className="home-content--label" htmlFor="sort">Sort By:</label>
                    <select name="sort" className="home-content--select" onChange={this.sortTraders}>
                        <option value="">-</option>
                        <option value="wlr-best">Win Loss Ratio: best</option>
                        <option value="wlr-worst">Win Loss Ratio: worst</option>
                        <option value="total-most">Total Trades: most</option>
                        <option value="total-least">Total Trades: least</option>
                        <option value="joined-newest">Joined: newest</option>
                        <option value="joined-oldest">Joined: oldest</option>
                    </select>
                </div>
            </div>             */}
            <div className="trade-ideas">
                {this.showConnections()}
            </div>
            </Fragment>
            
                /* <div className="connections-card">
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
                </div> */
            
        )
    }
}
