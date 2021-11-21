import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import { logOut, checkLogin } from "../actions/auth";
import { useAsyncEffect } from "../hooks/use-async-effect";
import Flex from "./Flex";
import Logo from "./Logo";
import { Icon, Tooltip, Typography } from "@mui/material";
import {
    Home as HomeIcon,
    Person as PersonIcon,
    Chat as ChatIcon,
    Search as SearchIcon,
    Info as InfoIcon,
    Logout as LogoutIcon,
} from "@mui/icons-material";

const Sidebar = (props) => {
    const history = useHistory();
    const location = useLocation();

    useAsyncEffect(async () => {
        await props.checkLogin();
    }, []);

    const isDashboard =
        location.pathname === "/" || location.pathname === "/dashboard";

    const logOut = async () => {
        await props.logOut();
        await props.checkLogin();
        history.push("/");
    };

    const topSidebarObj = [
        { text: "Dashboard", path: "/dashboard", icon: <HomeIcon /> },
        { text: "Profile", path: "/profile", icon: <PersonIcon /> },
        { text: "Messages", path: "/messages", icon: <ChatIcon /> },
        { text: "Browse", path: "/browse/all-ideas", icon: <SearchIcon /> },
    ];

    const bottomSidebarObj = [
        { text: "Info", path: "/info", icon: <InfoIcon /> },
        { text: "Logout", path: logOut, icon: <LogoutIcon /> },
    ];

    if (props.user?.data) {
        return (
            <nav
                className="sidebar"
                style={{ width: `${isDashboard ? "180px" : "80px"}` }}
            >
                <Flex
                    sx={{
                        flexDirection: "column",
                        alignItems: `${isDashboard ? "flex-start" : "center"}`,
                    }}
                >
                    {isDashboard ? (
                        <Flex
                            sx={{
                                flexDirection: "column",
                                alignItems: "center",
                                alignSelf: "center",
                                height: "56px",
                                marginBottom: "2rem",
                            }}
                        >
                            <div className="logo-text">
                                Track
                                <br />
                                Trade
                            </div>
                        </Flex>
                    ) : (
                        <Flex
                            sx={{
                                flexDirection: "column",
                                alignItems: "center",
                                alignSelf: "center",
                                height: "56px",
                                marginBottom: "2rem",
                            }}
                        >
                            <Logo />
                        </Flex>
                    )}
                    <Flex
                        sx={{
                            flexDirection: "column",
                            justifyContent: "space-between",
                            height: "calc(100vh - 116px)",
                        }}
                    >
                        <Flex
                            sx={{
                                flexDirection: "column",
                                alignItems: `${
                                    isDashboard ? "flex-start" : "center"
                                }`,
                            }}
                        >
                            {topSidebarObj.map((each) => {
                                if (!isDashboard) {
                                    return (
                                        <Tooltip
                                            title={each.text}
                                            placement="right"
                                            arrow
                                        >
                                            <Link
                                                className={`${
                                                    location.pathname.includes(
                                                        each.path.split("/")[1]
                                                    ) ||
                                                    (location.pathname ===
                                                        "/" &&
                                                        each.path ===
                                                            "/dashboard")
                                                        ? "sidebar-link_selected"
                                                        : "sidebar-link"
                                                }`}
                                                to={each.path}
                                            >
                                                <Flex
                                                    sx={{
                                                        alignItems: "center",
                                                        height: "40px",
                                                        margin: ".5rem 0",
                                                    }}
                                                >
                                                    <Icon
                                                        sx={{
                                                            fontSize:
                                                                "2.4rem !important",
                                                            "& > *": {
                                                                fontSize:
                                                                    "2.4rem !important",
                                                            },
                                                        }}
                                                    >
                                                        {each.icon}
                                                    </Icon>
                                                </Flex>
                                            </Link>
                                        </Tooltip>
                                    );
                                } else {
                                    return (
                                        <Link
                                            className={`${
                                                location.pathname.includes(
                                                    each.path
                                                ) ||
                                                (location.pathname === "/" &&
                                                    each.path === "/dashboard")
                                                    ? "sidebar-link_selected"
                                                    : "sidebar-link"
                                            }`}
                                            to={each.path}
                                        >
                                            <Flex
                                                sx={{
                                                    alignSelf: "flex-start",
                                                    alignItems: "center",
                                                    height: "40px",
                                                    margin: ".5rem 0",
                                                }}
                                            >
                                                <Icon
                                                    sx={{
                                                        fontSize:
                                                            "2.4rem !important",
                                                        "& > *": {
                                                            fontSize:
                                                                "2.4rem !important",
                                                        },
                                                    }}
                                                >
                                                    {each.icon}
                                                </Icon>
                                                <Typography
                                                    style={{
                                                        paddingLeft: "1rem",
                                                        fontSize: "2rem",
                                                    }}
                                                >
                                                    {each.text}
                                                </Typography>
                                            </Flex>
                                        </Link>
                                    );
                                }
                            })}
                        </Flex>
                        <Flex
                            sx={{
                                flexDirection: "column",
                                alignItems: `${
                                    isDashboard ? "flex-start" : "center"
                                }`,
                            }}
                        >
                            {/* Info */}
                            {!isDashboard ? (
                                <Tooltip title={"Info"} placement="right" arrow>
                                    <Link
                                        className={`${
                                            location.pathname.includes("/info")
                                                ? "sidebar-link_selected"
                                                : "sidebar-link"
                                        }`}
                                        to="/info"
                                        style={{
                                            height: "40px",
                                            margin: ".5rem 0",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Icon
                                            sx={{
                                                fontSize: "2.4rem !important",

                                                "& > *": {
                                                    fontSize:
                                                        "2.4rem !important",
                                                },
                                            }}
                                        >
                                            <InfoIcon />
                                        </Icon>
                                    </Link>
                                </Tooltip>
                            ) : (
                                <Link
                                    className={`${
                                        location.pathname.includes("/info")
                                            ? "sidebar-link_selected"
                                            : "sidebar-link"
                                    }`}
                                    to={"/info"}
                                >
                                    <Flex
                                        sx={{
                                            alignSelf: "flex-start",
                                            alignItems: "center",
                                            height: "40px",
                                            margin: ".5rem 0",
                                        }}
                                    >
                                        <Icon
                                            sx={{
                                                fontSize: "2.4rem !important",
                                                "& > *": {
                                                    fontSize:
                                                        "2.4rem !important",
                                                },
                                            }}
                                        >
                                            <InfoIcon />
                                        </Icon>
                                        <Typography
                                            style={{
                                                paddingLeft: "1rem",
                                                fontSize: "2rem",
                                            }}
                                        >
                                            Info
                                        </Typography>
                                    </Flex>
                                </Link>
                            )}
                            {/* Logout */}
                            {!isDashboard ? (
                                <Tooltip
                                    title="Log Out"
                                    placement="right"
                                    arrow
                                >
                                    <Icon
                                        className="sidebar-link"
                                        sx={{
                                            height: "40px",
                                            margin: ".5rem 0",
                                            fontSize: "2.4rem !important",
                                            display: "flex",
                                            alignItems: "center",

                                            "&:hover": {
                                                cursor: "pointer",
                                            },

                                            "& > *": {
                                                fontSize: "2.4rem !important",
                                            },
                                        }}
                                        onClick={logOut}
                                    >
                                        <LogoutIcon />
                                    </Icon>
                                </Tooltip>
                            ) : (
                                <div className="sidebar-link" onClick={logOut}>
                                    <Flex
                                        sx={{
                                            alignSelf: "flex-start",
                                            alignItems: "center",
                                            height: "40px",
                                            margin: ".5rem 0",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Icon
                                            sx={{
                                                fontSize: "2.4rem !important",
                                                "& > *": {
                                                    fontSize:
                                                        "2.4rem !important",
                                                },
                                            }}
                                        >
                                            <LogoutIcon />
                                        </Icon>
                                        <Typography
                                            style={{
                                                paddingLeft: "1rem",
                                                fontSize: "2rem",
                                            }}
                                        >
                                            Log Out
                                        </Typography>
                                    </Flex>
                                </div>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </nav>
        );
    } else {
        return null;
    }
};

const mapStateToProps = (state) => {
    return { logout: state.logOut, user: state.checkLogin };
};

export default connect(mapStateToProps, { logOut, checkLogin })(Sidebar);
