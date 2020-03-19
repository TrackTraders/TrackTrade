import React, { Component } from 'react'
import Header from '../partials/Header'
import actions from '../../services/index'


export default class PostTrade extends Component {

  state = {}

  handleChange = e => this.setState({[e.target.name]: e.target.value})

  handleSubmit = async e => {
      e.preventDefault()
      //console.log(e)
      let pips = 0;

      //sell not jpy
      if(this.state.kind === 'sell' && !this.state.currency.includes("JPY")){
          pips = Math.ceil((this.state.entry * 10000) - (this.state.close * 10000))
      }
      //sell jpy
      else if(this.state.kind === 'sell' && this.state.currency.includes("JPY")){
          pips = Math.ceil((this.state.entry * 100) - (this.state.close * 100))
      }
      //buy not jpy
      else if(this.state.kind === 'buy' && !this.state.currency.includes("JPY")){
          pips = Math.ceil((this.state.close * 10000) - (this.state.entry * 10000))
      }
      //buy jpy
      else if(this.state.kind === 'buy' && this.state.currency.includes("JPY")){
          pips = Math.ceil((this.state.close * 100) - (this.state.entry * 100))
      }
      
      await this.setState({money: (pips * this.state.lot * 10)})

      console.log(this.state)
      try{
          await actions.postTrade(this.state);
          
          this.props.history.push('/profile')
          
      } catch(err){
          console.log('*****',err.message)
      }
  }

  handleFileUpload = e => {
      console.log("The file to be uploaded is: ", e.target.files[0]);

      const uploadData = new FormData();
      // imageUrl => this name has to be the same as in the model since we pass
      // req.body to .create() method when creating a new thing in '/api/things/create' POST route
      uploadData.append("imageUrl", e.target.files[0]);
      
      actions.handleTradeUpload(uploadData) //This is where we will go cloudinary.com and save our pic 
      .then(response => {
          console.log('response is: ', response);
          // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
          this.setState({ imageUrl: response.secure_url }); //This is the url we got back from cloudinary
        })
        .catch(err => {
          console.log("Error while uploading the file: ", err);
        });
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
                  <label for="lot">Lot size</label>
                  <input onChange={this.handleChange} type="number" className="signup-form-input" name="lot"  step="0.01" min="0" max="100" required />
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
                  <label for="lot">Description</label>
                  <textarea onChange={this.handleChange} type="text" className="signup-form-input" name="description" />
              </div>
              {/* <div className="signup-form-group">
                  <label for="screenshot">Screenshot</label>
                  <input onChange={(e) => this.handleFileUpload(e)} type="file" className="signup-form-input-file" name="screenshot" />
              </div> */}
              <button type="submit" className="signup-form-btn">Post Trade</button>
          </form>
        </div>
      </div>
    )
  }
}
