import React, { Component } from "react";
import actions from "../../services/index";
import {
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon
} from "react-share";

export default class ShowTrades extends Component {
  state = {};

  async componentDidMount() {
    let actualTrades = await actions.getTrades();
    this.setState({ actualTrades });
    console.log(this.state);
  }

  deleteCard = async id => {
    try {
      await actions.deleteTrades({ cardId: id });
      let actualTrades = await actions.getIdeas();
      this.setState({ actualTrades });
    } catch (err) {
      console.log("--=-=-=-=-=-=-=", err);
    }
  };

  formatTime = time => {
    return String(new Date(time)).substring(0, 24);
  };

  showIdeas = () => {
    if (this.state.actualTrades) {
      return this.state.actualTrades.data.map(eachTrade => {
        return (
          <div className="trade-ideas-card">
            <a
              href="#popup"
              onClick={async () => {
                await this.setState({ eachTrade });
                console.log(this.state);
              }}
              className="trade-ideas-card-more"
            >
              click for more info
            </a>
            <a
              href="#popup"
              onClick={async () => {
                await this.setState({ eachTrade });
                console.log(this.state);
              }}
              className="trade-ideas-card-link"
            >
              {eachTrade.trade.money > 0 ? (
                <div className="trade-ideas-card-win">
                  ${eachTrade.trade.money.toFixed(2)}
                </div>
              ) : (
                <div className="trade-ideas-card-loss">
                  -${Math.abs(eachTrade.trade.money).toFixed(2)}
                </div>
              )}

              <div className="trade-ideas-card__item">
                <div className="trade-ideas-card__item-title">
                  {eachTrade.trade.currency} {eachTrade.trade.kind}
                </div>
              </div>
              <div className="trade-ideas-card__item">
                <div className="trade-ideas-card__item-title">Lot Size:</div>
                <div className="trade-ideas-card__item-content">
                  {eachTrade.trade.lot.toFixed(2)}
                </div>
              </div>
              <div className="trade-ideas-card__item">
                <div className="trade-ideas-card__item-title">Entry:</div>
                <div className="trade-ideas-card__item-content">
                  {eachTrade.trade.entry}
                </div>
              </div>
              <div className="trade-ideas-card__item">
                <div className="trade-ideas-card__item-title">Close:</div>
                <div className="trade-ideas-card__item-content">
                  {eachTrade.trade.close}
                </div>
              </div>
              <div className="trade-ideas-card__item">
                <div className="trade-ideas-card__item-title">By:</div>
                <div className="trade-ideas-card__item-content">
                  {eachTrade.trade.trader}
                </div>
              </div>
              <div className="trade-ideas-card__item-date">
                <div className="trade-ideas-card__item-date-title">
                  Created at:
                </div>
                <div className="trade-ideas-card__item-date-content">
                  {this.formatTime(eachTrade.created_at)}
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

  showOtherIdeas = () => {
    if (this.props.trades) {
      return this.props.trades.map(eachTrade => {
        return (
          <div className="trade-ideas-card">
            <a
              href="#popup"
              onClick={async () => {
                await this.setState({ eachTrade });
                console.log(this.state);
              }}
              className="trade-ideas-card-more"
            >
              click for more info
            </a>
            <a
              href="#popup"
              onClick={async () => {
                await this.setState({ eachTrade });
                console.log(this.state);
              }}
              className="trade-ideas-card-link"
            >
              {eachTrade.trade.money > 0 ? (
                <div className="trade-ideas-card-win-all">WIN</div>
              ) : (
                <div className="trade-ideas-card-loss-all">LOSS</div>
              )}

              <div className="trade-ideas-card__item">
                <div className="trade-ideas-card__item-title">
                  {eachTrade.trade.currency} {eachTrade.trade.kind}
                </div>
              </div>

              <div className="trade-ideas-card__item">
                <div className="trade-ideas-card__item-title">Entry:</div>
                <div className="trade-ideas-card__item-content">
                  {eachTrade.trade.entry}
                </div>
              </div>
              <div className="trade-ideas-card__item">
                <div className="trade-ideas-card__item-title">Close:</div>
                <div className="trade-ideas-card__item-content">
                  {eachTrade.trade.close}
                </div>
              </div>
              <div className="trade-ideas-card__item">
                <div className="trade-ideas-card__item-title">By:</div>
                <div className="trade-ideas-card__item-content">
                  {eachTrade.trade.trader}
                </div>
              </div>
              <div className="trade-ideas-card__item-date">
                <div className="trade-ideas-card__item-date-title">
                  Created at:
                </div>
                <div className="trade-ideas-card__item-date-content">
                  {this.formatTime(eachTrade.created_at)}
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

  render() {
    if (!this.props.otherProfile) {
      return (
        <div class="trade-ideas">
          {this.showIdeas()}
          {this.state.eachTrade ? (
            <div class="popup" id="popup">
              <div class="popup__content" id="content">
                <div className="popup__left">
                  <img
                    className="popup__left--image"
                    src={this.state.eachTrade.trade.imageUrl}
                    alt="trade"
                  />
                </div>
                <div class="popup__right">
                  <a href="#main" class="popup__close">
                    &times;
                  </a>
                  <h2 class="heading-secondary u-margin-bottom-small">
                    {this.state.eachTrade.trade.currency}{" "}
                    {this.state.eachTrade.trade.kind}
                  </h2>
                  <h2 class="heading-secondary u-margin-bottom-small">
                    Lot size: {this.state.eachTrade.trade.lot}
                  </h2>
                  <h2 class="heading-secondary u-margin-bottom-small">
                    Entry: {this.state.eachTrade.trade.entry}
                  </h2>
                  <h2 class="heading-secondary u-margin-bottom-small">
                    Closed at: {this.state.eachTrade.trade.close}
                  </h2>
                  {this.state.eachTrade.trade.money > 0 ? (
                    <div className="trade-ideas-card-win-popup">
                      ${this.state.eachTrade.trade.money.toFixed(2)}
                    </div>
                  ) : (
                    <div className="trade-ideas-card-loss-popup">
                      -${Math.abs(this.state.eachTrade.trade.money).toFixed(2)}
                    </div>
                  )}

                  <h2 class="heading-secondary u-margin-bottom-small">
                    {this.state.eachTrade.trade.description ? (
                      <p class="popup__text">
                        {this.state.eachTrade.trade.description}
                      </p>
                    ) : (
                      <p class="popup__text"></p>
                    )}
                  </h2>

                  <div className="popup_right-sharing-icons">
                    <FacebookShareButton
                      url={`https://www.tracktrade.co/profile/${this.state.eachTrade.trade.trader}`}
                      title={`MY TRADE:\n${
                        this.state.eachTrade.trade.currency
                      } ${this.state.eachTrade.trade.kind}\nEntry: ${
                        this.state.eachTrade.trade.entry
                      }\nClose: ${this.state.eachTrade.trade.close}\n${
                        this.state.eachTrade.trade.description
                          ? `Description: ${this.state.eachTrade.trade.description}\n`
                          : ""
                      }`}
                      className="popup_right-sharing-icons-button"
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={`https://www.tracktrade.co/profile/${this.state.eachTrade.trade.trader}`}
                      title={`MY TRADE:\n${
                        this.state.eachTrade.trade.currency
                      } ${this.state.eachTrade.trade.kind}\nEntry: ${
                        this.state.eachTrade.trade.entry
                      }\nClose: ${this.state.eachTrade.trade.close}\n${
                        this.state.eachTrade.trade.description
                          ? `Description: ${this.state.eachTrade.trade.description}\n`
                          : ""
                      }`}
                      className="popup_right-sharing-icons-button"
                    >
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <TelegramShareButton
                      url={`https://www.tracktrade.co/profile/${this.state.eachTrade.trade.trader}`}
                      title={`MY TRADE:\n${
                        this.state.eachTrade.trade.currency
                      } ${this.state.eachTrade.trade.kind}\nEntry: ${
                        this.state.eachTrade.trade.entry
                      }\nClose: ${this.state.eachTrade.trade.close}\n${
                        this.state.eachTrade.trade.description
                          ? `Description: ${this.state.eachTrade.trade.description}\n`
                          : ""
                      }`}
                      className="popup_right-sharing-icons-button"
                    >
                      <TelegramIcon size={32} round />
                    </TelegramShareButton>
                    <WhatsappShareButton
                      url={`https://www.tracktrade.co/profile/${this.state.eachTrade.trade.trader}`}
                      title={`MY TRADE:\n${
                        this.state.eachTrade.trade.currency
                      } ${this.state.eachTrade.trade.kind}\nEntry: ${
                        this.state.eachTrade.trade.entry
                      }\nClose: ${this.state.eachTrade.trade.close}\n${
                        this.state.eachTrade.trade.description
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
      );
    } else {
      return (
        <div class="trade-ideas">
          {this.showOtherIdeas()}
          {this.state.eachTrade ? (
            <div class="popup" id="popup">
              <div class="popup__content" id="content">
                {/* <div class="popup__left">
                                
                            </div> */}
                <div class="popup__right">
                  <a href="#main" class="popup__close">
                    &times;
                  </a>
                  <h2 class="heading-secondary u-margin-bottom-small">
                    {this.state.eachTrade.trade.currency}{" "}
                    {this.state.eachTrade.trade.kind}
                  </h2>

                  <h2 class="heading-secondary u-margin-bottom-small">
                    Entry: {this.state.eachTrade.trade.entry}
                  </h2>
                  <h2 class="heading-secondary u-margin-bottom-small">
                    Closed at: {this.state.eachTrade.trade.close}
                  </h2>

                  <h2 class="heading-secondary u-margin-bottom-small">
                    {this.state.eachTrade.trade.description ? (
                      <p class="popup__text">
                        {this.state.eachTrade.trade.description}
                      </p>
                    ) : (
                      <p class="popup__text">No description provided</p>
                    )}
                  </h2>

                  <div className="popup_right-sharing-icons">
                    <FacebookShareButton
                      url={`https://www.tracktrade.co/profile/${this.state.eachTrade.trade.trader}`}
                      title={`${this.state.eachTrade.trade.trader}'s TRADE:\n${
                        this.state.eachTrade.trade.currency
                      } ${this.state.eachTrade.trade.kind}\nEntry: ${
                        this.state.eachTrade.trade.entry
                      }\nClose: ${this.state.eachTrade.trade.close}\n${
                        this.state.eachTrade.trade.description
                          ? `Description: ${this.state.eachTrade.trade.description}\n`
                          : ""
                      }`}
                      className="popup_right-sharing-icons-button"
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={`https://www.tracktrade.co/profile/${this.state.eachTrade.trade.trader}`}
                      title={`${this.state.eachTrade.trade.trader}'s TRADE:\n${
                        this.state.eachTrade.trade.currency
                      } ${this.state.eachTrade.trade.kind}\nEntry: ${
                        this.state.eachTrade.trade.entry
                      }\nClose: ${this.state.eachTrade.trade.close}\n${
                        this.state.eachTrade.trade.description
                          ? `Description: ${this.state.eachTrade.trade.description}\n`
                          : ""
                      }`}
                      className="popup_right-sharing-icons-button"
                    >
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <TelegramShareButton
                      url={`https://www.tracktrade.co/profile/${this.state.eachTrade.trade.trader}`}
                      title={`${this.state.eachTrade.trade.trader}'s TRADE:\n${
                        this.state.eachTrade.trade.currency
                      } ${this.state.eachTrade.trade.kind}\nEntry: ${
                        this.state.eachTrade.trade.entry
                      }\nClose: ${this.state.eachTrade.trade.close}\n${
                        this.state.eachTrade.trade.description
                          ? `Description: ${this.state.eachTrade.trade.description}\n`
                          : ""
                      }`}
                      className="popup_right-sharing-icons-button"
                    >
                      <TelegramIcon size={32} round />
                    </TelegramShareButton>
                    <WhatsappShareButton
                      url={`https://www.tracktrade.co/profile/${this.state.eachTrade.trade.trader}`}
                      title={`${this.state.eachTrade.trade.trader}'s TRADE:\n${
                        this.state.eachTrade.trade.currency
                      } ${this.state.eachTrade.trade.kind}\nEntry: ${
                        this.state.eachTrade.trade.entry
                      }\nClose: ${this.state.eachTrade.trade.close}\n${
                        this.state.eachTrade.trade.description
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
      );
    }
  }
}
