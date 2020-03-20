import React, { Component } from "react";

export default class Tools extends Component {
  state = {};

  handleChange = e => this.setState({[e.target.name]: e.target.value})

  handleSubmit = async e => {
    e.preventDefault()
    let res = ((this.state.balance * (this.state.risk / 100)) / (this.state.stoploss * 10)).toFixed(3)
    await this.setState({result: res})
    console.log("-=-=-", this.state)
  };

  showLotSize = () => {
    return <h1 className="signup-result-lot">Lot size: {this.state.result}</h1>
  }

  render() {
    return (
      <div className="signup-lotcalc">
        
          <form className="signup-lotcalc-form" onSubmit={this.handleSubmit}>
            <div className="signup-lotcalc-form-group">
              <label for="balance">Account Balance, $</label>
              <input
                onChange={this.handleChange}
                type="number"
                className="signup-form-input"
                placeholder="5000"
                name="balance"
                required
              />
            </div>
            <div className="signup-lotcalc-form-group">
              <label for="currency">Currency Pair</label>
              <select className="signup-form-input" required onChange={this.handleChange} name="currency">
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
            <div className="signup-lotcalc-form-group">
              <label for="risk">Risk Ratio, %</label>
              <input
                onChange={this.handleChange}
                type="number"
                className="signup-form-input"
                name="risk"
                min="0"
                max="100"
                required
              />
            </div>
            <div className="signup-lotcalc-form-group">
              <label for="stoploss">Stop Loss, pips</label>
              <input
                onChange={this.handleChange}
                type="number"
                className="signup-form-input"
                name="stoploss"
                min="0"
                max="10000"
                required
              />
            </div>
            <button type="submit" className="signup-lotcalc-form-btn">
              Calculate
            </button>
          </form>
            {this.state.result ? this.showLotSize() : null}
      </div>
    );
  }
}
