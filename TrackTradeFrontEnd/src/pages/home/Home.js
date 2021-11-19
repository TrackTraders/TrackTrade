import React, { Component } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import ShowTraders from "./AllTraders";
import ShowIdeas from "../browse/AllIdeas";
import ShowTrades from "./AllTrades";

export default class Home extends Component {
    state = {
        display: "ideas",
    };
    displayStuff = () => {
        if (this.state.display) {
            if (this.state.display === "traders") {
                return <ShowTraders />;
            } else if (this.state.display === "ideas") {
                return <ShowIdeas />;
            } else if (this.state.display === "trades") {
                return <ShowTrades />;
            }
        } else {
            return <ShowIdeas />;
        }
    };
    render() {
        return (
            <div>
                <div className="home">
                    <div className="home-nav">
                        <ul className="home-nav__links">
                            <li
                                className={
                                    this.state.display === "ideas"
                                        ? "home-nav__links-text-active"
                                        : "home-nav__links-text"
                                }
                                onClick={() =>
                                    this.setState({ display: "ideas" })
                                }
                            >
                                All Ideas
                            </li>
                            <li
                                className={
                                    this.state.display === "trades"
                                        ? "home-nav__links-text-active"
                                        : "home-nav__links-text"
                                }
                                onClick={() =>
                                    this.setState({ display: "trades" })
                                }
                            >
                                All Trades
                            </li>
                            <li
                                className={
                                    this.state.display === "traders"
                                        ? "home-nav__links-text-active"
                                        : "home-nav__links-text"
                                }
                                onClick={() =>
                                    this.setState({ display: "traders" })
                                }
                            >
                                All Traders
                            </li>
                        </ul>
                    </div>
                    <div className="home-content">
                        <div className="home-content-section2">
                            {this.displayStuff()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
