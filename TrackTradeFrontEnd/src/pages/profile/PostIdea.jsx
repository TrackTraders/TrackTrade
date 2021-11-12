import React, { Component } from "react";
import Header from "../partials/Header";

import { Form, Field } from "react-final-form";

// redux imports
import { connect } from "react-redux";
import { postIdea, ideaImageUpload } from "../../actions";
import { SYMBOLS } from "enums/symbols";
import MainButton from "components/MainButton";

class PostIdea extends Component {
    state = {};

    handleFileUpload = async (e) => {
        console.log("The file to be uploaded is: ", e.target.files[0]);

        const uploadData = new FormData();
        await uploadData.append("imageUrl", e.target.files[0]);

        try {
            await this.props.ideaImageUpload(uploadData);
            this.setState({ imageUrl: this.props.imageUrl.secure_url });
        } catch (err) {
            console.log("*****", err.message);
        }
    };

    handleTheSubmit = async (values) => {
        await this.setState(values);

        try {
            await this.props.postIdea(this.state);

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
                    <Form
                        onSubmit={this.handleTheSubmit}
                        render={({
                            handleSubmit,
                            form,
                            submitting,
                            pristine,
                            values,
                        }) => (
                            <form
                                className="trade-idea-container-form"
                                onSubmit={handleSubmit}
                            >
                                <div className="trade-idea-top">
                                    <div className="trade-idea-left">
                                        <div className="trade-idea-container-form-group">
                                            <label htmlFor="currency">
                                                Currency
                                            </label>
                                            <Field
                                                className="trade-idea-container-form-input"
                                                required
                                                name="currency"
                                                component="select"
                                            >
                                                <option></option>
                                                {SYMBOLS.map((each) => {
                                                    return (
                                                        <option>{each}</option>
                                                    );
                                                })}
                                            </Field>
                                        </div>
                                        <div className="trade-idea-container-form-group">
                                            <label htmlFor="kind">
                                                Sell or Buy
                                            </label>
                                            <Field
                                                name="kind"
                                                className="trade-idea-container-form-input"
                                                component="select"
                                            >
                                                <option value=""></option>
                                                <option value="sell">
                                                    Sell
                                                </option>
                                                <option value="buy">Buy</option>
                                            </Field>
                                        </div>
                                        <div className="trade-idea-container-form-group">
                                            <label htmlFor="lot">
                                                Lot size
                                            </label>
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
                                            <label htmlFor="entry">
                                                Entry price
                                            </label>
                                            <Field
                                                name="entry"
                                                type="number"
                                                className="trade-idea-container-form-input"
                                                component="input"
                                            />
                                        </div>
                                        <div className="trade-idea-container-form-group">
                                            <label htmlFor="stoploss">
                                                Stop Loss
                                            </label>
                                            <Field
                                                name="stoploss"
                                                type="number"
                                                className="trade-idea-container-form-input"
                                                component="input"
                                            />
                                        </div>
                                        <div className="trade-idea-container-form-group">
                                            <label htmlFor="takeprofit">
                                                Take Profit
                                            </label>
                                            <Field
                                                name="takeprofit"
                                                type="number"
                                                className="trade-idea-container-form-input"
                                                component="input"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="trade-idea-container-form-group">
                                    <label htmlFor="description">
                                        Description
                                    </label>
                                    <Field
                                        name="description"
                                        className="trade-idea-container-form-description"
                                        component="textarea"
                                    />
                                </div>
                                <div className="trade-idea-container-form-group">
                                    <label htmlFor="screenshot">
                                        Screenshot
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            this.handleFileUpload(e)
                                        }
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
                                                this.state.imageUrl.lastIndexOf(
                                                    "/"
                                                ) + 1,
                                                -4
                                            )}
                                        </p>
                                    ) : null}
                                </div>

                                <MainButton type="submit">
                                    Post Trade Idea
                                </MainButton>
                            </form>
                        )}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { postIdea: state.postIdea, imageUrl: state.ideaImageUpload };
};

export default connect(mapStateToProps, { postIdea, ideaImageUpload })(
    PostIdea
);
