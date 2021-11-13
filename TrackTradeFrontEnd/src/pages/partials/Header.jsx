import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

// redux imports
import { connect } from "react-redux";
import { logOut, checkLogin } from "../../actions/auth";
import MainButton from "components/MainButton";

const Header = (props) => {
    const history = useHistory();
    const logOut = async () => {
        await props.logOut();
        await props.checkLogin();
        history.push("/");
    };

    if (!props.loggedIn) {
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
                                className="menu__checkbox"
                                id="navi-toggle"
                            />

                            <label
                                htmlFor="navi-toggle"
                                className="menu__button"
                            >
                                <span className="menu__icon">&nbsp;</span>
                            </label>

                            <div className="menu__background">&nbsp;</div>

                            <nav className="menu__nav">
                                <ul className="menu__list">
                                    <li className="menu__item">
                                        <Link className="menu-link" to="/home">
                                            Home
                                        </Link>
                                    </li>

                                    <li className="menu__item">
                                        <Link className="menu-link" to="/tools">
                                            Tools
                                        </Link>
                                    </li>

                                    <li className="menu__item">
                                        <Link
                                            className="menu-link"
                                            to="/profile"
                                        >
                                            Profile
                                        </Link>
                                    </li>

                                    <li className="menu__item">
                                        <Link
                                            onClick={logOut}
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
                            <Link
                                className={
                                    props.where === "Home"
                                        ? "navigation--link_active"
                                        : "navigation--link"
                                }
                                to="/home"
                            >
                                Home
                            </Link>

                            <Link
                                className={
                                    props.where === "Charts"
                                        ? "navigation--link_active"
                                        : "navigation--link"
                                }
                                to="/charts"
                            >
                                Charts
                            </Link>

                            <Link
                                className={
                                    props.where === "Tools"
                                        ? "navigation--link_active"
                                        : "navigation--link"
                                }
                                to="/tools"
                            >
                                Tools
                            </Link>

                            <Link
                                className={
                                    props.isProfile
                                        ? "navigation--link_active"
                                        : "navigation--link"
                                }
                                to="/profile"
                                style={{ marginRight: "3rem" }}
                            >
                                Profile
                            </Link>

                            <MainButton onClick={logOut}>Log Out</MainButton>
                        </div>
                    </ul>
                </div>
            </nav>
        );
    }
};

const mapStateToProps = (state) => {
    return { logout: state.logOut, user: state.checkLogin };
};

export default connect(mapStateToProps, { logOut, checkLogin })(Header);
