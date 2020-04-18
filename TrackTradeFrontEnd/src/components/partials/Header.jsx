import React, { Component } from "react";
import { Link } from "react-router-dom";
import actions from "../../services/index";

// redux imports
import { connect } from "react-redux";
import { logOut, checkLogin } from "../../actions/auth";

class Header extends Component {
  state = {};

  logOut = async () => {
    await this.props.logOut();
    await this.props.checkLogin();
    this.props.history.push("/");
    // window.location.reload();
  };

  render() {
    if (!this.props.loggedIn) {
      return (
        <nav>
          <div className="navigation">
            <Link to="/" className="navigation--brand">
              Track Trade
            </Link>
            <ul className="navigation--right">
              <li id="about">
                <Link
                  className="navigation--link navigation--login"
                  to="/log-in"
                >
                  Log In
                </Link>
              </li>
              <li id="contact">
                <Link
                  className="navigation--link navigation--signup"
                  to="/sign-up"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      );
    } else {
      return (
        <nav>
          <div id="main" className="navigation">
            <Link to="/" className="navigation--brand">
              Track Trade
            </Link>
            <ul className="navigation--right">
              <div className="navigation--right__links-phone">
                <input
                  type="checkbox"
                  class="menu__checkbox"
                  id="navi-toggle"
                />

                <label for="navi-toggle" class="menu__button">
                  <span class="menu__icon">&nbsp;</span>
                </label>

                <div class="menu__background">&nbsp;</div>

                <nav class="menu__nav">
                  <ul class="menu__list">
                    <li class="menu__item">
                      <Link className="menu-link" to="/home">
                        Home
                      </Link>
                    </li>

                    <li class="menu__item">
                      <Link className="menu-link" to="/tools">
                        Tools
                      </Link>
                    </li>

                    <li class="menu__item">
                      <Link className="menu-link" to="/profile">
                        Profile
                      </Link>
                    </li>

                    <li class="menu__item">
                      <Link
                        onClick={this.logOut}
                        className="menu-link menu-link-logout"
                        to="/"
                      >
                        Log Out
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="navigation--right__links-desktop">
                <li
                  className={
                    this.props.where === "Home"
                      ? "profile-nav__links-text-active"
                      : "profile-nav__links-text"
                  }
                >
                  <Link className="navigation--link" to="/home">
                    Home
                  </Link>
                </li>
                <li
                  className={
                    this.props.where === "Tools"
                      ? "profile-nav__links-text-active"
                      : "profile-nav__links-text"
                  }
                >
                  <Link className="navigation--link" to="/tools">
                    Tools
                  </Link>
                </li>
                <li
                  className={
                    this.props.isProfile
                      ? "profile-nav__links-text-active"
                      : "profile-nav__links-text"
                  }
                >
                  <Link className="navigation--link" to="/profile">
                    Profile
                  </Link>
                </li>
                <li className="profile-nav__links-text">
                  <Link
                    onClick={this.logOut}
                    className="navigation--link navigation--logout"
                    to="/"
                  >
                    Log Out
                  </Link>
                </li>
              </div>
            </ul>
          </div>
        </nav>
      );
    }
  }
}

const mapStateToProps = (state) => {
    return {logout: state.logOut, user: state.checkLogin}
}

export default connect(mapStateToProps, { logOut, checkLogin })(Header)