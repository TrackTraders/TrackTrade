import React, { Component } from 'react'
import actions from '../../services/index'

export default class ShowAllTrades extends Component {
    state = {}
    
    async componentDidMount() {
        let actualTrades = await actions.getAllTrades();
        this.setState({actualTrades})
        console.log(this.state)
    }

    formatTime = (time) => {
        return String(new Date(time)).substring(0,24)
    }

    showIdeas = () => {
        if(this.state.actualTrades){
            let reversedActualTrades = this.state.actualTrades.data.reverse();
            return reversedActualTrades.map(eachTrade=>{
                return (
                    <div className="trade-ideas-card">
                    <a href="#popup" onClick={async () => {
                        await this.setState({eachTrade});
                        console.log(this.state);
                    }} className="trade-ideas-card-link">
                        {/* <div onClick={() => this.deleteCard(eachTrade._id)} class="trade-ideas-card-delete">&times;</div> */}
                        <div className="trade-ideas-card__item">
                            <div className="trade-ideas-card__item-title">
                                {eachTrade.trade.currency} {eachTrade.trade.kind}
                            </div>
                        </div>
                        <div className="trade-ideas-card__item">
                            <div className="trade-ideas-card__item-title">
                                Lot Size:
                            </div>
                            <div className="trade-ideas-card__item-content">
                                {eachTrade.trade.lot}
                            </div>
                        </div>
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
                            <p class="popup__text">Created by: {this.state.eachTrade.trade.trader}</p>
                        </div>
                    </div>
                </div> : null}
            </div>
        )
    }
}
