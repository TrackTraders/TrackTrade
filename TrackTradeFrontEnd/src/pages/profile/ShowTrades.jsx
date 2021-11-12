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
import { fetchTrades, selectTrade } from "../../actions";
import { formatTime } from "../../utils/formatTime";
import { useHistory } from "react-router";
import { useAsyncEffect } from "hooks/use-async-effect";
import { CircularProgress } from "@mui/material";

const ShowTrades = (props) => {
    const [edit, setEdit] = useState(false);
    const [trades, setTrades] = useState([]);
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    useAsyncEffect(async () => {
        setLoading(true);
        await props.fetchTrades();
        console.log("props 1", props);

        if (history.location.pathname.split("/").length > 2) {
            console.log("other");
            await setTrades(props.otherProfile.trades);
            setLoading(false);
        } else if (props.trades?.data.length) {
            console.log("actual", props.trades.data);
            await setTrades(props.trades.data);
            setLoading(false);
        } else {
            await setTrades([]);
            setLoading(false);
        }
    }, [history.location.pathname]);

    console.log("trades", trades);
    const showTrades = () => {
        if (trades && !loading) {
            return trades.map((eachTrade, index) => {
                return (
                    <div key={index} className="trade-ideas-card">
                        <a
                            href="#popup"
                            onClick={async () => {
                                await props.selectTrade({ eachTrade });
                            }}
                            className="trade-ideas-card-more"
                        >
                            click for more info
                        </a>
                        <a
                            href="#popup"
                            onClick={async () => {
                                await props.selectTrade({ eachTrade });
                            }}
                            className="trade-ideas-card-link"
                        >
                            {eachTrade.trade.money > 0 ? (
                                <div className="trade-ideas-card-win">
                                    ${eachTrade.trade.money.toFixed(2)}
                                </div>
                            ) : (
                                <div className="trade-ideas-card-loss">
                                    -$
                                    {Math.abs(eachTrade.trade.money).toFixed(2)}
                                </div>
                            )}

                            <div className="trade-ideas-card__item">
                                <div className="trade-ideas-card__item-title">
                                    {eachTrade.trade.currency}{" "}
                                    {eachTrade.trade.kind}
                                </div>
                            </div>
                            <div className="trade-ideas-card__item">
                                <div className="trade-ideas-card__item-title">
                                    Lot Size:
                                </div>
                                <div className="trade-ideas-card__item-content">
                                    {eachTrade.trade.lot.toFixed(2)}
                                </div>
                            </div>
                            <div className="trade-ideas-card__item">
                                <div className="trade-ideas-card__item-title">
                                    Entry:
                                </div>
                                <div className="trade-ideas-card__item-content">
                                    {eachTrade.trade.entry}
                                </div>
                            </div>
                            <div className="trade-ideas-card__item">
                                <div className="trade-ideas-card__item-title">
                                    Close:
                                </div>
                                <div className="trade-ideas-card__item-content">
                                    {eachTrade.trade.close}
                                </div>
                            </div>
                            <div className="trade-ideas-card__item">
                                <div className="trade-ideas-card__item-title">
                                    By:
                                </div>
                                <div className="trade-ideas-card__item-content">
                                    {eachTrade.trade.trader}
                                </div>
                            </div>
                            <div className="trade-ideas-card__item-date">
                                <div className="trade-ideas-card__item-date-title">
                                    Created at:
                                </div>
                                <div className="trade-ideas-card__item-date-content">
                                    {formatTime(eachTrade.created_at)}
                                </div>
                            </div>
                        </a>
                    </div>
                );
            });
        } else {
            return (
                <p className="profile-nodatatext">
                    No trades have been posted to your account
                </p>
            );
        }
    };

    const showOtherTrades = () => {
        if (trades.length && !loading) {
            return trades.map((eachTrade, index) => {
                return (
                    <div key={index} className="trade-ideas-card">
                        <a
                            href="#popup"
                            onClick={async () => {
                                await props.selectTrade({ eachTrade });
                            }}
                            className="trade-ideas-card-more"
                        >
                            click for more info
                        </a>
                        <a
                            href="#popup"
                            onClick={async () => {
                                await props.selectTrade({ eachTrade });
                            }}
                            className="trade-ideas-card-link"
                        >
                            {eachTrade.trade.money > 0 ? (
                                <div className="trade-ideas-card-win-all">
                                    WIN
                                </div>
                            ) : (
                                <div className="trade-ideas-card-loss-all">
                                    LOSS
                                </div>
                            )}

                            <div className="trade-ideas-card__item">
                                <div className="trade-ideas-card__item-title">
                                    {eachTrade.trade.currency}{" "}
                                    {eachTrade.trade.kind}
                                </div>
                            </div>

                            <div className="trade-ideas-card__item">
                                <div className="trade-ideas-card__item-title">
                                    Entry:
                                </div>
                                <div className="trade-ideas-card__item-content">
                                    {eachTrade.trade.entry}
                                </div>
                            </div>
                            <div className="trade-ideas-card__item">
                                <div className="trade-ideas-card__item-title">
                                    Close:
                                </div>
                                <div className="trade-ideas-card__item-content">
                                    {eachTrade.trade.close}
                                </div>
                            </div>
                            <div className="trade-ideas-card__item">
                                <div className="trade-ideas-card__item-title">
                                    By:
                                </div>
                                <div className="trade-ideas-card__item-content">
                                    {eachTrade.trade.trader}
                                </div>
                            </div>
                            <div className="trade-ideas-card__item-date">
                                <div className="trade-ideas-card__item-date-title">
                                    Created at:
                                </div>
                                <div className="trade-ideas-card__item-date-content">
                                    {formatTime(eachTrade.created_at)}
                                </div>
                            </div>
                        </a>
                    </div>
                );
            });
        } else {
            return null;
        }
    };

    if (!props.otherProfile && !loading) {
        return (
            <div className="trade-ideas">
                {showTrades()}
                {props.selectedTrade && props.selectedTrade.eachTrade ? (
                    <div className="popup" id="popup">
                        <div className="popup__content" id="content">
                            <div className="popup__left">
                                <img
                                    className="popup__left--image"
                                    src={
                                        props.selectedTrade.eachTrade.trade
                                            .imageUrl
                                    }
                                    alt="trade"
                                />
                            </div>
                            <div className="popup__right">
                                <a href="#main" className="popup__close">
                                    &times;
                                </a>
                                <h2 className="heading-secondary u-margin-bottom-small">
                                    {
                                        props.selectedTrade.eachTrade.trade
                                            .currency
                                    }{" "}
                                    {props.selectedTrade.eachTrade.trade.kind}
                                </h2>
                                <h2 className="heading-secondary u-margin-bottom-small">
                                    Lot size:{" "}
                                    {props.selectedTrade.eachTrade.trade.lot}
                                </h2>
                                <h2 className="heading-secondary u-margin-bottom-small">
                                    Entry:{" "}
                                    {props.selectedTrade.eachTrade.trade.entry}
                                </h2>
                                <h2 className="heading-secondary u-margin-bottom-small">
                                    Closed at:{" "}
                                    {props.selectedTrade.eachTrade.trade.close}
                                </h2>
                                {props.selectedTrade.eachTrade.trade.money >
                                0 ? (
                                    <div className="trade-ideas-card-win-popup">
                                        $
                                        {props.selectedTrade.eachTrade.trade.money.toFixed(
                                            2
                                        )}
                                    </div>
                                ) : (
                                    <div className="trade-ideas-card-loss-popup">
                                        -$
                                        {Math.abs(
                                            props.selectedTrade.eachTrade.trade
                                                .money
                                        ).toFixed(2)}
                                    </div>
                                )}

                                <h2 className="heading-secondary u-margin-bottom-small">
                                    {props.selectedTrade.eachTrade.trade
                                        .description ? (
                                        <p className="popup__text">
                                            {
                                                props.selectedTrade.eachTrade
                                                    .trade.description
                                            }
                                        </p>
                                    ) : (
                                        <p className="popup__text"></p>
                                    )}
                                </h2>

                                <div className="popup_right-sharing-icons">
                                    <FacebookShareButton
                                        url={`https://www.tracktrade.co/profile/${props.selectedTrade.eachTrade.trade.trader}`}
                                        title={`MY TRADE:\n${
                                            props.selectedTrade.eachTrade.trade
                                                .currency
                                        } ${
                                            props.selectedTrade.eachTrade.trade
                                                .kind
                                        }\nEntry: ${
                                            props.selectedTrade.eachTrade.trade
                                                .entry
                                        }\nClose: ${
                                            props.selectedTrade.eachTrade.trade
                                                .close
                                        }\n${
                                            props.selectedTrade.eachTrade.trade
                                                .description
                                                ? `Description: ${props.selectedTrade.eachTrade.trade.description}\n`
                                                : ""
                                        }`}
                                        className="popup_right-sharing-icons-button"
                                    >
                                        <FacebookIcon size={32} round />
                                    </FacebookShareButton>
                                    <TwitterShareButton
                                        url={`https://www.tracktrade.co/profile/${props.selectedTrade.eachTrade.trade.trader}`}
                                        title={`MY TRADE:\n${
                                            props.selectedTrade.eachTrade.trade
                                                .currency
                                        } ${
                                            props.selectedTrade.eachTrade.trade
                                                .kind
                                        }\nEntry: ${
                                            props.selectedTrade.eachTrade.trade
                                                .entry
                                        }\nClose: ${
                                            props.selectedTrade.eachTrade.trade
                                                .close
                                        }\n${
                                            props.selectedTrade.eachTrade.trade
                                                .description
                                                ? `Description: ${props.selectedTrade.eachTrade.trade.description}\n`
                                                : ""
                                        }`}
                                        className="popup_right-sharing-icons-button"
                                    >
                                        <TwitterIcon size={32} round />
                                    </TwitterShareButton>
                                    <TelegramShareButton
                                        url={`https://www.tracktrade.co/profile/${props.selectedTrade.eachTrade.trade.trader}`}
                                        title={`MY TRADE:\n${
                                            props.selectedTrade.eachTrade.trade
                                                .currency
                                        } ${
                                            props.selectedTrade.eachTrade.trade
                                                .kind
                                        }\nEntry: ${
                                            props.selectedTrade.eachTrade.trade
                                                .entry
                                        }\nClose: ${
                                            props.selectedTrade.eachTrade.trade
                                                .close
                                        }\n${
                                            props.selectedTrade.eachTrade.trade
                                                .description
                                                ? `Description: ${props.selectedTrade.eachTrade.trade.description}\n`
                                                : ""
                                        }`}
                                        className="popup_right-sharing-icons-button"
                                    >
                                        <TelegramIcon size={32} round />
                                    </TelegramShareButton>
                                    <WhatsappShareButton
                                        url={`https://www.tracktrade.co/profile/${props.selectedTrade.eachTrade.trade.trader}`}
                                        title={`MY TRADE:\n${
                                            props.selectedTrade.eachTrade.trade
                                                .currency
                                        } ${
                                            props.selectedTrade.eachTrade.trade
                                                .kind
                                        }\nEntry: ${
                                            props.selectedTrade.eachTrade.trade
                                                .entry
                                        }\nClose: ${
                                            props.selectedTrade.eachTrade.trade
                                                .close
                                        }\n${
                                            props.selectedTrade.eachTrade.trade
                                                .description
                                                ? `Description: ${props.selectedTrade.eachTrade.trade.description}\n`
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
    } else if (!loading) {
        return (
            <div className="trade-ideas">
                {showOtherTrades()}
                {props.selectedTrade && props.selectedTrade.eachTrade ? (
                    <div className="popup" id="popup">
                        <div className="popup__content" id="content">
                            <img
                                className="popup__left"
                                src={
                                    props.selectedTrade.eachTrade.trade.imageUrl
                                }
                                alt="Trade image"
                            />
                            <div className="popup__right">
                                <a href="#main" className="popup__close">
                                    &times;
                                </a>
                                <h2 className="heading-secondary u-margin-bottom-small">
                                    {
                                        props.selectedTrade.eachTrade.trade
                                            .currency
                                    }{" "}
                                    {props.selectedTrade.eachTrade.trade.kind}
                                </h2>

                                <h2 className="heading-secondary u-margin-bottom-small">
                                    Entry:{" "}
                                    {props.selectedTrade.eachTrade.trade.entry}
                                </h2>
                                <h2 className="heading-secondary u-margin-bottom-small">
                                    Closed at:{" "}
                                    {props.selectedTrade.eachTrade.trade.close}
                                </h2>

                                <h2 className="heading-secondary u-margin-bottom-small">
                                    {props.selectedTrade.eachTrade.trade
                                        .description ? (
                                        <p className="popup__text">
                                            {
                                                props.selectedTrade.eachTrade
                                                    .trade.description
                                            }
                                        </p>
                                    ) : (
                                        <p className="popup__text">
                                            No description provided
                                        </p>
                                    )}
                                </h2>

                                <div className="popup_right-sharing-icons">
                                    <FacebookShareButton
                                        url={`https://www.tracktrade.co/profile/${props.selectedTrade.eachTrade.trade.trader}`}
                                        title={`${
                                            props.selectedTrade.eachTrade.trade
                                                .trader
                                        }'s TRADE:\n${
                                            props.selectedTrade.eachTrade.trade
                                                .currency
                                        } ${
                                            props.selectedTrade.eachTrade.trade
                                                .kind
                                        }\nEntry: ${
                                            props.selectedTrade.eachTrade.trade
                                                .entry
                                        }\nClose: ${
                                            props.selectedTrade.eachTrade.trade
                                                .close
                                        }\n${
                                            props.selectedTrade.eachTrade.trade
                                                .description
                                                ? `Description: ${props.selectedTrade.eachTrade.trade.description}\n`
                                                : ""
                                        }`}
                                        className="popup_right-sharing-icons-button"
                                    >
                                        <FacebookIcon size={32} round />
                                    </FacebookShareButton>
                                    <TwitterShareButton
                                        url={`https://www.tracktrade.co/profile/${props.selectedTrade.eachTrade.trade.trader}`}
                                        title={`${
                                            props.selectedTrade.eachTrade.trade
                                                .trader
                                        }'s TRADE:\n${
                                            props.selectedTrade.eachTrade.trade
                                                .currency
                                        } ${
                                            props.selectedTrade.eachTrade.trade
                                                .kind
                                        }\nEntry: ${
                                            props.selectedTrade.eachTrade.trade
                                                .entry
                                        }\nClose: ${
                                            props.selectedTrade.eachTrade.trade
                                                .close
                                        }\n${
                                            props.selectedTrade.eachTrade.trade
                                                .description
                                                ? `Description: ${props.selectedTrade.eachTrade.trade.description}\n`
                                                : ""
                                        }`}
                                        className="popup_right-sharing-icons-button"
                                    >
                                        <TwitterIcon size={32} round />
                                    </TwitterShareButton>
                                    <TelegramShareButton
                                        url={`https://www.tracktrade.co/profile/${props.selectedTrade.eachTrade.trade.trader}`}
                                        title={`${
                                            props.selectedTrade.eachTrade.trade
                                                .trader
                                        }'s TRADE:\n${
                                            props.selectedTrade.eachTrade.trade
                                                .currency
                                        } ${
                                            props.selectedTrade.eachTrade.trade
                                                .kind
                                        }\nEntry: ${
                                            props.selectedTrade.eachTrade.trade
                                                .entry
                                        }\nClose: ${
                                            props.selectedTrade.eachTrade.trade
                                                .close
                                        }\n${
                                            props.selectedTrade.eachTrade.trade
                                                .description
                                                ? `Description: ${props.selectedTrade.eachTrade.trade.description}\n`
                                                : ""
                                        }`}
                                        className="popup_right-sharing-icons-button"
                                    >
                                        <TelegramIcon size={32} round />
                                    </TelegramShareButton>
                                    <WhatsappShareButton
                                        url={`https://www.tracktrade.co/profile/${props.selectedTrade.eachTrade.trade.trader}`}
                                        title={`${
                                            props.selectedTrade.eachTrade.trade
                                                .trader
                                        }'s TRADE:\n${
                                            props.selectedTrade.eachTrade.trade
                                                .currency
                                        } ${
                                            props.selectedTrade.eachTrade.trade
                                                .kind
                                        }\nEntry: ${
                                            props.selectedTrade.eachTrade.trade
                                                .entry
                                        }\nClose: ${
                                            props.selectedTrade.eachTrade.trade
                                                .close
                                        }\n${
                                            props.selectedTrade.eachTrade.trade
                                                .description
                                                ? `Description: ${props.selectedTrade.eachTrade.trade.description}\n`
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
    } else if (loading) {
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
    console.log("state", state);
    return {
        actualTrades: state.trades,
        selectedTrade: state.selectedTrade,
        otherProfile: state.otherProfile,
    };
};

export default connect(mapStateToProps, { fetchTrades, selectTrade })(
    ShowTrades
);
