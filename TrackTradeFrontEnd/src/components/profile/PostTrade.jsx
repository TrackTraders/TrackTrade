import React, { Component } from 'react'
import Header from '../partials/Header'
import actions from '../../services/index'


export default class PostTrade extends Component {

  state = {}

  handleChange = e => this.setState({[e.target.name]: e.target.value})

  handleSubmit = async e => {
      e.preventDefault()
      //console.log(e)
      try{
          await actions.postTrade(this.state);
          
          this.props.history.push('/profile')
          
      } catch(err){
          console.log('*****',err.message)
      }
  }

  render() {
    return (
      <div>
        <Header {...this.props} loggedIn={true}/>
        <div className="signup">
          <form className="signup-form" onSubmit={this.handleSubmit}>
          <div className="signup-form-group">
              <label for="currency">Currency</label>
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
              <div className="signup-form-group">
                  <label for="type">Sell or Buy</label>
                  <select className="signup-form-input" onChange={this.handleChange} name="kind" required>
                    <option value=""></option>
                    <option value="sell">Sell</option>
                    <option value="buy">Buy</option>
                  </select>
              </div>
              <div className="signup-form-group">
                  <label for="entry">Entry price</label>
                  <input onChange={this.handleChange} type="number" className="signup-form-input" name="entry" step="0.0001" min="0" max="1000" required />
              </div>
              <div className="signup-form-group">
                  <label for="close">Close price</label>
                  <input onChange={this.handleChange} type="number" className="signup-form-input" name="close"  step="0.0001" min="0" max="1000" required />
              </div>
              <div className="signup-form-group">
                  <label for="lot">Lot size</label>
                  <input onChange={this.handleChange} type="number" className="signup-form-input" name="lot"  step="0.01" min="0" max="100" required />
              </div>
              <button type="submit" className="signup-form-btn">Post Trade</button>
          </form>
        </div>
      </div>
    )
  }
}
