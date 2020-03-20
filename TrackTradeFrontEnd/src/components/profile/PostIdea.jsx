import React, { Component } from 'react'
import Header from '../partials/Header'
// import Footer from '../partials/Footer'
import actions from '../../services/index'

export default class PostTrade extends Component {

  state = {}

  handleChange = e => this.setState({[e.target.name]: e.target.value})

  handleFileUpload = e => {
      console.log("The file to be uploaded is: ", e.target.files[0]);

      const uploadData = new FormData();
      // imageUrl => this name has to be the same as in the model since we pass
      // req.body to .create() method when creating a new thing in '/api/things/create' POST route
      uploadData.append("imageUrl", e.target.files[0]);
      
      actions.handleIdeaUpload(uploadData) //This is where we will go cloudinary.com and save our pic 
      .then(response => {
          console.log('response is: ', response);
          // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
          this.setState({ imageUrl: response.secure_url }); //This is the url we got back from cloudinary
        })
        .catch(err => {
          console.log("Error while uploading the file: ", err);
        });
    }

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
      <div className="trade-idea">
        <Header {...this.props} loggedIn={true}/>
        <div className="signup-trade-idea">
          <form className="signup-trade-idea-form" onSubmit={this.handleSubmit}>

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
                  <label for="close">Stop Loss</label>
                  <input onChange={this.handleChange} type="number" className="signup-form-input" name="stoploss"  step="0.0001" min="0" max="1000" required />
              </div>
              <div className="signup-form-group">
                  <label for="close">Take Profit</label>
                  <input onChange={this.handleChange} type="number" className="signup-form-input" name="takeprofit"  step="0.0001" min="0" max="1000" required />
              </div>
              <div className="signup-form-group">
                  <label for="lot">Description</label>
                  <textarea onChange={this.handleChange} type="text" className="signup-form-input" name="description" />
              </div>
              {/* <div className="signup-form-group">
                  <label for="screenshot">Screenshot</label>
                  <input onChange={(e) => this.handleFileUpload(e)} type="file" className="signup-form-input-file" name="screenshot" required />
              </div> */}
              <button type="submit" className="signup-form-btn">Post Idea</button>
          </form>
        </div>
      </div>
    )
  }
}
