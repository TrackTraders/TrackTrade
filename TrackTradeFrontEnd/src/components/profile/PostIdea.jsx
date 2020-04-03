import React, { Component } from "react";
import Header from "../partials/Header";
// import Footer from '../partials/Footer'
import actions from "../../services/index";

export default class PostTrade extends Component {
  state = {};

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleFileUpload = async e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    await uploadData.append("imageUrl", e.target.files[0]);

    try {
      const result = await actions.handleIdeaUpload(uploadData);
      console.log("result: ", result);
      this.setState({ imageUrl: result.secure_url });
    } catch (err) {
      console.log("*****", err.message);
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    //console.log(e)
    try {
      await actions.postIdea(this.state);

      this.props.history.push("/profile");
    } catch (err) {
      console.log("*****", err.message);
    }
  };

  render() {
    return (
      <div className="trade-idea">
        <Header {...this.props} loggedIn={true} />
        <div className="trade-idea-container">
          <form
            className="trade-idea-container-form"
            onSubmit={this.handleSubmit}
          >
            <div className="trade-idea-top">
              <div className="trade-idea-left">
                <div className="trade-idea-container-form-group">
                  <label for="currency">Currency</label>
                  <select
                    className="trade-idea-container-form-input"
                    required
                    onChange={this.handleChange}
                    name="currency"
                  >
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
                <div className="trade-idea-container-form-group">
                  <label for="type">Sell or Buy</label>
                  <select
                    className="trade-idea-container-form-input"
                    onChange={this.handleChange}
                    name="kind"
                    required
                  >
                    <option value=""></option>
                    <option value="sell">Sell</option>
                    <option value="buy">Buy</option>
                  </select>
                </div>
                <div className="trade-idea-container-form-group">
                  <label for="lot">Lot size</label>
                  <input
                    onChange={this.handleChange}
                    type="number"
                    className="trade-idea-container-form-input"
                    name="lot"
                    step="0.01"
                    min="0"
                    max="100"
                    required
                  />
                </div>
              </div>

              <div className="trade-idea-right">
                <div className="trade-idea-container-form-group">
                  <label for="entry">Entry price</label>
                  <input
                    onChange={this.handleChange}
                    type="number"
                    className="trade-idea-container-form-input"
                    name="entry"
                    step="0.0001"
                    min="0"
                    max="1000"
                    required
                  />
                </div>
                <div className="trade-idea-container-form-group">
                  <label for="close">Stop Loss</label>
                  <input
                    onChange={this.handleChange}
                    type="number"
                    className="trade-idea-container-form-input"
                    name="stoploss"
                    step="0.0001"
                    min="0"
                    max="1000"
                    required
                  />
                </div>
                <div className="trade-idea-container-form-group">
                  <label for="close">Take Profit</label>
                  <input
                    onChange={this.handleChange}
                    type="number"
                    className="trade-idea-container-form-input"
                    name="takeprofit"
                    step="0.0001"
                    min="0"
                    max="1000"
                    required
                  />
                </div>

                
              </div>
            </div>
            <div className="trade-idea-container-form-group">
              <label for="lot">Description</label>
              <textarea
                onChange={this.handleChange}
                type="text"
                className="trade-idea-container-form-description"
                name="description"
              />
            </div>
            <div className="trade-idea-container-form-group">
                  <label for="screenshot">Screenshot</label>
                  <input
                    onChange={e => this.handleFileUpload(e)}
                    type="file"
                    className="trade-idea-container-form-input-file"
                    name="screenshot"
                    id="screenshot"
                    required
                  />
                  <label tabindex="0" for="screenshot" class="trade-idea-container-form-input-file-label">Select a file...</label>
                  {this.state.imageUrl ? <p>{this.state.imageUrl.slice(this.state.imageUrl.lastIndexOf('/')+1,-4)}</p> : null}
                </div>
            <button type="submit" className="trade-idea-container-form-btn">
              Post Idea
            </button>
          </form>
        </div>
      </div>
    );
  }
}
