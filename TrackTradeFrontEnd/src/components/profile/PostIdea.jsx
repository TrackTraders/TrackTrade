import React, { Component } from 'react'
import Header from '../partials/Header'
import Footer from '../partials/Footer'
import actions from '../../services/index'

export default class PostTrade extends Component {

  state = {}

  handleChange = e => this.setState({[e.target.name]: e.target.value})

  handleSubmit = async e => {
      e.preventDefault()
      //console.log(e)
      try{
          await actions.postIdea(this.state);
          
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
                  <input onChange={this.handleChange} type="text" className="signup-form-input" placeholder="USD/CAD" name="currency" required />
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
                  <label for="close">Stop Loss</label>
                  <input onChange={this.handleChange} type="number" className="signup-form-input" name="stoploss"  step="0.0001" min="0" max="1000" required />
              </div>
              <div className="signup-form-group">
                  <label for="close">Take Profit</label>
                  <input onChange={this.handleChange} type="number" className="signup-form-input" name="takeprofit"  step="0.0001" min="0" max="1000" required />
              </div>
              <div className="signup-form-group">
                  <label for="lot">Lot size</label>
                  <input onChange={this.handleChange} type="number" className="signup-form-input" name="lot"  step="0.01" min="0" max="100" required />
              </div>
              <div className="signup-form-group">
                  <label for="lot">Description</label>
                  <textarea onChange={this.handleChange} type="text" className="signup-form-input" name="description" />
              </div>
              <button type="submit" className="signup-form-btn">Post Idea</button>
          </form>
        </div>
      </div>
    )
  }
}
