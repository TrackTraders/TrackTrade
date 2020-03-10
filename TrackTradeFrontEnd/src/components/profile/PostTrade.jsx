import React, { Component } from 'react'
import CanvasJSReact from '../../canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

let marketData = [
    {
      "o": "1.0806",
      "h": "1.0822",
      "l": "1.0777",
      "c": "1.0785",
      "v": "79085",
      "t": 1582156800,
      "tm": "2020-02-20 00:00:00"
    },
    {
      "o": "1.0785",
      "h": "1.0865",
      "l": "1.0784",
      "c": "1.0845",
      "v": "72949",
      "t": 1582243200,
      "tm": "2020-02-21 00:00:00"
    },
    {
      "o": "1.0841",
      "h": "1.0873",
      "l": "1.0805",
      "c": "1.0854",
      "v": "80310",
      "t": 1582502400,
      "tm": "2020-02-24 00:00:00"
    },
    {
      "o": "1.0854",
      "h": "1.0892",
      "l": "1.083",
      "c": "1.0881",
      "v": "95389",
      "t": 1582588800,
      "tm": "2020-02-25 00:00:00"
    },
    {
      "o": "1.0881",
      "h": "1.091",
      "l": "1.0855",
      "c": "1.0881",
      "v": "96531",
      "t": 1582675200,
      "tm": "2020-02-26 00:00:00"
    },
    {
      "o": "1.0882",
      "h": "1.1007",
      "l": "1.0879",
      "c": "1.1",
      "v": "96549",
      "t": 1582761600,
      "tm": "2020-02-27 00:00:00"
    },
    {
      "o": "1.1",
      "h": "1.1055",
      "l": "1.0951",
      "c": "1.1026",
      "v": "103279",
      "t": 1582848000,
      "tm": "2020-02-28 00:00:00"
    },
    {
      "o": "1.1003",
      "h": "1.1187",
      "l": "1.1003",
      "c": "1.1134",
      "v": "112463",
      "t": 1583107200,
      "tm": "2020-03-02 00:00:00"
    },
    {
      "o": "1.1133",
      "h": "1.1214",
      "l": "1.1095",
      "c": "1.1173",
      "v": "111384",
      "t": 1583193600,
      "tm": "2020-03-03 00:00:00"
    },
    {
      "o": "1.1172",
      "h": "1.1188",
      "l": "1.1095",
      "c": "1.1136",
      "v": "99181",
      "t": 1583280000,
      "tm": "2020-03-04 00:00:00"
    },
    {
      "o": "1.1136",
      "h": "1.1246",
      "l": "1.112",
      "c": "1.1241",
      "v": "95961",
      "t": 1583366400,
      "tm": "2020-03-05 00:00:00"
    },
    {
      "o": "1.1237",
      "h": "1.1355",
      "l": "1.1211",
      "c": "1.1286",
      "v": "120580",
      "t": 1583452800,
      "tm": "2020-03-06 00:00:00"
    },
    {
      "o": "1.1338",
      "h": "1.1396",
      "l": "1.13345",
      "c": "1.13875",
      "v": "8534",
      "t": 1583625600,
      "tm": "2020-03-08 00:00:00"
    }
  ]
  ;

let dataPoints = [];

export default class PostTrade extends Component {
    
    render() {	
		const options = {
			theme: "light2",
			title: {
				text: "EUR/USD 1D"
			},
			axisY: {
				title: "Price in USD",
				prefix: "$",
				includeZero: false
			},
			data: [{
				type: "line",
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "$#,##0.00",
				dataPoints: dataPoints
			}]
		}
		return (
		<div style={{width:700}}>
			<CanvasJSChart options = {options} 
				 onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
	
	componentDidMount(){
		var chart = this.chart;
		for (var i = 0; i < marketData.length; i++) {
				dataPoints.push({
					x: new Date(marketData[i].tm.slice(0,10)),
					y: Number(marketData[i].c)
				});
			}
		chart.render();
		
	}
}
