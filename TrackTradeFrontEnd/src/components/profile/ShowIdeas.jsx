import React, { Component } from 'react'
import actions from '../../services/index'

export default class ShowIdeas extends Component {

    state = {}
    
    async componentDidMount() {
        let actualTrades = await actions.getIdeas();
        this.setState({actualTrades})
        console.log(this.state)
    }

    showIdeas = () => {
        if(this.state.actualTrades){
            return this.state.actualTrades.data.map(eachTrade=>{
                return (
                    <div>
                    <div>
                        <div>{eachTrade.trade.currency}</div>
                        <div>{eachTrade.trade.lot}</div>
                        <div>{eachTrade.trade.kind}</div>
                        <div>{eachTrade.trade.entry}</div>
                        <div>{eachTrade.trade.stoploss}</div>
                        <div>{eachTrade.trade.takeprofit}</div>
                        <div>{eachTrade.trade.trader}</div>
                    </div>
                    <br/>
                    <br/>
                    <br/>
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
            <div>
                {this.showIdeas()}
            </div>
        )
    }
}
