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
import { fetchAllTrades } from "../../actions";
import Toolbar from "components/Toolbar";
import HeaderText from "components/HeaderText";
import TradeCard from "components/TradeCard";

class AllTrades extends Component {
    state = {};

    async componentDidMount() {
        await this.props.fetchAllTrades();
        this.setState({ trades: this.props.allTrades.data });
    }

    formatTime = (time) => {
        return String(new Date(time)).substring(0, 24);
    };

    searchTrades = (e) => {
        let tradersList = [...this.state.allTrades];
        let filteredTrades = tradersList.filter((eachTrade) => {
            return eachTrade.trade.currency
                .split("/")
                .join("")
                .toLowerCase()
                .includes(e.target.value.split("/").join("").toLowerCase());
        });
        console.log(filteredTrades);
        if (filteredTrades) {
            this.setState({
                trades: filteredTrades,
            });
        }
    };

    sortTrades = (e) => {
        console.log(e.target.value);
        if (e.target.value === "") {
            this.setState({ trades: this.props.allTrades.data });
        } else if (e.target.value === "sell") {
            let tradesList = [...this.props.allTrades.data];
            let filteredTrades = tradesList.filter((eachTrade) => {
                return eachTrade.trade.kind === "sell";
            });
            this.setState({ trades: filteredTrades });
        } else if (e.target.value === "buy") {
            let tradesList = [...this.props.allTrades.data];
            let filteredTrades = tradesList.filter((eachTrade) => {
                return eachTrade.trade.kind === "buy";
            });
            this.setState({ trades: filteredTrades });
        } else if (e.target.value === "wins") {
            let tradesList = [...this.props.allTrades.data];
            let filteredTrades = tradesList.filter((eachTrade) => {
                return eachTrade.trade.money > 0;
            });
            this.setState({ trades: filteredTrades });
        } else if (e.target.value === "losses") {
            let tradesList = [...this.props.allTrades.data];
            let filteredTrades = tradesList.filter((eachTrade) => {
                return eachTrade.trade.money < 0;
            });
            this.setState({ trades: filteredTrades });
        } else if (e.target.value === "created-newest") {
            let tradesList = [...this.props.allTrades.data];
            tradesList.sort((b, a) => {
                // console.log(a.created_at, "-----", b.created_at)
                return a.created_at.localeCompare(b.created_at);
            });
            this.setState({ trades: tradesList });
        } else if (e.target.value === "created-oldest") {
            let tradesList = [...this.props.allTrades.data];
            tradesList.sort((a, b) => {
                // console.log(a.created_at, "-----", b.created_at)
                return a.created_at.localeCompare(b.created_at);
            });
            this.setState({ trades: tradesList });
        }
    };

    showTrades = () => {
        if (this.props.allTrades) {
            return this.state.trades
                ? this.state.trades.map((eachTrade) => {
                      return <TradeCard trade={eachTrade} />;
                  })
                : null;
        } else {
            return null;
        }
    };

    render() {
        return (
            <Fragment>
                <HeaderText value="All Trades" />
                <Toolbar
                    onSearch={this.searchTrade}
                    searchPlaceholder={"Search for trades by their symbol..."}
                    onSort={this.sortTrade}
                    sortOptions={[
                        { text: "Newest", value: "newest" },
                        { text: "Oldest", value: "oldest" },
                        { text: "Sells", value: "sell" },
                        { text: "Buys", value: "buy" },
                    ]}
                    onButton={() => null}
                    buttonText="Post Trade"
                />
                <div class="trade-ideas">
                    {this.showTrades()}
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
                                        Closed at:{" "}
                                        {this.state.eachTrade.trade.close}
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
                                            }'s TRADE:\n${
                                                this.state.eachTrade.trade
                                                    .currency
                                            } ${
                                                this.state.eachTrade.trade.kind
                                            }\nEntry: ${
                                                this.state.eachTrade.trade.entry
                                            }\nClose: ${
                                                this.state.eachTrade.trade.close
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
                                            }'s TRADE:\n${
                                                this.state.eachTrade.trade
                                                    .currency
                                            } ${
                                                this.state.eachTrade.trade.kind
                                            }\nEntry: ${
                                                this.state.eachTrade.trade.entry
                                            }\nClose: ${
                                                this.state.eachTrade.trade.close
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
                                            }'s TRADE:\n${
                                                this.state.eachTrade.trade
                                                    .currency
                                            } ${
                                                this.state.eachTrade.trade.kind
                                            }\nEntry: ${
                                                this.state.eachTrade.trade.entry
                                            }\nClose: ${
                                                this.state.eachTrade.trade.close
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
                                            }'s TRADE:\n${
                                                this.state.eachTrade.trade
                                                    .currency
                                            } ${
                                                this.state.eachTrade.trade.kind
                                            }\nEntry: ${
                                                this.state.eachTrade.trade.entry
                                            }\nClose: ${
                                                this.state.eachTrade.trade.close
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
    return { allTrades: state.allTrades };
};

export default connect(mapStateToProps, { fetchAllTrades })(AllTrades);
