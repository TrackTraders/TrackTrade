import React, { Component, useState } from "react";

import {
    FacebookShareButton,
    FacebookIcon,
    TelegramShareButton,
    TelegramIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from "react-share";

//redux imports
import { connect } from "react-redux";
import { fetchTradeIdeas, selectTradeIdea, deleteIdea } from "../../actions";
import { formatTime } from "../../utils/formatTime";
import { useAsyncEffect } from "hooks/use-async-effect";
import { useHistory } from "react-router";
import { CircularProgress } from "@mui/material";
import { SYMBOLS } from "enums/symbols";
import TradeIdeaCard from "components/TradeIdeaCard";

const ShowIdeas = (props) => {
    const [edit, setEdit] = useState(false);
    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    useAsyncEffect(async () => {
        setLoading(true);
        await props.fetchTradeIdeas();
        console.log("props 1", props);

        if (history.location.pathname.split("/").length > 2) {
            console.log("other");
            await setIdeas(props.otherProfile.tradeIdeas);
            setLoading(false);
        } else if (props.tradeIdeas?.data.length) {
            console.log("actual", props.tradeIdeas.data);
            await setIdeas(props.tradeIdeas.data);
            setLoading(false);
            console.log("ideas", ideas);
        } else {
            await setIdeas([]);
            setLoading(false);
        }
    }, []);
    console.log("props 2", props);

    const deleteCard = async (id) => {
        try {
            await props.deleteIdea({ cardId: id });
            await props.fetchTradeIdeas();
        } catch (err) {
            console.log("--=-=-=-=-=-=-=", err);
        }
    };

    const showIdeas = () => {
        if (!ideas.length) {
            return (
                <p className="profile-nodatatext">
                    No trade ideas have been posted to your account
                </p>
            );
        } else if (ideas && !loading) {
            console.log("ideas!!!", ideas);
            return ideas.map((eachTrade, index) => {
                return <TradeIdeaCard trade={eachTrade} />;
            });
        } else {
            return null;
        }
    };

    const showOtherIdeas = () => {
        if (ideas.length && !loading) {
            return ideas.map((eachTrade) => {
                return <TradeIdeaCard trade={eachTrade} />;
            });
        } else {
            return null;
        }
    };

    const handleFileUpload = async (e) => {
        //   console.log("The file to be uploaded is: ", e.target.files[0]);
        //   const uploadData = new FormData();
        //   await uploadData.append("imageUrl", e.target.files[0]);
        //   try {
        //     const result = await actions.handleIdeaUpdate(uploadData);
        //     console.log("result: ", result);
        //     console.log("state: ", editselectedTradeIdea.EachTrade);
        //     editselectedTradeIdea.EachTrade.imageUrl = result.secure_url;
        //     editselectedTradeIdea.EachTrade.tradeID = props.selectedTradeIdea.eachTrade._id;
        //     console.log("after: ", editselectedTradeIdea.EachTrade);
        //     setState({editselectedTradeIdea.EachTrade: editselectedTradeIdea.EachTrade})
        //     console.log("test: ", editselectedTradeIdea.EachTrade);
        //   } catch (err) {
        //     console.log("*****", err.message);
        //   }
    };

    const handleChange = (e) => {
        //   let editCopy = editselectedTradeIdea.EachTrade;
        //   editCopy["tradeID"] = props.selectedTradeIdea.eachTrade._id;
        //   editCopy[e.target.name] = e.target.value;
        //   console.log(editCopy);
        //   setState({ editselectedTradeIdea.EachTrade: editCopy });
        //   console.log("test2: ", editselectedTradeIdea.EachTrade);
    };

    const saveEdit = async (e) => {
        //   setState({ edit: false });
        //   // console.log(editselectedTradeIdea.EachTrade)
        //   e.preventDefault();
        //   //console.log(e)
        //   try {
        //     await actions.updateIdea(editselectedTradeIdea.EachTrade);
        //   } catch (err) {
        //     console.log("*****", err.message);
        //   }
    };

    if (props.inUserProfile && !loading) {
        return (
            <div className="trade-ideas">
                {showIdeas()}
                {props.selectedTradeIdea &&
                props.selectedTradeIdea.eachTrade ? (
                    <div className="popup" id="popup">
                        <div className="popup__content" id="content">
                            {props.selectedTradeIdea.eachTrade.trade
                                .imageUrl ? (
                                <img
                                    className="popup__left"
                                    src={
                                        props.selectedTradeIdea.eachTrade.trade
                                            .imageUrl
                                    }
                                    alt="Trade image"
                                />
                            ) : null}
                            {!edit ? (
                                <div className="popup__right">
                                    <a href="#main" className="popup__close">
                                        &times;
                                    </a>
                                    <button
                                        onClick={() => setEdit(true)}
                                        className="popup__edit"
                                    >
                                        EDIT IDEA
                                    </button>
                                    <a
                                        href="#main"
                                        onClick={() =>
                                            deleteCard(
                                                props.selectedTradeIdea
                                                    .eachTrade._id
                                            )
                                        }
                                        className="popup__delete"
                                    >
                                        DELETE IDEA
                                    </a>

                                    <h2 className="heading-secondary u-margin-bottom-small">
                                        {
                                            props.selectedTradeIdea.eachTrade
                                                .trade.currency
                                        }{" "}
                                        {
                                            props.selectedTradeIdea.eachTrade
                                                .trade.kind
                                        }
                                    </h2>

                                    <h2 className="heading-secondary u-margin-bottom-small">
                                        Entry:{" "}
                                        {
                                            props.selectedTradeIdea.eachTrade
                                                .trade.entry
                                        }
                                    </h2>
                                    <h2 className="heading-secondary u-margin-bottom-small">
                                        Stoploss:{" "}
                                        {
                                            props.selectedTradeIdea.eachTrade
                                                .trade.stoploss
                                        }
                                    </h2>
                                    <h2 className="heading-secondary u-margin-bottom-small">
                                        Takeprofit:{" "}
                                        {
                                            props.selectedTradeIdea.eachTrade
                                                .trade.takeprofit
                                        }
                                    </h2>

                                    <h2 className="heading-secondary u-margin-bottom-small">
                                        {props.selectedTradeIdea.eachTrade.trade
                                            .description ? (
                                            <p className="popup__text">
                                                {
                                                    props.selectedTradeIdea
                                                        .eachTrade.trade
                                                        .description
                                                }
                                            </p>
                                        ) : null}
                                    </h2>

                                    <div className="popup_right-sharing-icons">
                                        <FacebookShareButton
                                            url={`https://www.tracktrade.co/profile/${props.selectedTradeIdea.eachTrade.trade.trader}`}
                                            title={`MY TRADE IDEA:\n${
                                                props.selectedTradeIdea
                                                    .eachTrade.trade.currency
                                            } ${
                                                props.selectedTradeIdea
                                                    .eachTrade.trade.kind
                                            }\nEntry: ${
                                                props.selectedTradeIdea
                                                    .eachTrade.trade.entry
                                            }\nStoploss: ${
                                                props.selectedTradeIdea
                                                    .eachTrade.trade.stoploss
                                            }\nTakeprofit: ${
                                                props.selectedTradeIdea
                                                    .eachTrade.trade.takeprofit
                                            }\n${
                                                props.selectedTradeIdea
                                                    .eachTrade.trade.description
                                                    ? `Description: ${props.selectedTradeIdea.eachTrade.trade.description}\n`
                                                    : ""
                                            }`}
                                            className="popup_right-sharing-icons-button"
                                        >
                                            <FacebookIcon size={32} round />
                                        </FacebookShareButton>
                                        <TwitterShareButton
                                            url={`https://www.tracktrade.co/profile/${props.selectedTradeIdea.eachTrade.trade.trader}`}
                                            title={`MY TRADE IDEA:\n${
                                                props.selectedTradeIdea
                                                    .eachTrade.trade.currency
                                            } ${
                                                props.selectedTradeIdea
                                                    .eachTrade.trade.kind
                                            }\nEntry: ${
                                                props.selectedTradeIdea
                                                    .eachTrade.trade.entry
                                            }\nStoploss: ${
                                                props.selectedTradeIdea
                                                    .eachTrade.trade.stoploss
                                            }\nTakeprofit: ${
                                                props.selectedTradeIdea
                                                    .eachTrade.trade.takeprofit
                                            }\n${
                                                props.selectedTradeIdea
                                                    .eachTrade.trade.description
                                                    ? `Description: ${props.selectedTradeIdea.eachTrade.trade.description}\n`
                                                    : ""
                                            }`}
                                            className="popup_right-sharing-icons-button"
                                        >
                                            <TwitterIcon size={32} round />
                                        </TwitterShareButton>
                                        <TelegramShareButton
                                            url={`https://www.tracktrade.co/profile/${props.selectedTradeIdea.eachTrade.trade.trader}`}
                                            title={`MY TRADE IDEA:\n${
                                                props.selectedTradeIdea
                                                    .eachTrade.trade.currency
                                            } ${
                                                props.selectedTradeIdea
                                                    .eachTrade.trade.kind
                                            }\nEntry: ${
                                                props.selectedTradeIdea
                                                    .eachTrade.trade.entry
                                            }\nStoploss: ${
                                                props.selectedTradeIdea
                                                    .eachTrade.trade.stoploss
                                            }\nTakeprofit: ${
                                                props.selectedTradeIdea
                                                    .eachTrade.trade.takeprofit
                                            }\n${
                                                props.selectedTradeIdea
                                                    .eachTrade.trade.description
                                                    ? `Description: ${props.selectedTradeIdea.eachTrade.trade.description}\n`
                                                    : ""
                                            }`}
                                            className="popup_right-sharing-icons-button"
                                        >
                                            <TelegramIcon size={32} round />
                                        </TelegramShareButton>
                                        <WhatsappShareButton
                                            url={`https://www.tracktrade.co/profile/${props.selectedTradeIdea.eachTrade.trade.trader}`}
                                            title={`MY TRADE IDEA:\n${
                                                props.selectedTradeIdea
                                                    .eachTrade.trade.currency
                                            } ${
                                                props.selectedTradeIdea
                                                    .eachTrade.trade.kind
                                            }\nEntry: ${
                                                props.selectedTradeIdea
                                                    .eachTrade.trade.entry
                                            }\nStoploss: ${
                                                props.selectedTradeIdea
                                                    .eachTrade.trade.stoploss
                                            }\nTakeprofit: ${
                                                props.selectedTradeIdea
                                                    .eachTrade.trade.takeprofit
                                            }\n${
                                                props.selectedTradeIdea
                                                    .eachTrade.trade.description
                                                    ? `Description: ${props.selectedTradeIdea.eachTrade.trade.description}\n`
                                                    : ""
                                            }`}
                                            className="popup_right-sharing-icons-button"
                                        >
                                            <WhatsappIcon size={32} round />
                                        </WhatsappShareButton>
                                    </div>
                                </div>
                            ) : (
                                //THIS PART IS FOR THE EDITING OF IDEAS

                                <div className="popup__right">
                                    <a
                                        href="#main"
                                        className="popup__close"
                                        onClick={() => setEdit(false)}
                                    >
                                        &times;
                                    </a>

                                    <form
                                        className="popup-form"
                                        onSubmit={() => null}
                                    >
                                        <div>
                                            <button
                                                type="submit"
                                                onClick={saveEdit}
                                                className="popup__save"
                                            >
                                                SAVE
                                            </button>
                                            <div className="popup-form-group">
                                                <label for="currency">
                                                    Currency
                                                </label>
                                                <select
                                                    defaultValue={
                                                        props.selectedTradeIdea
                                                            .eachTrade.trade
                                                            .currency
                                                    }
                                                    className="popup-form-input"
                                                    required
                                                    onChange={handleChange}
                                                    name="currency"
                                                >
                                                    <option></option>
                                                    {SYMBOLS.map((each) => {
                                                        return (
                                                            <option>
                                                                {each}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                            <div className="popup-form-group">
                                                <label for="type">
                                                    Sell or Buy
                                                </label>
                                                <select
                                                    defaultValue={
                                                        props.selectedTradeIdea
                                                            .eachTrade.trade
                                                            .kind
                                                    }
                                                    className="popup-form-input"
                                                    onChange={handleChange}
                                                    name="kind"
                                                    required
                                                >
                                                    <option value=""></option>
                                                    <option value="sell">
                                                        Sell
                                                    </option>
                                                    <option value="buy">
                                                        Buy
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="popup-form-group">
                                                <label for="lot">
                                                    Lot size
                                                </label>
                                                <input
                                                    defaultValue={
                                                        props.selectedTradeIdea
                                                            .eachTrade.trade.lot
                                                    }
                                                    onChange={handleChange}
                                                    type="number"
                                                    className="popup-form-input"
                                                    name="lot"
                                                    step="0.01"
                                                    min="0"
                                                    max="100"
                                                    required
                                                />
                                            </div>

                                            <div className="popup-form-group">
                                                <label for="lot">
                                                    Description
                                                </label>
                                                <textarea
                                                    defaultValue={
                                                        props.selectedTradeIdea
                                                            .eachTrade.trade
                                                            .description
                                                    }
                                                    onChange={handleChange}
                                                    type="text"
                                                    className="popup-form-input"
                                                    name="description"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <div className="popup-form-group">
                                                <label for="entry">
                                                    Entry price
                                                </label>
                                                <input
                                                    defaultValue={
                                                        props.selectedTradeIdea
                                                            .eachTrade.trade
                                                            .entry
                                                    }
                                                    onChange={handleChange}
                                                    type="number"
                                                    className="popup-form-input"
                                                    name="entry"
                                                    step="0.0001"
                                                    min="0"
                                                    max="1000"
                                                    required
                                                />
                                            </div>
                                            <div className="popup-form-group">
                                                <label for="close">
                                                    Stop Loss
                                                </label>
                                                <input
                                                    defaultValue={
                                                        props.selectedTradeIdea
                                                            .eachTrade.trade
                                                            .stoploss
                                                    }
                                                    onChange={handleChange}
                                                    type="number"
                                                    className="popup-form-input"
                                                    name="stoploss"
                                                    step="0.0001"
                                                    min="0"
                                                    max="1000"
                                                    required
                                                />
                                            </div>
                                            <div className="popup-form-group">
                                                <label for="close">
                                                    Take Profit
                                                </label>
                                                <input
                                                    defaultValue={
                                                        props.selectedTradeIdea
                                                            .eachTrade.trade
                                                            .takeprofit
                                                    }
                                                    onChange={handleChange}
                                                    type="number"
                                                    className="popup-form-input"
                                                    name="takeprofit"
                                                    step="0.0001"
                                                    min="0"
                                                    max="1000"
                                                    required
                                                />
                                            </div>
                                            <div className="popup-form-group">
                                                <label for="screenshot">
                                                    Screenshot
                                                </label>
                                                <input
                                                    onChange={(e) =>
                                                        handleFileUpload(e)
                                                    }
                                                    type="file"
                                                    className="popup-form-input-file"
                                                    name="screenshot"
                                                    id="screenshot"
                                                    required
                                                />
                                                <label
                                                    tabindex="0"
                                                    for="screenshot"
                                                    class="popup-form-input-file-label"
                                                >
                                                    Select a file...
                                                </label>
                                                {props.imageUrl ? (
                                                    <p>
                                                        {props.imageUrl.slice(
                                                            props.imageUrl.lastIndexOf(
                                                                "/"
                                                            ) + 1,
                                                            -4
                                                        )}
                                                    </p>
                                                ) : null}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                ) : null}
            </div>
        );
    } else if (!loading) {
        return (
            <div className="trade-ideas">
                {showOtherIdeas()}
                {/* {exitPopup()} */}

                {props.selectedTradeIdea &&
                props.selectedTradeIdea.eachTrade ? (
                    <div className="popup" id="popup">
                        <div className="popup__content" id="content">
                            {props.selectedTradeIdea.eachTrade.trade
                                .imageUrl ? (
                                <img
                                    className="popup__left"
                                    src={
                                        props.selectedTradeIdea.eachTrade.trade
                                            .imageUrl
                                    }
                                    alt="Trade image"
                                />
                            ) : null}
                            <div className="popup__right">
                                <a href="#main" className="popup__close">
                                    &times;
                                </a>
                                {/* <button onClick={editIdeas} className="popup__edit">EDIT IDEA</button>
                                <a href="#main" onClick={() => deleteCard(props.selectedTradeIdea.eachTrade._id)} className="popup__delete">DELETE IDEA</a>
                                 */}
                                <h2 className="heading-secondary u-margin-bottom-small">
                                    {
                                        props.selectedTradeIdea.eachTrade.trade
                                            .currency
                                    }{" "}
                                    {
                                        props.selectedTradeIdea.eachTrade.trade
                                            .kind
                                    }
                                </h2>

                                <h2 className="heading-secondary u-margin-bottom-small">
                                    Entry:{" "}
                                    {
                                        props.selectedTradeIdea.eachTrade.trade
                                            .entry
                                    }
                                </h2>
                                <h2 className="heading-secondary u-margin-bottom-small">
                                    Stoploss:{" "}
                                    {
                                        props.selectedTradeIdea.eachTrade.trade
                                            .stoploss
                                    }
                                </h2>
                                <h2 className="heading-secondary u-margin-bottom-small">
                                    Takeprofit:{" "}
                                    {
                                        props.selectedTradeIdea.eachTrade.trade
                                            .takeprofit
                                    }
                                </h2>

                                <h2 class="heading-secondary u-margin-bottom-small">
                                    {props.selectedTradeIdea.eachTrade.trade
                                        .description ? (
                                        <p class="popup__text">
                                            Description:{" "}
                                            {
                                                props.selectedTradeIdea
                                                    .eachTrade.trade.description
                                            }
                                        </p>
                                    ) : (
                                        <p class="popup__text">
                                            No description provided
                                        </p>
                                    )}
                                </h2>

                                <div className="popup_right-sharing-icons">
                                    <FacebookShareButton
                                        url={`https://www.tracktrade.co/profile/${props.selectedTradeIdea.eachTrade.trade.trader}`}
                                        title={`${
                                            props.selectedTradeIdea.eachTrade
                                                .trade.trader
                                        }'s TRADE IDEA:\n${
                                            props.selectedTradeIdea.eachTrade
                                                .trade.currency
                                        } ${
                                            props.selectedTradeIdea.eachTrade
                                                .trade.kind
                                        }\nEntry: ${
                                            props.selectedTradeIdea.eachTrade
                                                .trade.entry
                                        }\nStoploss: ${
                                            props.selectedTradeIdea.eachTrade
                                                .trade.stoploss
                                        }\nTakeprofit: ${
                                            props.selectedTradeIdea.eachTrade
                                                .trade.takeprofit
                                        }\n${
                                            props.selectedTradeIdea.eachTrade
                                                .trade.description
                                                ? `Description: ${props.selectedTradeIdea.eachTrade.trade.description}\n`
                                                : ""
                                        }`}
                                        className="popup_right-sharing-icons-button"
                                    >
                                        <FacebookIcon size={32} round />
                                    </FacebookShareButton>
                                    <TwitterShareButton
                                        url={`https://www.tracktrade.co/profile/${props.selectedTradeIdea.eachTrade.trade.trader}`}
                                        title={`${
                                            props.selectedTradeIdea.eachTrade
                                                .trade.trader
                                        }'s TRADE IDEA:\n${
                                            props.selectedTradeIdea.eachTrade
                                                .trade.currency
                                        } ${
                                            props.selectedTradeIdea.eachTrade
                                                .trade.kind
                                        }\nEntry: ${
                                            props.selectedTradeIdea.eachTrade
                                                .trade.entry
                                        }\nStoploss: ${
                                            props.selectedTradeIdea.eachTrade
                                                .trade.stoploss
                                        }\nTakeprofit: ${
                                            props.selectedTradeIdea.eachTrade
                                                .trade.takeprofit
                                        }\n${
                                            props.selectedTradeIdea.eachTrade
                                                .trade.description
                                                ? `Description: ${props.selectedTradeIdea.eachTrade.trade.description}\n`
                                                : ""
                                        }`}
                                        className="popup_right-sharing-icons-button"
                                    >
                                        <TwitterIcon size={32} round />
                                    </TwitterShareButton>
                                    <TelegramShareButton
                                        url={`https://www.tracktrade.co/profile/${props.selectedTradeIdea.eachTrade.trade.trader}`}
                                        title={`${
                                            props.selectedTradeIdea.eachTrade
                                                .trade.trader
                                        }'s TRADE IDEA:\n${
                                            props.selectedTradeIdea.eachTrade
                                                .trade.currency
                                        } ${
                                            props.selectedTradeIdea.eachTrade
                                                .trade.kind
                                        }\nEntry: ${
                                            props.selectedTradeIdea.eachTrade
                                                .trade.entry
                                        }\nStoploss: ${
                                            props.selectedTradeIdea.eachTrade
                                                .trade.stoploss
                                        }\nTakeprofit: ${
                                            props.selectedTradeIdea.eachTrade
                                                .trade.takeprofit
                                        }\n${
                                            props.selectedTradeIdea.eachTrade
                                                .trade.description
                                                ? `Description: ${props.selectedTradeIdea.eachTrade.trade.description}\n`
                                                : ""
                                        }`}
                                        className="popup_right-sharing-icons-button"
                                    >
                                        <TelegramIcon size={32} round />
                                    </TelegramShareButton>
                                    <WhatsappShareButton
                                        url={`https://www.tracktrade.co/profile/${props.selectedTradeIdea.eachTrade.trade.trader}`}
                                        title={`${
                                            props.selectedTradeIdea.eachTrade
                                                .trade.trader
                                        }'s TRADE IDEA:\n${
                                            props.selectedTradeIdea.eachTrade
                                                .trade.currency
                                        } ${
                                            props.selectedTradeIdea.eachTrade
                                                .trade.kind
                                        }\nEntry: ${
                                            props.selectedTradeIdea.eachTrade
                                                .trade.entry
                                        }\nStoploss: ${
                                            props.selectedTradeIdea.eachTrade
                                                .trade.stoploss
                                        }\nTakeprofit: ${
                                            props.selectedTradeIdea.eachTrade
                                                .trade.takeprofit
                                        }\n${
                                            props.selectedTradeIdea.eachTrade
                                                .trade.description
                                                ? `Description: ${props.selectedTradeIdea.eachTrade.trade.description}\n`
                                                : ""
                                        }`}
                                        className="popup_right-sharing-icons-button"
                                    >
                                        <WhatsappIcon size={32} round />
                                    </WhatsappShareButton>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    } else {
        return (
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <CircularProgress size={52} />
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
        actualTrades: state.tradeIdeas,
        selectedTradeIdea: state.selectedTradeIdea,
        otherProfile: state.otherProfile,
    };
};

export default connect(mapStateToProps, {
    fetchTradeIdeas,
    selectTradeIdea,
    deleteIdea,
})(ShowIdeas);
