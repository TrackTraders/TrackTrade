import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

//redux imports
import { connect } from "react-redux";
import { fetchAllTrades, fetchAllTraders } from "../../actions";
import HeaderText from "components/HeaderText";
import Toolbar from "components/Toolbar";
import { Paper } from "@mui/material";

class AllTraders extends Component {
    state = {};

    async componentDidMount() {
        await this.props.fetchAllTraders();
        await this.props.fetchAllTrades();

        this.setState({ traders: this.props.allTraders.data });
        this.setState({ actualTrades: this.props.actualTrades.data });
    }

    formatTime = (time) => String(new Date(time)).substring(0, 24);

    winLossRatio = (user) => {
        if (this.props.actualTrades.data) {
            let wins = 0;
            let losses = 0;

            let copyTrades = [...this.props.actualTrades.data];
            let userTrades = copyTrades.filter((eachTrade) => {
                return eachTrade.trade.trader === user;
            });
            // console.log(userTrades)
            userTrades.forEach((eachOne) => {
                eachOne.trade.money > 0 ? wins++ : losses++;
            });
            let percent = Math.ceil((wins / (wins + losses)) * 100);
            // console.log(wins, "--=-=-=-==--=-=-", losses)

            if (percent) {
                // this.setState({traders.: {wlr: percent}})
                this.state.traders.map((eachTrader) => {
                    if (eachTrader.username === user) {
                        eachTrader["wlr"] = percent;
                    }
                });
                return percent.toString() + "%";
            } else return null;
        }
    };

    totalTrades = (user) => {
        if (this.props.actualTrades.data) {
            let copyTrades = [...this.props.actualTrades.data];
            let userTrades = copyTrades.filter((eachTrade) => {
                return eachTrade.trade.trader === user;
            });
            if (userTrades.length > 0) {
                this.state.traders.map((eachTrader) => {
                    if (eachTrader.username === user) {
                        eachTrader["totalTrades"] = userTrades.length;
                    }
                });
                return userTrades.length;
            }
        }
    };

    searchTraders = (e) => {
        let tradersList = [...this.props.allTraders.data];
        let filteredTraders = tradersList.filter((eachTrader) => {
            return eachTrader.username
                .toLowerCase()
                .includes(e.target.value.toLowerCase());
        });
        console.log(filteredTraders);
        if (filteredTraders) {
            this.setState({
                traders: filteredTraders,
            });
        }
    };

    sortTraders = (e) => {
        console.log(e.target.value);
        if (e.target.value === "") {
            this.setState({ traders: this.props.allTraders.data });
        } else if (e.target.value === "wlr-best") {
            let tradersList = [...this.props.allTraders.data];
            tradersList.sort((b, a) => {
                return a.wlr - b.wlr;
            });
            this.setState({ traders: tradersList });
        } else if (e.target.value === "wlr-worst") {
            let tradersList = [...this.props.allTraders.data];
            tradersList.sort((a, b) => {
                return a.wlr - b.wlr;
            });
            this.setState({ traders: tradersList });
        } else if (e.target.value === "total-most") {
            let tradersList = [...this.props.allTraders.data];
            tradersList.sort((b, a) => {
                return a.totalTrades - b.totalTrades;
            });
            this.setState({ traders: tradersList });
        } else if (e.target.value === "total-least") {
            let tradersList = [...this.props.allTraders.data];
            tradersList.sort((a, b) => {
                return a.totalTrades - b.totalTrades;
            });
            this.setState({ traders: tradersList });
        } else if (e.target.value === "joined-newest") {
            let tradersList = [...this.props.allTraders.data];
            tradersList.sort((b, a) => {
                // console.log(a.created_at, "-----", b.created_at)
                return a.created_at.localeCompare(b.created_at);
            });
            this.setState({ traders: tradersList });
        } else if (e.target.value === "joined-oldest") {
            let tradersList = [...this.props.allTraders.data];
            tradersList.sort((a, b) => {
                // console.log(a.created_at, "-----", b.created_at)
                return a.created_at.localeCompare(b.created_at);
            });
            this.setState({ traders: tradersList });
        }
    };

    showTraders = () => {
        if (this.state.traders) {
            // console.log(this.state.traders)
            return this.state.traders.map((eachTrader) => {
                return (
                    <Link
                        className="home-card"
                        to={`/profile/${eachTrader.username}`}
                    >
                        <Paper elevation={4} className="trade-ideas-card">
                            <div className="trade-ideas-card-more">
                                visit profile
                            </div>

                            <div className="trade-ideas-card-link">
                                <div className="trade-ideas-card__item">
                                    <div className="trade-ideas-card__item-title-home">
                                        <div>
                                            {eachTrader.avatar ? (
                                                <img
                                                    className="trade-ideas-card__item__image"
                                                    src={eachTrader.avatar}
                                                    alt="avatar"
                                                />
                                            ) : (
                                                <div className="trade-ideas-card__item__image-default"></div>
                                            )}
                                        </div>
                                        <div className="trade-ideas-card__item-title-home-text">
                                            {eachTrader.username}
                                        </div>
                                    </div>
                                </div>
                                {eachTrader.created_at && (
                                    <div className="trade-ideas-card__item">
                                        <div className="trade-ideas-card__item-title">
                                            User since:
                                        </div>
                                        <div className="trade-ideas-card__item-content">
                                            {this.formatTime(
                                                eachTrader.created_at
                                            )}
                                        </div>
                                    </div>
                                )}
                                {this.winLossRatio(eachTrader.username) && (
                                    <div className="trade-ideas-card__item">
                                        <div className="trade-ideas-card__item-title">
                                            Win Loss Ratio:
                                        </div>
                                        <div className="trade-ideas-card__item-content">
                                            {this.winLossRatio(
                                                eachTrader.username
                                            )}
                                        </div>
                                    </div>
                                )}
                                {this.totalTrades(eachTrader.username) ? (
                                    <div className="trade-ideas-card__item">
                                        <div className="trade-ideas-card__item-title">
                                            Total Trades:
                                        </div>
                                        <div className="trade-ideas-card__item-content">
                                            {this.totalTrades(
                                                eachTrader.username
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="trade-ideas-card__item">
                                        <div className="trade-ideas-card__item-title">
                                            This user has no trades posted
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Paper>
                    </Link>
                );
            });
        } else {
            return null;
        }
    };

    render() {
        return (
            <Fragment>
                <HeaderText value="All Traders" />
                <Toolbar
                    onSearch={this.searchTraders}
                    searchPlaceholder={
                        "Search for traders by their username..."
                    }
                    onSort={this.sortTraders}
                    sortOptions={[
                        { text: "Win Loss Ratio: best", value: "wlr-best" },
                        { text: "Win Loss Ratio: worst", value: "wlr-worst" },
                        { text: "Total Trades: most", value: "total-most" },
                        { text: "Total Trades: least", value: "total-least" },
                        { text: "Joined: newest", value: "joined-newest" },
                        { text: "Joined: oldest", value: "joined-oldest" },
                    ]}
                />
                <div className="trade-ideas">{this.showTraders()}</div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return { allTraders: state.allTraders, actualTrades: state.allTrades };
};

export default connect(mapStateToProps, { fetchAllTrades, fetchAllTraders })(
    AllTraders
);
