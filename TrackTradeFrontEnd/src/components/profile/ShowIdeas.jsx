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

    editIdeas = () => {
        this.setState({edit:true, editEachTrade: this.state.eachTrade.trade})
    }

    handleChange = e => {
        let editCopy = this.state.editEachTrade
        editCopy["tradeID"] = this.state.eachTrade._id
        editCopy[e.target.name] = e.target.value
        console.log(editCopy)
        this.setState({editEachTrade: editCopy})
    }

    saveEdit = async e => {
        this.setState({edit:false})
        // console.log(this.state.editEachTrade)
        e.preventDefault()
        //console.log(e)
        try{
            await actions.updateIdea(this.state.editEachTrade);
        } catch(err){
            console.log('*****',err.message)
        }
    }
    
    exitPopup = () => {
        this.setState({edit:false})
    }

    render() {
        console.log(this.state)
        return (
            <div className="trade-ideas">
                {this.showIdeas()}
                {/* {this.exitPopup()} */}

                {this.state.eachTrade ? <div class="popup" id="popup">
                    <div class="popup__content" id="content">
                        <div class="popup__left">
                            
                        </div>
                        
                            {!this.state.edit ?
                            <div class="popup__right">
                            <a href="#main" class="popup__close">&times;</a>
                            <button onClick={this.editIdeas} class="popup__edit popup__edit">EDIT IDEA</button>
                            
                            <h2 class="heading-secondary u-margin-bottom-small">{this.state.eachTrade.trade.currency} {this.state.eachTrade.trade.kind}</h2>
                            <h2 class="heading-secondary u-margin-bottom-small">Lot size: {this.state.eachTrade.trade.lot}</h2>
                            <h2 class="heading-secondary u-margin-bottom-small">Entry: {this.state.eachTrade.trade.entry}</h2>
                            <h2 class="heading-secondary u-margin-bottom-small">Stoploss: {this.state.eachTrade.trade.stoploss}</h2>
                            <h2 class="heading-secondary u-margin-bottom-small">Takeprofit: {this.state.eachTrade.trade.takeprofit}</h2>
                            
                            
                            <h2 class="heading-secondary u-margin-bottom-small">
                            {this.state.eachTrade.trade.description ? <p class="popup__text">{this.state.eachTrade.trade.description}</p> : <p class="popup__text">No description provided</p>}
                            </h2>
                            </div>
                            
                            :
                            <div class="popup__right">
                            <a href="#main" class="popup__close" onClick={this.exitPopup}>&times;</a>

                            <form className="popup-form" onSubmit={this.handleSubmit}>
                                <button type="submit" onClick={this.saveEdit} class="popup__save popup__save">SAVE</button>

                                <div className="popup-form-group">
                                    <label for="currency">Currency</label>
                                    <select placeholder={this.state.eachTrade.trade.currency} className="popup-form-input" required onChange={this.handleChange} name="currency">
                                    <option></option>
                                    <option>AUD/CAD</option>
                                    <option>AUD/CHF</option>
                                    <option>AUD/JPY</option>
                                    <option>AUD/NZD</option>
                                    <option>AUD/USD</option>
                                    <option>CAD/CHF</option>
                                    <option>CAD/JPY</option>
                                    <option>CHF/JPY</option>
                                    <option>EUR/AUD</option>
                                    <option>EUR/CAD</option>
                                    <option>EUR/CHF</option>
                                    <option>EUR/GBP</option>
                                    <option>EUR/JPY</option>
                                    <option>EUR/NZD</option>
                                    <option>EUR/USD</option>
                                    <option>GBP/AUD</option>
                                    <option>GBP/CAD</option>
                                    <option>GBP/CHF</option>
                                    <option>GBP/JPY</option>
                                    <option>GBP/NZD</option>
                                    <option>GBP/USD</option>
                                    <option>NZD/CAD</option>
                                    <option>NZD/CHF</option>
                                    <option>NZD/JPY</option>
                                    <option>NZD/USD</option>
                                    <option>USD/CAD</option>
                                    <option>USD/JPY</option>
                                    </select>
                                </div>
                                <div className="popup-form-group">
                                    <label for="type">Sell or Buy</label>
                                    <select placeholder={this.state.eachTrade.trade.kind} className="popup-form-input" onChange={this.handleChange} name="kind" required>
                                        <option value=""></option>
                                        <option value="sell">Sell</option>
                                        <option value="buy">Buy</option>
                                    </select>
                                </div>
                                <div className="popup-form-group">
                                    <label for="entry">Entry price</label>
                                    <input placeholder={this.state.eachTrade.trade.entry} onChange={this.handleChange} type="number" className="popup-form-input" name="entry" step="0.0001" min="0" max="1000" required />
                                </div>
                                <div className="popup-form-group">
                                    <label for="close">Stop Loss</label>
                                    <input placeholder={this.state.eachTrade.trade.stoploss} onChange={this.handleChange} type="number" className="popup-form-input" name="stoploss"  step="0.0001" min="0" max="1000" required />
                                </div>
                                <div className="popup-form-group">
                                    <label for="close">Take Profit</label>
                                    <input placeholder={this.state.eachTrade.trade.takeprofit} onChange={this.handleChange} type="number" className="popup-form-input" name="takeprofit"  step="0.0001" min="0" max="1000" required />
                                </div>
                                <div className="popup-form-group">
                                    <label for="lot">Lot size</label>
                                    <input placeholder={this.state.eachTrade.trade.lot} onChange={this.handleChange} type="number" className="popup-form-input" name="lot"  step="0.01" min="0" max="100" required />
                                </div>
                                <div className="popup-form-group">
                                    <label for="lot">Description</label>
                                    <textarea placeholder={this.state.eachTrade.trade.description} onChange={this.handleChange} type="text" className="popup-form-input" name="description" />
                                </div>
                            </form>
                            </div> 
                            }
                        
                    </div>
                </div> : null}
                
            </div>
        )
    }
}
