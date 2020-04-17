import React, { Component } from "react";

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

class ShowTrades extends Component {
  state = {};

  async componentDidMount() {
    await this.props.fetchTrades();
  }

  formatTime = (time) => {
    return String(new Date(time)).substring(0, 24);
  };

  showIdeas = () => {
    if (this.props.actualTrades) {
      return this.props.actualTrades.data.map((eachTrade) => {
        return (
          <div className="trade-ideas-card">
            <a
              href="#popup"
              onClick={async () => {
                await this.props.selectTrade({ eachTrade });
              }}
              className="trade-ideas-card-more"
            >
              click for more info
            </a>
            <a
              href="#popup"
              onClick={async () => {
                await this.props.selectTrade({ eachTrade });
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
    if (this.props.otherProfile) {
      return this.props.otherProfile.trades.map((eachTrade) => {
        return (
          <div className="trade-ideas-card">
            <a
              href="#popup"
              onClick={async () => {
                await this.props.selectTrade({ eachTrade });
              }}
              className="trade-ideas-card-more"
            >
              click for more info
            </a>
            <a
              href="#popup"
              onClick={async () => {
                await this.props.selectTrade({ eachTrade });
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
          {this.props.selectedTrade &&
            this.props.selectedTrade.eachTrade ? (
            <div class="popup" id="popup">
              <div class="popup__content" id="content">
                <div className="popup__left">
                  <img
                    className="popup__left--image"
                    src={this.props.selectedTrade.eachTrade.trade.imageUrl}
                    alt="trade"
                  />
                </div>
                <div class="popup__right">
                  <a href="#main" class="popup__close">
                    &times;
                  </a>
                  <h2 class="heading-secondary u-margin-bottom-small">
                    {this.props.selectedTrade.eachTrade.trade.currency}{" "}
                    {this.props.selectedTrade.eachTrade.trade.kind}
                  </h2>
                  <h2 class="heading-secondary u-margin-bottom-small">
                    Lot size: {this.props.selectedTrade.eachTrade.trade.lot}
                  </h2>
                  <h2 class="heading-secondary u-margin-bottom-small">
                    Entry: {this.props.selectedTrade.eachTrade.trade.entry}
                  </h2>
                  <h2 class="heading-secondary u-margin-bottom-small">
                    Closed at: {this.props.selectedTrade.eachTrade.trade.close}
                  </h2>
                  {this.props.selectedTrade.eachTrade.trade.money > 0 ? (
                    <div className="trade-ideas-card-win-popup">
                      ${this.props.selectedTrade.eachTrade.trade.money.toFixed(2)}
                    </div>
                  ) : (
                    <div className="trade-ideas-card-loss-popup">
                      -${Math.abs(this.props.selectedTrade.eachTrade.trade.money).toFixed(2)}
                    </div>
                  )}

                  <h2 class="heading-secondary u-margin-bottom-small">
                    {this.props.selectedTrade.eachTrade.trade.description ? (
                      <p class="popup__text">
                        {this.props.selectedTrade.eachTrade.trade.description}
                      </p>
                    ) : (
                      <p class="popup__text"></p>
                    )}
                  </h2>

                  <div className="popup_right-sharing-icons">
                    <FacebookShareButton
                      url={`https://www.tracktrade.co/profile/${this.props.selectedTrade.eachTrade.trade.trader}`}
                      title={`MY TRADE:\n${
                        this.props.selectedTrade.eachTrade.trade.currency
                      } ${this.props.selectedTrade.eachTrade.trade.kind}\nEntry: ${
                        this.props.selectedTrade.eachTrade.trade.entry
                      }\nClose: ${this.props.selectedTrade.eachTrade.trade.close}\n${
                        this.props.selectedTrade.eachTrade.trade.description
                          ? `Description: ${this.props.selectedTrade.eachTrade.trade.description}\n`
                          : ""
                      }`}
                      className="popup_right-sharing-icons-button"
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={`https://www.tracktrade.co/profile/${this.props.selectedTrade.eachTrade.trade.trader}`}
                      title={`MY TRADE:\n${
                        this.props.selectedTrade.eachTrade.trade.currency
                      } ${this.props.selectedTrade.eachTrade.trade.kind}\nEntry: ${
                        this.props.selectedTrade.eachTrade.trade.entry
                      }\nClose: ${this.props.selectedTrade.eachTrade.trade.close}\n${
                        this.props.selectedTrade.eachTrade.trade.description
                          ? `Description: ${this.props.selectedTrade.eachTrade.trade.description}\n`
                          : ""
                      }`}
                      className="popup_right-sharing-icons-button"
                    >
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <TelegramShareButton
                      url={`https://www.tracktrade.co/profile/${this.props.selectedTrade.eachTrade.trade.trader}`}
                      title={`MY TRADE:\n${
                        this.props.selectedTrade.eachTrade.trade.currency
                      } ${this.props.selectedTrade.eachTrade.trade.kind}\nEntry: ${
                        this.props.selectedTrade.eachTrade.trade.entry
                      }\nClose: ${this.props.selectedTrade.eachTrade.trade.close}\n${
                        this.props.selectedTrade.eachTrade.trade.description
                          ? `Description: ${this.props.selectedTrade.eachTrade.trade.description}\n`
                          : ""
                      }`}
                      className="popup_right-sharing-icons-button"
                    >
                      <TelegramIcon size={32} round />
                    </TelegramShareButton>
                    <WhatsappShareButton
                      url={`https://www.tracktrade.co/profile/${this.props.selectedTrade.eachTrade.trade.trader}`}
                      title={`MY TRADE:\n${
                        this.props.selectedTrade.eachTrade.trade.currency
                      } ${this.props.selectedTrade.eachTrade.trade.kind}\nEntry: ${
                        this.props.selectedTrade.eachTrade.trade.entry
                      }\nClose: ${this.props.selectedTrade.eachTrade.trade.close}\n${
                        this.props.selectedTrade.eachTrade.trade.description
                          ? `Description: ${this.props.selectedTrade.eachTrade.trade.description}\n`
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
          {this.props.selectedTrade &&
          this.props.selectedTrade.eachTrade ? (
            <div class="popup" id="popup">
              <div class="popup__content" id="content">
                {/* <div class="popup__left">
                                
                            </div> */}
                <div class="popup__right">
                  <a href="#main" class="popup__close">
                    &times;
                  </a>
                  <h2 class="heading-secondary u-margin-bottom-small">
                    {this.props.selectedTrade.eachTrade.trade.currency}{" "}
                    {this.props.selectedTrade.eachTrade.trade.kind}
                  </h2>

                  <h2 class="heading-secondary u-margin-bottom-small">
                    Entry: {this.props.selectedTrade.eachTrade.trade.entry}
                  </h2>
                  <h2 class="heading-secondary u-margin-bottom-small">
                    Closed at: {this.props.selectedTrade.eachTrade.trade.close}
                  </h2>

                  <h2 class="heading-secondary u-margin-bottom-small">
                    {this.props.selectedTrade.eachTrade.trade.description ? (
                      <p class="popup__text">
                        {this.props.selectedTrade.eachTrade.trade.description}
                      </p>
                    ) : (
                      <p class="popup__text">No description provided</p>
                    )}
                  </h2>

                  <div className="popup_right-sharing-icons">
                    <FacebookShareButton
                      url={`https://www.tracktrade.co/profile/${this.props.selectedTrade.eachTrade.trade.trader}`}
                      title={`${this.props.selectedTrade.eachTrade.trade.trader}'s TRADE:\n${
                        this.props.selectedTrade.eachTrade.trade.currency
                      } ${this.props.selectedTrade.eachTrade.trade.kind}\nEntry: ${
                        this.props.selectedTrade.eachTrade.trade.entry
                      }\nClose: ${this.props.selectedTrade.eachTrade.trade.close}\n${
                        this.props.selectedTrade.eachTrade.trade.description
                          ? `Description: ${this.props.selectedTrade.eachTrade.trade.description}\n`
                          : ""
                      }`}
                      className="popup_right-sharing-icons-button"
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={`https://www.tracktrade.co/profile/${this.props.selectedTrade.eachTrade.trade.trader}`}
                      title={`${this.props.selectedTrade.eachTrade.trade.trader}'s TRADE:\n${
                        this.props.selectedTrade.eachTrade.trade.currency
                      } ${this.props.selectedTrade.eachTrade.trade.kind}\nEntry: ${
                        this.props.selectedTrade.eachTrade.trade.entry
                      }\nClose: ${this.props.selectedTrade.eachTrade.trade.close}\n${
                        this.props.selectedTrade.eachTrade.trade.description
                          ? `Description: ${this.props.selectedTrade.eachTrade.trade.description}\n`
                          : ""
                      }`}
                      className="popup_right-sharing-icons-button"
                    >
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <TelegramShareButton
                      url={`https://www.tracktrade.co/profile/${this.props.selectedTrade.eachTrade.trade.trader}`}
                      title={`${this.props.selectedTrade.eachTrade.trade.trader}'s TRADE:\n${
                        this.props.selectedTrade.eachTrade.trade.currency
                      } ${this.props.selectedTrade.eachTrade.trade.kind}\nEntry: ${
                        this.props.selectedTrade.eachTrade.trade.entry
                      }\nClose: ${this.props.selectedTrade.eachTrade.trade.close}\n${
                        this.props.selectedTrade.eachTrade.trade.description
                          ? `Description: ${this.props.selectedTrade.eachTrade.trade.description}\n`
                          : ""
                      }`}
                      className="popup_right-sharing-icons-button"
                    >
                      <TelegramIcon size={32} round />
                    </TelegramShareButton>
                    <WhatsappShareButton
                      url={`https://www.tracktrade.co/profile/${this.props.selectedTrade.eachTrade.trade.trader}`}
                      title={`${this.props.selectedTrade.eachTrade.trade.trader}'s TRADE:\n${
                        this.props.selectedTrade.eachTrade.trade.currency
                      } ${this.props.selectedTrade.eachTrade.trade.kind}\nEntry: ${
                        this.props.selectedTrade.eachTrade.trade.entry
                      }\nClose: ${this.props.selectedTrade.eachTrade.trade.close}\n${
                        this.props.selectedTrade.eachTrade.trade.description
                          ? `Description: ${this.props.selectedTrade.eachTrade.trade.description}\n`
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


const mapStateToProps = state => {
  console.log('state',state)
  return {actualTrades: state.trades, selectedTrade: state.selectedTrade, otherProfile: state.otherProfile}
}

export default connect(mapStateToProps, {fetchTrades, selectTrade})(ShowTrades)