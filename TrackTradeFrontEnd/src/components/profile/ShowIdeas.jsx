import React, { Component } from 'react'
import actions from '../../services/index'


export default class ShowIdeas extends Component {

    state = {}
    
    async componentDidMount() {
        let actualTrades = await actions.getIdeas();
        this.setState({actualTrades})
        console.log(this.state)
    }
    
    deleteCard = async id => {
        try {
            await actions.deleteIdeas({cardId: id});
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
                    
                    <div className="trade-ideas-card">
                        <div onClick={() => this.deleteCard(eachTrade._id)} className="trade-ideas-card-delete">&times;</div>
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
            </div>
        )
    }
}
