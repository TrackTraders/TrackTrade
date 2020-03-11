import React, { Component } from 'react'
import actions from '../../services/index'

export default class ShowTrades extends Component {

    state = {}
    
    async componentDidMount() {
        let actualTrades = await actions.getTrades();
        this.setState({actualTrades})
        console.log(this.state)
    }

    showTrades = () => {
        if(this.state.actualTrades){
            return this.state.actualTrades.data.map(eachTrade=>{
                return (
                    <div>
                    <div>
                        <div>{eachTrade.trade.currency}</div>
                        <div>{eachTrade.trade.lot}</div>
                        <div>{eachTrade.trade.kind}</div>
                        <div>{eachTrade.trade.entry}</div>
                        <div>{eachTrade.trade.close}</div>
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
                {this.showTrades()}
            </div>
        )
    }
}
