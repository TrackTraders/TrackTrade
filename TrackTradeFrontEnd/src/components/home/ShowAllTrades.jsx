import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import actions from '../../services/index'

export default class ShowAllTrades extends Component {
    state = {}
    
    async componentDidMount() {
        let actualTrades = await actions.getAllTrades();
        this.setState({actualTrades: actualTrades.data.reverse()})
        console.log(this.state)
    }

    formatTime = (time) => {
        return String(new Date(time)).substring(0,24)
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
                    <a href="#popup" onClick={async () => {
                        await this.setState({eachTrade});
                        console.log(this.state);
                    }} className="trade-ideas-card-link">
                        {/* <div onClick={() => this.deleteCard(eachTrade._id)} class="trade-ideas-card-delete">&times;</div> */}

                        {eachTrade.trade.money > 0 ?
                            <div className="trade-ideas-card-win-all">WIN</div>
                        :
                            <div className="trade-ideas-card-loss-all">LOSS</div>
                        }

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
                        <div className="trade-ideas-card__item">
                            <div className="trade-ideas-card__item-title">
                                Close:
                            </div>
                            <div className="trade-ideas-card__item-content">
                                {eachTrade.trade.close}
                            </div>
                        </div>
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
            <div class="trade-ideas">
                {this.showIdeas()}
                {this.state.eachTrade ? <div class="popup" id="popup">
                    <div class="popup__content" id="content">
                        <div class="popup__left">
                            
                        </div>
                        <div class="popup__right">
                            <a href="#main" class="popup__close">&times;</a>
                            <h2 class="heading-secondary u-margin-bottom-small">{this.state.eachTrade.trade.currency} {this.state.eachTrade.trade.kind}</h2>
                            <h2 class="heading-secondary u-margin-bottom-small">Lot size: {this.state.eachTrade.trade.lot}</h2>
                            <h2 class="heading-secondary u-margin-bottom-small">Entry: {this.state.eachTrade.trade.entry}</h2>
                            <h2 class="heading-secondary u-margin-bottom-small">Closed at: {this.state.eachTrade.trade.close}</h2>
                            
                            
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
        )
    }
}
