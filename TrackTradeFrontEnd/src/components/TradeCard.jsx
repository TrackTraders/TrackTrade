import { Paper } from "@mui/material";
import { useAsyncEffect } from "hooks/use-async-effect";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
    FacebookIcon,
    FacebookShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from "react-share";
import { formatTime } from "utils/formatTime";
import { fetchTrades, selectTrade } from "../actions";
import { checkLogin } from "../actions/auth";
import CustomModal from "./CustomModal";
import Flex from "./Flex";

const TradeCard = ({ trade, ...props }) => {
    console.log(trade);
    const [modalOpen, setModalOpen] = useState(false);
    const [edit, setEdit] = useState();
    const [isProfile, setIsProfile] = useState(false);

    useAsyncEffect(async () => {
        await props.checkLogin();
    }, []);

    return (
        <>
            <Paper className="trade-ideas-card">
                <div
                    onClick={() => {
                        setModalOpen(true);
                    }}
                    className="trade-ideas-card-more"
                >
                    click for more info
                </div>
                <div
                    onClick={() => {
                        setModalOpen(true);
                    }}
                    className="trade-ideas-card-link"
                >
                    {trade.trade.money > 0 ? (
                        <div className="trade-ideas-card-win-all">WIN</div>
                    ) : (
                        <div className="trade-ideas-card-loss-all">LOSS</div>
                    )}

                    <div className="trade-ideas-card__item">
                        <div className="trade-ideas-card__item-title">
                            {trade.trade.currency} {trade.trade.kind}
                        </div>
                    </div>
                    <div className="trade-ideas-card__item">
                        <div className="trade-ideas-card__item-title">
                            Entry:
                        </div>
                        <div className="trade-ideas-card__item-content">
                            {trade.trade.entry}
                        </div>
                    </div>
                    <div className="trade-ideas-card__item">
                        <div className="trade-ideas-card__item-title">
                            Close:
                        </div>
                        <div className="trade-ideas-card__item-content">
                            {trade.trade.close}
                        </div>
                    </div>
                    <div className="trade-ideas-card__item">
                        <div className="trade-ideas-card__item-title">By:</div>
                        <div className="trade-ideas-card__item-content">
                            {trade.trade.trader}
                        </div>
                    </div>
                    <div className="trade-ideas-card__item-date">
                        <div className="trade-ideas-card__item-date-title">
                            Created at:
                        </div>
                        <div className="trade-ideas-card__item-date-content">
                            {formatTime(trade.created_at)}
                        </div>
                    </div>
                </div>
            </Paper>
            <CustomModal open={modalOpen} onClose={() => setModalOpen(false)}>
                <div class="popup">
                    <div class="popup__content" id="content">
                        {trade.trade.imageUrl ? (
                            <img
                                className="popup__left"
                                src={trade.trade.imageUrl}
                                alt="Trade image"
                            />
                        ) : null}
                        <div class="popup__right">
                            <div
                                onClick={() => setModalOpen(false)}
                                class="popup__close"
                            >
                                &times;
                            </div>

                            <h2 class="heading-secondary u-margin-bottom-small">
                                {trade.trade.currency} {trade.trade.kind}
                            </h2>

                            <h2 class="heading-secondary u-margin-bottom-small">
                                Entry: {trade.trade.entry}
                            </h2>
                            <h2 class="heading-secondary u-margin-bottom-small">
                                Stoploss: {trade.trade.stoploss}
                            </h2>
                            <h2 class="heading-secondary u-margin-bottom-small">
                                Takeprofit: {trade.trade.takeprofit}
                            </h2>

                            <h2 class="heading-secondary u-margin-bottom-small">
                                {trade.trade.description ? (
                                    <p class="popup__text">
                                        {trade.trade.description}
                                    </p>
                                ) : (
                                    <p class="popup__text">
                                        No description provided
                                    </p>
                                )}
                            </h2>
                            <p class="popup__text">
                                Created by:
                                <Link to={`/profile/${trade.trade.trader}`}>
                                    {trade.trade.trader}
                                </Link>
                            </p>

                            <div className="popup_right-sharing-icons">
                                <FacebookShareButton
                                    url={`https://www.tracktrade.co/profile/${trade.trade.trader}`}
                                    title={`${
                                        trade.trade.trader
                                    }'s TRADE IDEA:\n${trade.trade.currency} ${
                                        trade.trade.kind
                                    }\nEntry: ${trade.trade.entry}\nStoploss: ${
                                        trade.trade.stoploss
                                    }\nTakeprofit: ${trade.trade.takeprofit}\n${
                                        trade.trade.description
                                            ? `Description: ${trade.trade.description}\n`
                                            : ""
                                    }`}
                                    className="popup_right-sharing-icons-button"
                                >
                                    <FacebookIcon size={32} round />
                                </FacebookShareButton>
                                <TwitterShareButton
                                    url={`https://www.tracktrade.co/profile/${trade.trade.trader}`}
                                    title={`${
                                        trade.trade.trader
                                    }'s TRADE IDEA:\n${trade.trade.currency} ${
                                        trade.trade.kind
                                    }\nEntry: ${trade.trade.entry}\nStoploss: ${
                                        trade.trade.stoploss
                                    }\nTakeprofit: ${trade.trade.takeprofit}\n${
                                        trade.trade.description
                                            ? `Description: ${trade.trade.description}\n`
                                            : ""
                                    }`}
                                    className="popup_right-sharing-icons-button"
                                >
                                    <TwitterIcon size={32} round />
                                </TwitterShareButton>
                                <TelegramShareButton
                                    url={`https://www.tracktrade.co/profile/${trade.trade.trader}`}
                                    title={`${
                                        trade.trade.trader
                                    }'s TRADE IDEA:\n${trade.trade.currency} ${
                                        trade.trade.kind
                                    }\nEntry: ${trade.trade.entry}\nStoploss: ${
                                        trade.trade.stoploss
                                    }\nTakeprofit: ${trade.trade.takeprofit}\n${
                                        trade.trade.description
                                            ? `Description: ${trade.trade.description}\n`
                                            : ""
                                    }`}
                                    className="popup_right-sharing-icons-button"
                                >
                                    <TelegramIcon size={32} round />
                                </TelegramShareButton>
                                <WhatsappShareButton
                                    url={`https://www.tracktrade.co/profile/${trade.trade.trader}`}
                                    title={`${
                                        trade.trade.trader
                                    }'s TRADE IDEA:\n${trade.trade.currency} ${
                                        trade.trade.kind
                                    }\nEntry: ${trade.trade.entry}\nStoploss: ${
                                        trade.trade.stoploss
                                    }\nTakeprofit: ${trade.trade.takeprofit}\n${
                                        trade.trade.description
                                            ? `Description: ${trade.trade.description}\n`
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
            </CustomModal>
        </>
    );
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
        actualTrades: state.trades,
        selectedtrade: state.selectedTrades,
        otherProfile: state.otherProfile,
    };
};

export default connect(mapStateToProps, {
    fetchTrades,
    selectTrade,
    checkLogin,
})(TradeCard);
