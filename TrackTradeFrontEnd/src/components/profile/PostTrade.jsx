import React, { Component } from "react";
import Header from "../partials/Header";

import { Form, Field } from "react-final-form";

// redux imports
import { connect } from "react-redux";
import { postTrade, tradeImageUpload } from "../../actions";

class PostTrade extends Component {
  state = {};

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleTheSubmit = async (values) => {
    await this.setState(values);

    let pips = 0;

    //sell not jpy
    if (this.state.kind === "sell" && !this.state.currency.includes("JPY")) {
      pips = Math.ceil(this.state.entry * 10000 - this.state.close * 10000);
    }
    //sell jpy
    else if (
      this.state.kind === "sell" &&
      this.state.currency.includes("JPY")
    ) {
      pips = Math.ceil(this.state.entry * 100 - this.state.close * 100);
    }
    //buy not jpy
    else if (
      this.state.kind === "buy" &&
      !this.state.currency.includes("JPY")
    ) {
      pips = Math.ceil(this.state.close * 10000 - this.state.entry * 10000);
    }
    //buy jpy
    else if (this.state.kind === "buy" && this.state.currency.includes("JPY")) {
      pips = Math.ceil(this.state.close * 100 - this.state.entry * 100);
    }

    await this.setState({ money: pips * this.state.lot * 10 });

    console.log(this.state);
    try {
      await this.props.postTrade(this.state);

      this.props.history.push("/profile");
    } catch (err) {
      console.log("*****", err.message);
    }
  };

  handleFileUpload = async (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    await uploadData.append("imageUrl", e.target.files[0]);

    try {
      await this.props.tradeImageUpload(uploadData);
      this.setState({ imageUrl: this.props.imageUrl.secure_url });
    } catch (err) {
      console.log("*****", err.message);
    }
  };

  render() {
    return (
      <div className="trade-idea">
        <Header {...this.props} loggedIn={true} />
        <div className="trade-idea-container">
          <Form
            onSubmit={this.handleTheSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form
                className="trade-idea-container-form"
                onSubmit={handleSubmit}
              >
                <div className="trade-idea-top">
                  <div className="trade-idea-left">
                    <div className="trade-idea-container-form-group">
                      <label htmlFor="currency">Currency</label>
                      <Field
                        className="trade-idea-container-form-input"
                        required
                        name="currency"
                        component="select"
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
                      </Field>
                    </div>
                    <div className="trade-idea-container-form-group">
                      <label htmlFor="kind">Sell or Buy</label>
                      <Field
                        name="kind"
                        className="trade-idea-container-form-input"
                        component="select"
                      >
                        <option value=""></option>
                        <option value="sell">Sell</option>
                        <option value="buy">Buy</option>
                      </Field>
                    </div>
                    <div className="trade-idea-container-form-group">
                      <label htmlFor="lot">Lot size</label>
                      <Field
                        name="lot"
                        type="number"
                        className="trade-idea-container-form-input"
                        component="input"
                      />
                    </div>
                  </div>
                  <div className="trade-idea-right">
                    <div className="trade-idea-container-form-group">
                      <label htmlFor="entry">Entry price</label>
                      <Field
                        name="entry"
                        type="number"
                        className="trade-idea-container-form-input"
                        component="input"
                      />
                      {/* <input
                        onChange={this.handleChange}
                        type="number"
                        className="trade-idea-container-form-input"
                        name="entry"
                        step="0.0001"
                        min="0"
                        max="1000"
                        required
                      /> */}
                    </div>
                    <div className="trade-idea-container-form-group">
                      <label htmlFor="close">Close price</label>
                      <Field
                        name="close"
                        type="number"
                        className="trade-idea-container-form-input"
                        component="input"
                      />
                      {/* <input
                        onChange={this.handleChange}
                        type="number"
                        className="trade-idea-container-form-input"
                        name="close"
                        step="0.0001"
                        min="0"
                        max="1000"
                        required
                      /> */}
                    </div>
                    <div className="trade-idea-container-form-group">
                      <label htmlFor="risk">Risk %</label>
                      <Field
                        name="risk"
                        type="number"
                        className="trade-idea-container-form-input"
                        component="input"
                      />
                      {/* <input
                        onChange={this.handleChange}
                        type="number"
                        className="trade-idea-container-form-input"
                        name="risk"
                        step="0.01"
                        min="0"
                        max="100"
                        required
                      /> */}
                    </div>
                  </div>
                </div>
                <div className="trade-idea-container-form-group">
                  <label htmlFor="description">Description</label>
                  <Field
                    name="description"
                    className="trade-idea-container-form-description"
                    component="textarea"
                  />
                  {/* <textarea
                    onChange={this.handleChange}
                    type="text"
                    className="trade-idea-container-form-description"
                    name="description"
                  /> */}
                </div>
                <div className="trade-idea-container-form-group">
                  <label htmlFor="screenshot">Screenshot</label>
                  <input
                    onChange={(e) => this.handleFileUpload(e)}
                    type="file"
                    className="trade-idea-container-form-input-file"
                    name="screenshot"
                    id="screenshot"
                    required
                  />
                  <label
                    tabindex="0"
                    htmlFor="screenshot"
                    class="trade-idea-container-form-input-file-label"
                  >
                    Select a file...
                  </label>
                  {this.state.imageUrl ? (
                    <p>
                      {this.state.imageUrl.slice(
                        this.state.imageUrl.lastIndexOf("/") + 1,
                        -4
                      )}
                    </p>
                  ) : null}
                </div>

                <button type="submit" className="trade-idea-container-form-btn">
                  Post Trade
                </button>
              </form>
            )}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { postTrade: state.postTrade, imageUrl: state.tradeImageUpload };
};

export default connect(mapStateToProps, { postTrade, tradeImageUpload })(
  PostTrade
);
