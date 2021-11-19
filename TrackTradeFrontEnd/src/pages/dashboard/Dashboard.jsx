import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CustomPie from "components/charts/Pie";
import ContentWrapper from "components/ContentWrapper";
import Flex from "components/Flex";
import News from "pages/tools/News";
import React from "react";
import { Link } from "react-router-dom";
import TradingviewWidget, { Themes } from "react-tradingview-widget";

const Dashboard = () => {
    return (
        <ContentWrapper contentStyle={{ paddingTop: "60px" }}>
            <Flex sx={{ flexDirection: "column", marginLeft: "50px" }}>
                <Flex sx={{ justifyContent: "space-between" }}>
                    <Paper
                        elevation={4}
                        id="tradingview-widget-container"
                        style={{ width: "70%" }}
                    >
                        <TradingviewWidget
                            symbol="CURRENCYCOM:US30"
                            locale="en"
                            autosize
                        />
                    </Paper>
                    <Flex
                        sx={{
                            flexDirection: "column",
                            width: "25%",
                            justifyContent: "space-between",
                            height: "450px",
                        }}
                    >
                        <Paper
                            elevation={4}
                            style={{
                                height: "250px",
                                width: "100%",
                                borderRadius: "3px",
                            }}
                        >
                            <Flex
                                sx={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    width: "100%",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "2.8rem",
                                        fontWeight: "600",
                                        py: "1rem",
                                    }}
                                >
                                    Quick Actions
                                </Typography>
                                <hr
                                    style={{
                                        borderTop: "2px solid #22222225",
                                        marginBottom: "1rem",
                                        width: "100%",
                                    }}
                                />
                                <Link
                                    to="/profile/post-idea"
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: "#1985d8",
                                            fontSize: "2rem",
                                            textAlign: "center",
                                            padding: "1rem 0",

                                            "&:hover": {
                                                backgroundColor: "#eee",
                                            },
                                        }}
                                    >
                                        Post Idea
                                    </Typography>
                                </Link>
                                <Link
                                    to="/profile/post-trade"
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: "#1985d8",
                                            fontSize: "2rem",
                                            textAlign: "center",
                                            padding: "1rem 0",

                                            "&:hover": {
                                                backgroundColor: "#eee",
                                            },
                                        }}
                                    >
                                        Post Trade
                                    </Typography>
                                </Link>
                                <Link
                                    to="/profile/stats"
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: "#1985d8",
                                            fontSize: "2rem",
                                            textAlign: "center",
                                            padding: "1rem 0",

                                            "&:hover": {
                                                backgroundColor: "#eee",
                                            },
                                        }}
                                    >
                                        View Stats
                                    </Typography>
                                </Link>
                            </Flex>
                        </Paper>
                        <Paper
                            elevation={4}
                            style={{
                                height: "150px",
                                width: "100%",
                                borderRadius: "3px",
                            }}
                        >
                            <Flex
                                sx={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "100%",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "2.2rem",
                                        fontWeight: "600",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    Equity in the last 30 days
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "2.4rem",
                                        fontWeight: "600",
                                        marginTop: "1rem",
                                        color: "#2c1",
                                    }}
                                >
                                    $1024.41
                                </Typography>
                            </Flex>
                        </Paper>
                    </Flex>
                </Flex>
                <Flex sx={{ justifyContent: "space-between" }}>
                    <Paper
                        elevation={4}
                        style={{
                            width: "50%",
                            height: "395px",
                            marginTop: "6rem",
                        }}
                    >
                        <News />
                    </Paper>
                    <Paper
                        elevation={4}
                        style={{
                            height: "395px",
                            width: "45%",
                            borderRadius: "3px",
                            marginTop: "6rem",
                        }}
                    >
                        <Flex
                            sx={{
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "3rem",
                                    fontWeight: "600",
                                    marginTop: "2rem",
                                }}
                            >
                                Win/Loss Ratio
                            </Typography>
                            <Box
                                sx={{
                                    height: "300px",
                                    width: "50%",
                                    fontSize: "1.8rem",
                                }}
                            >
                                <CustomPie />
                            </Box>
                        </Flex>
                    </Paper>
                </Flex>
            </Flex>
        </ContentWrapper>
    );
};

export default Dashboard;
