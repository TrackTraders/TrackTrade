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
import { fetchTradeIdeas, selectTradeIdea, deleteIdea } from "../actions";
import { checkLogin } from "../actions/auth";
import CustomModal from "./CustomModal";
import Flex from "./Flex";

const TradeIdeaCard = ({ tradeIdea, ...props }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [edit, setEdit] = useState();
    const [isProfile, setIsProfile] = useState(false);

    useAsyncEffect(async () => {
        await props.checkLogin();
    }, []);

    // setIsProfile(props.checkLogin?.data?.username === tradeIdea.trade.trader);
    const deleteCard = async (id) => {
        try {
            await props.deleteIdea({ cardId: id });
            await props.fetchTradeIdeas();
        } catch (err) {
            console.log("--=-=-=-=-=-=-=", err);
        }
    };
    return (
        <>
            <div className="trade-ideas-card">
                <div
                    onClick={() => {
                        setModalOpen(true);
                    }}
                    className="trade-ideas-card-more"
                >
                    click for more info
                </div>
                <div
                    className="trade-ideas-card-link"
                    onClick={() => {
                        setModalOpen(true);
                    }}
                >
                    <div className="trade-ideas-card__item">
                        <div className="trade-ideas-card__item-title">
                            {tradeIdea.trade.currency} {tradeIdea.trade.kind}
                        </div>
                    </div>

                    <div className="trade-ideas-card__item">
                        <div className="trade-ideas-card__item-title">
                            Entry:
                        </div>
                        <div className="trade-ideas-card__item-content">
                            {tradeIdea.trade.entry}
                        </div>
                    </div>
                    <div className="trade-ideas-card__item">
                        <div className="trade-ideas-card__item-title">
                            Stoploss:
                        </div>
                        <div className="trade-ideas-card__item-content">
                            {tradeIdea.trade.stoploss}
                        </div>
                    </div>
                    <div className="trade-ideas-card__item">
                        <div className="trade-ideas-card__item-title">
                            Takeprofit:
                        </div>
                        <div className="trade-ideas-card__item-content">
                            {tradeIdea.trade.takeprofit}
                        </div>
                    </div>
                    <div className="trade-ideas-card__item">
                        <div className="trade-ideas-card__item-title">By:</div>
                        <div className="trade-ideas-card__item-content">
                            {tradeIdea.trade.trader}
                        </div>
                    </div>
                    <div className="trade-ideas-card__item-date">
                        <div className="trade-ideas-card__item-date-title">
                            Created at:
                        </div>
                        <div className="trade-ideas-card__item-date-content">
                            {formatTime(tradeIdea.created_at)}
                        </div>
                    </div>
                    {tradeIdea.updatedAt === tradeIdea.created_at ? null : (
                        <div className="trade-ideas-card__item-date">
                            <div className="trade-ideas-card__item-date-title">
                                Updated at:
                            </div>
                            <div className="trade-ideas-card__item-date-content">
                                {formatTime(tradeIdea.updatedAt)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <CustomModal open={modalOpen} onClose={() => setModalOpen(false)}>
                <div class="popup">
                    <div class="popup__content" id="content">
                        {tradeIdea.trade.imageUrl ? (
                            <img
                                className="popup__left"
                                src={tradeIdea.trade.imageUrl}
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
                                {tradeIdea.trade.currency}{" "}
                                {tradeIdea.trade.kind}
                            </h2>

                            <h2 class="heading-secondary u-margin-bottom-small">
                                Entry: {tradeIdea.trade.entry}
                            </h2>
                            <h2 class="heading-secondary u-margin-bottom-small">
                                Stoploss: {tradeIdea.trade.stoploss}
                            </h2>
                            <h2 class="heading-secondary u-margin-bottom-small">
                                Takeprofit: {tradeIdea.trade.takeprofit}
                            </h2>

                            <h2 class="heading-secondary u-margin-bottom-small">
                                {tradeIdea.trade.description ? (
                                    <p class="popup__text">
                                        {tradeIdea.trade.description}
                                    </p>
                                ) : (
                                    <p class="popup__text">
                                        No description provided
                                    </p>
                                )}
                            </h2>
                            <p class="popup__text">
                                Created by:
                                <Link to={`/profile/${tradeIdea.trade.trader}`}>
                                    {tradeIdea.trade.trader}
                                </Link>
                            </p>

                            <div className="popup_right-sharing-icons">
                                <FacebookShareButton
                                    url={`https://www.tracktrade.co/profile/${tradeIdea.trade.trader}`}
                                    title={`${
                                        tradeIdea.trade.trader
                                    }'s TRADE IDEA:\n${
                                        tradeIdea.trade.currency
                                    } ${tradeIdea.trade.kind}\nEntry: ${
                                        tradeIdea.trade.entry
                                    }\nStoploss: ${
                                        tradeIdea.trade.stoploss
                                    }\nTakeprofit: ${
                                        tradeIdea.trade.takeprofit
                                    }\n${
                                        tradeIdea.trade.description
                                            ? `Description: ${tradeIdea.trade.description}\n`
                                            : ""
                                    }`}
                                    className="popup_right-sharing-icons-button"
                                >
                                    <FacebookIcon size={32} round />
                                </FacebookShareButton>
                                <TwitterShareButton
                                    url={`https://www.tracktrade.co/profile/${tradeIdea.trade.trader}`}
                                    title={`${
                                        tradeIdea.trade.trader
                                    }'s TRADE IDEA:\n${
                                        tradeIdea.trade.currency
                                    } ${tradeIdea.trade.kind}\nEntry: ${
                                        tradeIdea.trade.entry
                                    }\nStoploss: ${
                                        tradeIdea.trade.stoploss
                                    }\nTakeprofit: ${
                                        tradeIdea.trade.takeprofit
                                    }\n${
                                        tradeIdea.trade.description
                                            ? `Description: ${tradeIdea.trade.description}\n`
                                            : ""
                                    }`}
                                    className="popup_right-sharing-icons-button"
                                >
                                    <TwitterIcon size={32} round />
                                </TwitterShareButton>
                                <TelegramShareButton
                                    url={`https://www.tracktrade.co/profile/${tradeIdea.trade.trader}`}
                                    title={`${
                                        tradeIdea.trade.trader
                                    }'s TRADE IDEA:\n${
                                        tradeIdea.trade.currency
                                    } ${tradeIdea.trade.kind}\nEntry: ${
                                        tradeIdea.trade.entry
                                    }\nStoploss: ${
                                        tradeIdea.trade.stoploss
                                    }\nTakeprofit: ${
                                        tradeIdea.trade.takeprofit
                                    }\n${
                                        tradeIdea.trade.description
                                            ? `Description: ${tradeIdea.trade.description}\n`
                                            : ""
                                    }`}
                                    className="popup_right-sharing-icons-button"
                                >
                                    <TelegramIcon size={32} round />
                                </TelegramShareButton>
                                <WhatsappShareButton
                                    url={`https://www.tracktrade.co/profile/${tradeIdea.trade.trader}`}
                                    title={`${
                                        tradeIdea.trade.trader
                                    }'s TRADE IDEA:\n${
                                        tradeIdea.trade.currency
                                    } ${tradeIdea.trade.kind}\nEntry: ${
                                        tradeIdea.trade.entry
                                    }\nStoploss: ${
                                        tradeIdea.trade.stoploss
                                    }\nTakeprofit: ${
                                        tradeIdea.trade.takeprofit
                                    }\n${
                                        tradeIdea.trade.description
                                            ? `Description: ${tradeIdea.trade.description}\n`
                                            : ""
                                    }`}
                                    className="popup_right-sharing-icons-button"
                                >
                                    <WhatsappIcon size={32} round />
                                </WhatsappShareButton>
                            </div>
                            {isProfile ? (
                                <Flex sx={{ marginTop: "1rem" }}>
                                    <button
                                        onClick={() => setEdit(true)}
                                        className="popup__edit"
                                    >
                                        EDIT IDEA
                                    </button>
                                    <button
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
                                    </button>
                                </Flex>
                            ) : null}
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
        actualTrades: state.tradeIdeas,
        selectedTradeIdea: state.selectedTradeIdea,
        otherProfile: state.otherProfile,
    };
};

export default connect(mapStateToProps, {
    fetchTradeIdeas,
    selectTradeIdea,
    deleteIdea,
    checkLogin,
})(TradeIdeaCard);
