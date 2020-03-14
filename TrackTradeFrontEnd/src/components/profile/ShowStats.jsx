import React, { Component } from 'react'
import actions from '../../services/index'
import CanvasJSReact from '../../canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


let allTradesDataPoints = [];
let winLossDataPoints = [];
let currencyPerformance = [
    { label: "USD/JPY",  y: -3, color: "#d21"  },
    { label: "EUR/USD", y: 4, color: "#2c1"  },
    { label: "EUR/GBP", y: -2, color: "#d21"  },
    { label: "CHF/JPY",  y: 3, color: "#2c1"  },
    { label: "USD/CAD",  y: 6, color: "#2c1"  }];

export default class ShowStats extends Component {

    state = {
        currentChart: 'allTrades'
    }
    
    async componentDidMount() {

        let actualTrades = await actions.getTrades();
        this.setState({actualTrades})
        
        let trades = this.state.actualTrades.data
        var chart = this.chart;
        let wins = 0;
        let losses = 0;
        let obj = {};

        for (let i = 0; i < trades.length; i++) {
            obj[trades[i].trade.currency] = 0
            // if(currencyPerformance){
            //     for(let cur in currencyPerformance){
            //         if(cur.label.includes(trades[i].trade.currency)){
            //             pips > 0 ? currencyPerformance[cur]++ : currencyPerformance[cur]--;
            //         }
            //     }
            // } else {
            //     return null
            // }
        }


		for (let i = 0; i < trades.length; i++) {

            let pips;
            let num;

            //sell not jpy
            if(trades[i].trade.kind === 'sell' && !trades[i].trade.currency.includes("JPY")){
                pips = Math.ceil((trades[i].trade.entry * 10000) - (trades[i].trade.close * 10000))
            }
            //sell jpy
            else if(trades[i].trade.kind === 'sell' && trades[i].trade.currency.includes("JPY")){
                pips = Math.ceil((trades[i].trade.entry * 100) - (trades[i].trade.close * 100))
            }
            //buy not jpy
            else if(trades[i].trade.kind === 'buy' && !trades[i].trade.currency.includes("JPY")){
                pips = trades[i].trade.close - trades[i].trade.entry
            }
            //buy jpy
            else if(trades[i].trade.kind === 'buy' && trades[i].trade.currency.includes("JPY")){
                pips = Math.ceil((trades[i].trade.close * 100) - (trades[i].trade.entry * 100))
            }
            // console.log(pips)
            
            if(pips > 0){
                wins++;
                obj[trades[i].trade.currency] += 1
            } else {
                losses++;
                obj[trades[i].trade.currency] -= 1

            }
            console.log(obj)

            // trades.map(eachTrade=>{
            //     return eachTrade.trade.currency
                
            // })

           
            
            allTradesDataPoints.push({
                // x: new Date(this.state.actualTrades.data[i].created_at),
                x: num,
                y: pips * trades[i].trade.lot * 10
            });

            winLossDataPoints = [
                { y: wins, label: "Wins", color: '#2c1' },
                { y: losses, label: "Losses", color: '#d21' }
            ]

            // curPerformCalc

            num++;
            
			}
		chart.render();
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

    render() {
        // dataPoints = [];
        let options = {
            animationEnabled: true,
            zoomEnabled: true,
            theme: "dark2",
            backgroundColor: "#081c24",
			title: {
				text: "Stats"
			},
			axisY: {
                title: "Profit/Loss",
                prefix: "$",
				includeZero: false
            },
            axisX: {
                title: "Number of Trade",
                prefix: "",
				includeZero: true
			},
			data: [{
				type: "spline",
				xValueFormatString: "Trade #",
				yValueFormatString: "$0",
				dataPoints: allTradesDataPoints
			}]
        }

        if(this.state.currentChart === "allTrades"){
            options = {
                animationEnabled: true,
                animationDuration: 3000,
                zoomEnabled: true,
                
                theme: "dark2",
                backgroundColor: "#081c24",

                title: {
                    text: "ALL TRADES",
                    fontFamily: 'arial',
                    fontColor: '#dddddd'
                },
                axisY: {
                    title: "Profit/Loss",
                    prefix: "$",
                    includeZero: false
                },
                axisX: {
                    title: "Number of Trade",
                    prefix: "",
                    includeZero: true
                },
                data: [{
                    type: "spline",
                    lineColor: "#2ba7fa",
                    lineThickness: 5,
                    color: "#dddddd",
                    xValueFormatString: "Trade #",
                    yValueFormatString: "$0",
                    dataPoints: allTradesDataPoints
                }]
            }
        }
        else if(this.state.currentChart === "winLoss"){
            options = {
                exportEnabled: true,
                animationEnabled: true,
                theme: "dark2",
                backgroundColor: "#081c24",
                title: {
                    text: "WIN LOSS RATIO",
                    fontFamily: 'arial',
                    fontColor: '#dddddd'
                },
                data: [{
                    type: "pie",
                    startAngle: 0,
                    toolTipContent: "<b>{label}</b>: {y}",
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabelFontSize: 16,
                    indexLabel: "{label} - {y}",
                    dataPoints: winLossDataPoints
                }]
            }
        }
        else if(this.state.currentChart === "curPerformance") {
            options = {
                theme: "dark2",
                backgroundColor: "#081c24",
                title: {
                    text: "CURRENCY PERFORMANCE",
                    fontFamily: 'arial',
                    fontColor: '#dddddd'
                },
                axisY: {
                    title: "Wins/Losses",
                    includeZero: false
                },                
                axisX: {
                    title: "Currency Pair",
                    includeZero: true
                },
                data: [
                {
                    type: "column",
                    dataPoints: currencyPerformance
                }
                ]
            }
        }
        
        console.log(this.state)
        
        return (
            <div className="profile-stats">
                
                <ul className="profile-stats-nav__links">
                    <li className={this.state.currentChart === "allTrades" ? "profile-stats-nav__links-text-active" : "profile-stats-nav__links-text"} onClick={() => this.setState({currentChart:"allTrades"})}>All Trades</li>
                    <li className={this.state.currentChart === "winLoss" ? "profile-stats-nav__links-text-active" : "profile-stats-nav__links-text"} onClick={() => this.setState({currentChart:"winLoss"})}>Win Loss Ratio</li>
                    <li className={this.state.currentChart === "curPerformance" ? "profile-stats-nav__links-text-active" : "profile-stats-nav__links-text"} onClick={() => this.setState({currentChart:"curPerformance"})}>Currency Performance</li>
                    <li className={this.state.currentChart === "connections" ? "profile-stats-nav__links-text-active" : "profile-stats-nav__links-text"} onClick={() => this.setState({currentChart:"connections"})}>Connections</li>
                </ul>
                <div className="profile-stats-chart">
                    <CanvasJSChart options = {options} 
                        onRef={ref => this.chart = ref}
                    />
                    {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
                </div>
            </div>
        )
    }
}
