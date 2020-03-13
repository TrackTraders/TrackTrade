import React, { Component } from 'react'
import actions from '../../services/index'

export default class ShowTrades extends Component {

    state = {}
    
    async componentDidMount() {
        let actualTrades = await actions.getTrades();
        this.setState({actualTrades})
        console.log(this.state)
    }

    deleteCard = async id => {
        try {
            await actions.deleteTrades({cardId: id});
            let actualTrades = await actions.getIdeas();
            this.setState({actualTrades})
        }
        catch(err) {
            console.log('--=-=-=-=-=-=-=', err)
        }
    }

    formatTime = (time) => {
        return String(new Date(time)).substring(0,24)
    }

    showIdeas = () => {
        if(this.state.actualTrades){
            return this.state.actualTrades.data.map(eachTrade=>{
                return (
                    
                    <a href="#popup" onClick={async () => {
                        await this.setState({eachTrade});
                        console.log(this.state);
                    }} className="trade-ideas-card">
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
                            
                        </div>
                    </div>
                </div> : null}
            </div>
        )
    }
}
