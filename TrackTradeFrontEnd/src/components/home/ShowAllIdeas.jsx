import React, { Component } from 'react'
import actions from '../../services/index'

export default class ShowAllIdeas extends Component {
    state = {}
    
    async componentDidMount() {
        let actualTrades = await actions.getAllIdeas();
        this.setState({actualTrades})
        console.log(this.state)
    }
    
    

    formatTime = (time) => {
        return String(new Date(time)).substring(0,24)
    }

    // exitPopup = () => {
    //     if(this.state.eachTrade){
    //         var popup = document.querySelector('.popup');
    
    //         popup.addEventListener('click', e => {
    //             if(e.target.matches('.popup *')) return;
    //             else {
    //                 window.location.hash = "#tours"
    //             }
    //           });

    //     }
    // }

    showIdeas = () => {
        if(this.state.actualTrades){
            return this.state.actualTrades.data.map(eachTrade=>{
                return (
                    <div className="trade-ideas-card">
                    <div onClick={() => this.deleteCard(eachTrade._id)} className="trade-ideas-card-delete">&times;</div>
                    <a href="#popup" className="trade-ideas-card-link" onClick={async () => {
                        await this.setState({eachTrade});
                        console.log(this.state);
                    }} >
                        
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
                            <h2 class="heading-secondary u-margin-bottom-small">Lot size: {this.state.eachTrade.trade.lot}</h2>
                            <h2 class="heading-secondary u-margin-bottom-small">Entry: {this.state.eachTrade.trade.entry}</h2>
                            <h2 class="heading-secondary u-margin-bottom-small">Stoploss: {this.state.eachTrade.trade.stoploss}</h2>
                            <h2 class="heading-secondary u-margin-bottom-small">Takeprofit: {this.state.eachTrade.trade.takeprofit}</h2>
                            
                            
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
