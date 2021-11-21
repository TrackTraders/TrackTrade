import React, { Component, Fragment, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import ShowIdeas from "./ShowIdeas";
import ShowTrades from "./ShowTrades";
import ShowStats from "./ShowStats";

//redux imports
import { connect } from "react-redux";
import { findOtherProfile } from "../../actions";
import { addConnection, removeConnection } from "../../actions/connections.js";
import { fetchAllMessages, sendMessage } from "../../actions/messages.js";
import { checkLogin } from "../../actions/auth.js";
import { useAsyncEffect } from "hooks/use-async-effect";

const OtherProfile = (props) => {
    const input = React.createRef();
    const [display, setDisplay] = useState("ideas");
    const [connected, setConnected] = useState(false);
    const [actualMessages, setActualMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");

    useAsyncEffect(async () => {
        await props.findOtherProfile({
            username: props.match.params.otheruser,
        });

        await props.fetchAllMessages();

        await props.checkLogin();
        if (props.otherProfile) {
            if (props.match.params.otheruser !== props.username) {
                if (props.otherProfile.userdata[0] && props.actualUser.data) {
                    if (
                        props.actualUser.data.connections.includes(
                            props.otherProfile.userdata[0]._id
                        )
                    ) {
                        setConnected(true);
                    } else {
                        setConnected(false);
                    }
                    // console.log(connected)
                } else {
                    setConnected(false);
                }
            }
        }

        if (props.allMessages) {
            let actualMessages = props.allMessages.data.filter(
                (eachMessage) => {
                    return (
                        eachMessage.sender === props.actualUser.data._id ||
                        eachMessage.receiver === props.actualUser.data._id
                    );
                }
            );
            setActualMessages(actualMessages);
        }
    }, []);

    const displayStuff = () => {
        if (display) {
            if (display === "ideas") {
                return <ShowIdeas inUserProfile={false} />;
            } else if (display === "trades") {
                return <ShowTrades otherProfile={true} />;
            } else if (display === "stats") {
                return <ShowStats otherProfile={true} />;
            }
        } else {
            return <ShowIdeas otherProfile={true} />;
        }
    };

    const imageLoad = () => {
        // console.log(props.avatar)
        return props.otherProfile.userdata[0].avatar ? (
            <img
                className="profile-nav__user-avatar__image"
                src={props.otherProfile.userdata[0].avatar}
                alt="Avatar"
            />
        ) : (
            <div className="profile-nav__user-avatar__image-default"></div>
        );
    };

    const connectUser = async (userID) => {
        console.log(userID);
        try {
            await props.addConnection({ userID });
            // window.location.reload()
            setConnected(true);
        } catch (err) {
            console.log(err);
        }
    };

    const disconnectUser = async (userID) => {
        console.log(userID);
        try {
            await props.removeConnection({ userID });
            // window.location.reload()
            setConnected(false);
        } catch (err) {
            console.log(err);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        input.current.value = "";
        try {
            await props.sendMessage({
                message: currentMessage,
                otherProfile: props.otherProfile.userdata[0]._id,
            });
            await props.fetchAllMessages();
        } catch (err) {
            console.log(err);
        }
        if (props.actualUser.data) {
            let newMessages = props.allMessages.data.filter((eachMessage) => {
                return (
                    eachMessage.sender === props.actualUser.data._id ||
                    eachMessage.receiver === props.actualUser.data._id
                );
            });
            setActualMessages(newMessages);
        }
    };

    const showMessages = () => {
        if (props.allMessages && props.actualUser) {
            return (
                <div className="chatbox" id="chatbox">
                    <div className="chatbox__content" id="content">
                        <div className="chatbox__top">
                            <div className="chatbox__top-avatar profile-nav__user-avatar">
                                {imageLoad()}
                                <div className="profile-nav__user-avatar__image-default"></div>
                            </div>
                            <h1 className="profile-nav__user-username">
                                {props.otherProfile.userdata[0].username}
                            </h1>
                        </div>
                        <div className="chatbox__middle">
                            <div className="chatbox__middle-content">
                                <a href="#main" className="chatbox__close">
                                    &times;
                                </a>

                                {props.allMessages.data.map((eachMessage) => {
                                    if (
                                        eachMessage.sender ===
                                            props.actualUser.data._id &&
                                        eachMessage.receiver ===
                                            props.otherProfile.userdata[0]._id
                                    ) {
                                        return (
                                            <div className="chatbox__middle-bubble chatbox__middle-bubble-sender">
                                                {eachMessage.content}
                                            </div>
                                        );
                                    } else if (
                                        eachMessage.receiver ===
                                            props.actualUser.data._id &&
                                        eachMessage.sender ===
                                            props.otherProfile.userdata[0]._id
                                    ) {
                                        return (
                                            <div className="chatbox__middle-bubble chatbox__middle-bubble-receiver">
                                                {eachMessage.content}
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                        <div className="chatbox__bottom">
                            <form
                                onSubmit={sendMessage}
                                className="chatbox__bottom-form"
                            >
                                <textarea
                                    onChange={(e) =>
                                        setCurrentMessage(e.target.value)
                                    }
                                    ref={input}
                                    type="text"
                                    name="message"
                                    className="chatbox__bottom-form-message"
                                    placeholder="Type your message"
                                    required
                                />
                                <button
                                    className="chatbox__bottom-form-submit"
                                    type="submit"
                                >
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
    };

    console.log(props, "props");
    if (props.actualUser) {
        if (props.match.params.otheruser !== props.actualUser.data.username) {
            return (
                props.otherProfile && (
                    <div>
                        <Header {...props} loggedIn={true} />
                        <div className="profile">
                            <div className="profile-nav">
                                <div className="profile-nav__user">
                                    <div className="profile-nav__user-avatar">
                                        {imageLoad()}
                                        <div className="profile-nav__user-avatar__image-default"></div>
                                    </div>
                                    <h1 className="profile-nav__user-username">
                                        {
                                            props.otherProfile.userdata[0]
                                                .username
                                        }
                                    </h1>
                                    <div className="profile-nav__links-other">
                                        {connected ? (
                                            <div
                                                onClick={() =>
                                                    disconnectUser(
                                                        props.otherProfile
                                                            .userdata[0]._id
                                                    )
                                                }
                                                className="profile-nav__links-text-profile"
                                            >
                                                Disconnect
                                            </div>
                                        ) : (
                                            <div
                                                onClick={() =>
                                                    connectUser(
                                                        props.otherProfile
                                                            .userdata[0]._id
                                                    )
                                                }
                                                className="profile-nav__links-text-profile"
                                            >
                                                Connect
                                            </div>
                                        )}

                                        <a
                                            href="#chatbox"
                                            className="profile-nav__links-text-profile"
                                        >
                                            Message
                                        </a>
                                    </div>
                                </div>
                                <ul className="profile-nav__links">
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
                                    </div>
                                </ul>
                            </div>
                            <div className="profile-content">
                                {displayStuff()}
                                {showMessages()}
                            </div>
                        </div>
                    </div>
                )
            );
        } else {
            return <Navigate to="/profile" />;
        }
    } else {
        return null;
    }
};

const mapStateToProps = (state) => {
    console.log("state", state);
    return {
        otherProfile: state.otherProfile,
        allMessages: state.allMessages,
        actualUser: state.checkLogin,
    };
};

export default connect(mapStateToProps, {
    findOtherProfile,
    fetchAllMessages,
    sendMessage,
    addConnection,
    removeConnection,
    checkLogin,
})(OtherProfile);
