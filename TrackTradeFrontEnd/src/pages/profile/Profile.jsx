import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import ShowIdeas from "./ShowIdeas";
import ShowTrades from "./ShowTrades";
import ShowStats from "./ShowStats";
import Messages from "./Messages";
import Connections from "./Connections";

// redux imports
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { fetchTradeIdeas, fetchTrades, updateAvatar } from "../../actions";
import { checkLogin } from "../../actions/auth";
import { useAsyncEffect } from "hooks/use-async-effect";
import { CircularProgress } from "@mui/material";
import MainButton from "components/MainButton";

const Profile = (props) => {
    const [display, setDisplay] = useState("ideas");
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    useAsyncEffect(async () => {
        await props.checkLogin();
        await props.fetchTradeIdeas();
        await props.fetchTrades();
        setLoading(false);
    }, [props.location.pathname]);

    const displayStuff = () => {
        console.log("main props", props);
        if (display && !loading) {
            if (display === "ideas") {
                return (
                    <ShowIdeas
                        inUserProfile={true}
                        tradeIdeas={props.tradeIdeas}
                    />
                );
            } else if (display === "trades") {
                return <ShowTrades trades={props.trades} />;
            } else if (display === "stats") {
                return <ShowStats />;
            } else if (display === "messages") {
                return <Messages />;
            } else if (display === "connections") {
                return <Connections user={props.user} />;
            }
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

    const handleSubmit = async (e) => {
        const uploadData = new FormData();
        await uploadData.append("imageUrl", e.target.files[0]);

        try {
            await props.updateAvatar(uploadData);
            await props.checkLogin();
        } catch (err) {
            console.log("*****", err.message);
        }
    };

    const imageLoad = () => {
        return props.user.data.avatar ? (
            <img
                className="profile-nav__user-avatar__image"
                src={props.user.data.avatar}
                alt="Avatar"
            />
        ) : (
            <div className="profile-nav__user-avatar__image-default"></div>
        );
    };

    // changeProfileState = ()

    return (
        <div>
            <Header isProfile={true} loggedIn={true} />
            <div className="profile">
                <div className="profile-nav">
                    <div className="profile-nav__user">
                        <div className="profile-nav__user-avatar">
                            {imageLoad()}

                            <div className="profile-nav__user-avatar__change">
                                <form className="profile-nav__user-avatar__change-form">
                                    <label
                                        className="profile-nav__user-avatar__change-form--label"
                                        htmlFor="img"
                                    >
                                        Change Avatar
                                    </label>
                                    <input
                                        className="profile-nav__user-avatar__change-form--input"
                                        onChange={handleSubmit}
                                        type="file"
                                        id="img"
                                        name="img"
                                        accept="image/*"
                                    />
                                </form>
                            </div>
                        </div>
                        <h1 className="profile-nav__user-username">
                            {props.user.data.username}
                        </h1>
                    </div>
                    <ul className="profile-nav__links">
                        {display === "ideas" ? (
                            <li className="profile-nav__links-text">
                                <MainButton
                                    onClick={() => history.push("/postIdea")}
                                >
                                    Post Idea
                                </MainButton>
                            </li>
                        ) : null}
                        {display === "trades" ? (
                            <li className="profile-nav__links-text">
                                <MainButton
                                    onClick={() => history.push("/postTrade")}
                                >
                                    Post Trade
                                </MainButton>
                            </li>
                        ) : null}
                        <div className="profile-nav__links-flex">
                            <li
                                className={
                                    display === "ideas"
                                        ? "profile-nav__links-text-active"
                                        : "profile-nav__links-text"
                                }
                                onClick={() => setDisplay("ideas")}
                            >
                                <i className="fas fa-lightbulb profile-nav__links-phone"></i>
                                <span className="profile-nav__links-desktop">
                                    Ideas
                                </span>
                            </li>

                            <li
                                className={
                                    display === "trades"
                                        ? "profile-nav__links-text-active"
                                        : "profile-nav__links-text"
                                }
                                onClick={() => setDisplay("trades")}
                            >
                                <i className="fas fa-dollar-sign profile-nav__links-phone"></i>
                                <span className="profile-nav__links-desktop">
                                    Trades
                                </span>
                            </li>

                            <li
                                className={
                                    display === "stats"
                                        ? "profile-nav__links-text-active"
                                        : "profile-nav__links-text"
                                }
                                onClick={() => setDisplay("stats")}
                            >
                                <i className="fas fa-chart-line profile-nav__links-phone"></i>
                                <span className="profile-nav__links-desktop">
                                    Stats
                                </span>
                            </li>

                            <li
                                className={
                                    display === "messages"
                                        ? "profile-nav__links-text-active"
                                        : "profile-nav__links-text"
                                }
                                onClick={() => setDisplay("messages")}
                            >
                                <i className="fas fa-comments profile-nav__links-phone"></i>
                                <span className="profile-nav__links-desktop">
                                    Messages
                                </span>
                            </li>

                            <li
                                className={
                                    display === "connections"
                                        ? "profile-nav__links-text-active"
                                        : "profile-nav__links-text"
                                }
                                onClick={() => setDisplay("connections")}
                            >
                                <i className="fas fa-users profile-nav__links-phone"></i>
                                <span className="profile-nav__links-desktop">
                                    Connections
                                </span>
                            </li>
                        </div>
                    </ul>
                </div>
                <div className="profile-content">{displayStuff()}</div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.checkLogin,
        avatar: state.updateAvatar,
        tradeIdeas: state.tradeIdeas,
        trades: state.trades,
    };
};

export default connect(mapStateToProps, {
    checkLogin,
    updateAvatar,
    fetchTradeIdeas,
    fetchTrades,
})(Profile);
