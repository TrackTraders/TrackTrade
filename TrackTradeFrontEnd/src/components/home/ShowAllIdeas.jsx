import React, { Component, Fragment } from 'react'
import actions from '../../services/index'
import { Link } from 'react-router-dom';

export default class ShowAllIdeas extends Component {
    state = {}
    
    async componentDidMount() {
        let actualTrades = await actions.getAllIdeas();
        this.setState({actualTrades: actualTrades.data.reverse()})
        console.log(this.state)
    }
    
    

    formatTime = (time) => {
        return String(new Date(time)).substring(0,24)
    }

    searchTraders = (e) => {
        let tradersList = [...this.state.allTraders]
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

    showIdeas = () => {
        if(this.state.actualTrades){

            return this.state.actualTrades.map(eachTrade=>{
                return (
                    <div className="trade-ideas-card">
                    <a href="#popup" onClick={async () => {
                        await this.setState({eachTrade});
                        console.log(this.state);
                    }} className="trade-ideas-card-more">click for more info</a>
                    <a href="#popup" className="trade-ideas-card-link" onClick={async () => {
                        await this.setState({eachTrade});
                        console.log(this.state);
                    }} >
                        
                        <div className="trade-ideas-card__item">
                            <div className="trade-ideas-card__item-title">
                                {eachTrade.trade.currency} {eachTrade.trade.kind}
                            </div>
                        </div>
                        {/* <div className="trade-ideas-card__item">
                            <div className="trade-ideas-card__item-title">
                                Lot Size:
                            </div>
                            <div className="trade-ideas-card__item-content">
                                {eachTrade.trade.lot}
                            </div>
                        </div> */}
                        <div className="trade-ideas-card__item">
                            <div className="trade-ideas-card__item-title">
                                Entry:
                            </div>
                            <div className="trade-ideas-card__item-content">
                                {eachTrade.trade.entry}
                            </div>
                        </div>
                        {/* <div className="trade-ideas-card__item">
                            <div className="trade-ideas-card__item-title">
                                Stoploss:
                            </div>
                            <div className="trade-ideas-card__item-content">
                                {eachTrade.trade.stoploss}
                            </div>
                        </div>
                        <div className="trade-ideas-card__item">
                            <div className="trade-ideas-card__item-title">
                                Takeprofit:
                            </div>
                            <div className="trade-ideas-card__item-content">
                                {eachTrade.trade.takeprofit}
                            </div>
                        </div> */}
                        <div className="trade-ideas-card__item">
                            <div className="trade-ideas-card__item-title">
                                By:
                            </div>
                            <div className="trade-ideas-card__item-content">
                                {eachTrade.trade.trader}
                            </div>
                        </div>
                        <div className="trade-ideas-card__item-date">
                            <div className="trade-ideas-card__item-date-title">
                                Created at:
                            </div>
                            <div className="trade-ideas-card__item-date-content">
                                {this.formatTime(eachTrade.created_at)}
                            </div>
                        </div>
                        {(eachTrade.updatedAt === eachTrade.created_at) ? null :
                         <div className="trade-ideas-card__item-date">
                            <div className="trade-ideas-card__item-date-title">
                                Updated at:
                            </div>
                            <div className="trade-ideas-card__item-date-content">
                                {this.formatTime(eachTrade.updatedAt)}
                            </div>
                        </div>
                        }                        
                    </a>
                    </div> 
                    
                )
            })
        }
        else {
            return null
        }
    }

    render() {
        return (
            <Fragment>
            <div className="home-content-section1">
                <input onChange={this.searchTraders} className="home-content--search" type="text" placeholder="Search for trade ideas by their currency" />
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
            <div className="trade-ideas">
                {this.showIdeas()}
                {/* {this.exitPopup()} */}

                {this.state.eachTrade ? <div class="popup" id="popup">
                    <div class="popup__content" id="content">
                        <div class="popup__left">
                            
                        </div>
                        <div class="popup__right">
                            <a href="#main" class="popup__close">&times;</a>
                            <h2 class="heading-secondary u-margin-bottom-small">{this.state.eachTrade.trade.currency} {this.state.eachTrade.trade.kind}</h2>
                            
                            <h2 class="heading-secondary u-margin-bottom-small">Entry: {this.state.eachTrade.trade.entry}</h2>
                            <h2 class="heading-secondary u-margin-bottom-small">Stoploss: {this.state.eachTrade.trade.stoploss}</h2>
                            <h2 class="heading-secondary u-margin-bottom-small">Takeprofit: {this.state.eachTrade.trade.takeprofit}</h2>
                            
                            
                            <h2 class="heading-secondary u-margin-bottom-small">
                            {this.state.eachTrade.trade.description ? <p class="popup__text">{this.state.eachTrade.trade.description}</p> : <p class="popup__text">No description provided</p>}
                            </h2>
                            <p class="popup__text">Created by:
                            <Link to={`/profile/${this.state.eachTrade.trade.trader}`} >
                            {this.state.eachTrade.trade.trader}
                            </Link>
                            </p>
                            
                        </div>
                    </div>
                </div> : null}
                
            </div>
            </Fragment>
        )
    }
}
