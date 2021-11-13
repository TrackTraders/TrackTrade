import React, { Component } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import LotSizeCalc from "./LotSizeCalc";
import News from "./News";
import PriceAlert from "./PriceAlert";
import Resources from "./Resources";

export default class Tools extends Component {
    state = {
        display: "lotSizeCalc",
    };

    displayStuff = () => {
        if (this.state.display) {
            if (this.state.display === "lotSizeCalc") {
                return <LotSizeCalc />;
            } else if (this.state.display === "news") {
                return <News />;
            } else if (this.state.display === "priceAlert") {
                return <PriceAlert />;
            } else if (this.state.display === "resources") {
                return <Resources />;
            }
        } else {
            return <LotSizeCalc />;
        }
    };

    render() {
        return (
            <div>
                <Header {...this.props} where={"Tools"} loggedIn={true} />
                <div className="profile" style={{ paddingTop: "120px" }}>
                    <div className="tools-nav">
                        <ul className="profile-nav__links">
                            <li
                                className={
                                    this.state.display === "lotSizeCalc"
                                        ? "profile-nav__links-text-active"
                                        : "profile-nav__links-text"
                                }
                                onClick={() =>
                                    this.setState({ display: "lotSizeCalc" })
                                }
                            >
                                Lot Size Calculator
                            </li>
                            <li
                                className={
                                    this.state.display === "news"
                                        ? "profile-nav__links-text-active"
                                        : "profile-nav__links-text"
                                }
                                onClick={() =>
                                    this.setState({ display: "news" })
                                }
                            >
                                News Alert
                            </li>
                            <li
                                className={
                                    this.state.display === "priceAlert"
                                        ? "profile-nav__links-text-active"
                                        : "profile-nav__links-text"
                                }
                                onClick={() =>
                                    this.setState({ display: "priceAlert" })
                                }
                            >
                                Price Alert
                            </li>
                            <li
                                className={
                                    this.state.display === "resources"
                                        ? "profile-nav__links-text-active"
                                        : "profile-nav__links-text"
                                }
                                onClick={() =>
                                    this.setState({ display: "resources" })
                                }
                            >
                                Resources
                            </li>
                        </ul>
                    </div>
                    <div className="profile-content">{this.displayStuff()}</div>
                </div>
            </div>
        );
    }
}
