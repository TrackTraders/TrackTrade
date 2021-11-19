import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";
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

// redux imports
import { connect } from "react-redux";
import { fetchAllTradeIdeas } from "../../actions";
import TradeIdeaCard from "components/TradeIdeaCard";
import Search from "components/Search";
import Flex from "components/Flex";

import SelectInput from "components/SelectInput";
import Toolbar from "components/Toolbar";
import { Typography } from "@mui/material";
import HeaderText from "components/HeaderText";

class AllIdeas extends Component {
    state = {};

    async componentDidMount() {
        await this.props.fetchAllTradeIdeas();
        this.setState({ tradeIdeas: this.props.actualTrades.data.reverse() });
        console.log("-----", this.props);
    }

    formatTime = (time) => {
        return String(new Date(time)).substring(0, 24);
    };

    searchTradeIdeas = (e) => {
        let tradersList = [...this.state.allTradeIdeas];
        let filteredTradeIdeas = tradersList.filter((eachTradeIdea) => {
            return eachTradeIdea.trade.currency
                .split("/")
                .join("")
                .toLowerCase()
                .includes(e.target.value.split("/").join("").toLowerCase());
        });
        console.log(filteredTradeIdeas);
        if (filteredTradeIdeas) {
            this.setState({
                tradeIdeas: filteredTradeIdeas,
            });
        }
    };

    sortTradeIdeas = (e) => {
        let tradeIdeasList = [...this.props.actualTrades.data];
        if (e.target.value === "") {
            this.setState({ tradeIdeas: this.props.actualTrades.data });
        } else if (e.target.value === "sell") {
            let filteredTradeIdeas = tradeIdeasList.filter((eachTradeIdea) => {
                return eachTradeIdea.trade.kind === "sell";
            });
            this.setState({ tradeIdeas: filteredTradeIdeas });
        } else if (e.target.value === "buy") {
            let filteredTradeIdeas = tradeIdeasList.filter((eachTradeIdea) => {
                return eachTradeIdea.trade.kind === "buy";
            });
            this.setState({ tradeIdeas: filteredTradeIdeas });
        } else if (e.target.value === "newest") {
            tradeIdeasList.sort((b, a) => {
                // console.log(a.created_at, "-----", b.created_at)
                return a.created_at.localeCompare(b.created_at);
            });
            this.setState({ tradeIdeas: tradeIdeasList });
        } else if (e.target.value === "oldest") {
            tradeIdeasList.sort((a, b) => {
                // console.log(a.created_at, "-----", b.created_at)
                return a.created_at.localeCompare(b.created_at);
            });
            this.setState({ tradeIdeas: tradeIdeasList });
        }
    };

    showIdeas = () => {
        if (this.state.tradeIdeas) {
            return this.state.tradeIdeas.map((eachTrade) => {
                return <TradeIdeaCard tradeIdea={eachTrade} />;
            });
        } else {
            return null;
        }
    };

    render() {
        return (
            <Fragment>
                <HeaderText value="All Ideas" />
                <Toolbar
                    onSearch={this.searchTradeIdeas}
                    searchPlaceholder={
                        "Search for trade ideas by their symbol..."
                    }
                    onSort={this.sortTradeIdeas}
                    sortOptions={[
                        { text: "Newest", value: "newest" },
                        { text: "Oldest", value: "oldest" },
                        { text: "Sells", value: "sell" },
                        { text: "Buys", value: "buy" },
                    ]}
                    onButton={() => null}
                    buttonText="Post Idea"
                />
                <div className="trade-ideas">
                    {this.showIdeas()}
                    {/* {this.exitPopup()} */}

                    {this.state.eachTrade ? (
                        <div class="popup" id="popup">
                            <div class="popup__content" id="content">
                                <div class="popup__right">
                                    <a href="#main" class="popup__close">
                                        &times;
                                    </a>
                                    <h2 class="heading-secondary u-margin-bottom-small">
                                        {this.state.eachTrade.trade.currency}{" "}
                                        {this.state.eachTrade.trade.kind}
                                    </h2>

                                    <h2 class="heading-secondary u-margin-bottom-small">
                                        Entry:{" "}
                                        {this.state.eachTrade.trade.entry}
                                    </h2>
                                    <h2 class="heading-secondary u-margin-bottom-small">
                                        Stoploss:{" "}
                                        {this.state.eachTrade.trade.stoploss}
                                    </h2>
                                    <h2 class="heading-secondary u-margin-bottom-small">
                                        Takeprofit:{" "}
                                        {this.state.eachTrade.trade.takeprofit}
                                    </h2>

                                    <h2 class="heading-secondary u-margin-bottom-small">
                                        {this.state.eachTrade.trade
                                            .description ? (
                                            <p class="popup__text">
                                                {
                                                    this.state.eachTrade.trade
                                                        .description
                                                }
                                            </p>
                                        ) : (
                                            <p class="popup__text">
                                                No description provided
                                            </p>
                                        )}
                                    </h2>
                                    <p class="popup__text">
                                        Created by:
                                        <Link
                                            to={`/profile/${this.state.eachTrade.trade.trader}`}
                                        >
                                            {this.state.eachTrade.trade.trader}
                                        </Link>
                                    </p>

                                    <div className="popup_right-sharing-icons">
                                        <FacebookShareButton
                                            url={`https://www.tracktrade.co/profile/${this.state.eachTrade.trade.trader}`}
                                            title={`${
                                                this.state.eachTrade.trade
                                                    .trader
                                            }'s TRADE IDEA:\n${
                                                this.state.eachTrade.trade
                                                    .currency
                                            } ${
                                                this.state.eachTrade.trade.kind
                                            }\nEntry: ${
                                                this.state.eachTrade.trade.entry
                                            }\nStoploss: ${
                                                this.state.eachTrade.trade
                                                    .stoploss
                                            }\nTakeprofit: ${
                                                this.state.eachTrade.trade
                                                    .takeprofit
                                            }\n${
                                                this.state.eachTrade.trade
                                                    .description
                                                    ? `Description: ${this.state.eachTrade.trade.description}\n`
                                                    : ""
                                            }`}
                                            className="popup_right-sharing-icons-button"
                                        >
                                            <FacebookIcon size={32} round />
                                        </FacebookShareButton>
                                        <TwitterShareButton
                                            url={`https://www.tracktrade.co/profile/${this.state.eachTrade.trade.trader}`}
                                            title={`${
                                                this.state.eachTrade.trade
                                                    .trader
                                            }'s TRADE IDEA:\n${
                                                this.state.eachTrade.trade
                                                    .currency
                                            } ${
                                                this.state.eachTrade.trade.kind
                                            }\nEntry: ${
                                                this.state.eachTrade.trade.entry
                                            }\nStoploss: ${
                                                this.state.eachTrade.trade
                                                    .stoploss
                                            }\nTakeprofit: ${
                                                this.state.eachTrade.trade
                                                    .takeprofit
                                            }\n${
                                                this.state.eachTrade.trade
                                                    .description
                                                    ? `Description: ${this.state.eachTrade.trade.description}\n`
                                                    : ""
                                            }`}
                                            className="popup_right-sharing-icons-button"
                                        >
                                            <TwitterIcon size={32} round />
                                        </TwitterShareButton>
                                        <TelegramShareButton
                                            url={`https://www.tracktrade.co/profile/${this.state.eachTrade.trade.trader}`}
                                            title={`${
                                                this.state.eachTrade.trade
                                                    .trader
                                            }'s TRADE IDEA:\n${
                                                this.state.eachTrade.trade
                                                    .currency
                                            } ${
                                                this.state.eachTrade.trade.kind
                                            }\nEntry: ${
                                                this.state.eachTrade.trade.entry
                                            }\nStoploss: ${
                                                this.state.eachTrade.trade
                                                    .stoploss
                                            }\nTakeprofit: ${
                                                this.state.eachTrade.trade
                                                    .takeprofit
                                            }\n${
                                                this.state.eachTrade.trade
                                                    .description
                                                    ? `Description: ${this.state.eachTrade.trade.description}\n`
                                                    : ""
                                            }`}
                                            className="popup_right-sharing-icons-button"
                                        >
                                            <TelegramIcon size={32} round />
                                        </TelegramShareButton>
                                        <WhatsappShareButton
                                            url={`https://www.tracktrade.co/profile/${this.state.eachTrade.trade.trader}`}
                                            title={`${
                                                this.state.eachTrade.trade
                                                    .trader
                                            }'s TRADE IDEA:\n${
                                                this.state.eachTrade.trade
                                                    .currency
                                            } ${
                                                this.state.eachTrade.trade.kind
                                            }\nEntry: ${
                                                this.state.eachTrade.trade.entry
                                            }\nStoploss: ${
                                                this.state.eachTrade.trade
                                                    .stoploss
                                            }\nTakeprofit: ${
                                                this.state.eachTrade.trade
                                                    .takeprofit
                                            }\n${
                                                this.state.eachTrade.trade
                                                    .description
                                                    ? `Description: ${this.state.eachTrade.trade.description}\n`
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
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("state", state);
    return { actualTrades: state.allTradeIdeas };
};

export default connect(mapStateToProps, { fetchAllTradeIdeas })(AllIdeas);
