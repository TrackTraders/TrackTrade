import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

// redux imports
import { connect } from "react-redux";
import { fetchAllTrades, fetchAllTraders } from "../../actions";
import { checkLogin } from "../../actions/auth";

class Connections extends Component {
  state = {};

  async componentDidMount() {
    await this.props.fetchAllTraders();
    this.setState({ traders: this.props.allTraders });

    await this.props.fetchAllTrades();

    await this.props.checkLogin();

    console.log("props", this.props);
    console.log("state", this.state);
  }

  formatTime = (time) => String(new Date(time)).substring(0, 24);

  winLossRatio = (user) => {
    if (this.props.actualTrades) {
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
        return percent.toString() + "%";
      } else return null;
    }
  };

  totalTrades = (user) => {
    if (this.props.actualTrades) {
      let copyTrades = [...this.props.actualTrades.data];
      let userTrades = copyTrades.filter((eachTrade) => {
        return eachTrade.trade.trader === user;
      });
      if (userTrades.length > 0) {
        // this.setState({traders: {totalTrades: userTrades.length}})
        //console.log(this.state)
        return userTrades.length;
      }
    }
  };

  showConnections = () => {
    if (this.props.allTraders && this.props.user.data) {
      let copyTraders = [...this.props.allTraders.data];
      let filteredTraders = copyTraders.filter((eachTrader) => {
        return this.props.user.data.connections.includes(eachTrader._id);
        //loop through this.props.user to get connections and
        //only return those that match you know
      });
      return filteredTraders.map((eachOne) => {
        return (
          <Link className="home-card" to={`/profile/${eachOne.username}`}>
            <div className="trade-ideas-card">
              <div className="trade-ideas-card-more">visit profile</div>

              <div className="trade-ideas-card-link">
                <div className="trade-ideas-card__item">
                  <div className="trade-ideas-card__item-title-home">
                    <div>
                      {eachOne.avatar ? (
                        <img
                          className="trade-ideas-card__item__image"
                          src={eachOne.avatar}
                          alt="avatar"
                        />
                      ) : (
                        <div className="trade-ideas-card__item__image-default"></div>
                      )}
                    </div>
                    <div className="trade-ideas-card__item-title-home-text">
                      {eachOne.username}
                    </div>
                  </div>
                </div>
                {eachOne.created_at && (
                  <div className="trade-ideas-card__item">
                    <div className="trade-ideas-card__item-title">
                      User since:
                    </div>
                    <div className="trade-ideas-card__item-content">
                      {this.formatTime(eachOne.created_at)}
                    </div>
                  </div>
                )}
                {this.winLossRatio(eachOne.username) && (
                  <div className="trade-ideas-card__item">
                    <div className="trade-ideas-card__item-title">
                      Win Loss Ratio:
                    </div>
                    <div className="trade-ideas-card__item-content">
                      {this.winLossRatio(eachOne.username)}
                    </div>
                  </div>
                )}
                {this.totalTrades(eachOne.username) ? (
                  <div className="trade-ideas-card__item">
                    <div className="trade-ideas-card__item-title">
                      Total Trades:
                    </div>
                    <div className="trade-ideas-card__item-content">
                      {this.totalTrades(eachOne.username)}
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
            </div>
          </Link>
        );
      });
    }
  };

  render() {
    return (
      <Fragment>
        <div className="trade-ideas">{this.showConnections()}</div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    allTraders: state.allTraders,
    actualTrades: state.allTrades,
    user: state.checkLogin,
  };
};
export default connect(mapStateToProps, {
  fetchAllTrades,
  fetchAllTraders,
  checkLogin,
})(Connections);
