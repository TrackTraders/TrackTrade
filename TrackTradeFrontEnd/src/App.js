import React, { Component, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";

// component imports
import Landing from "./pages/home/Landing";
import Home from "./pages/home/Home";
import NotFound from "./pages/404/NotFound.js";
import SignUp from "./pages/auth/SignUp";
import LogIn from "./pages/auth/LogIn";
import PostIdea from "./pages/profile/PostIdea";
import PostTrade from "./pages/profile/PostTrade";
import Profile from "./pages/profile/Profile";
import OtherProfile from "./pages/profile/OtherProfile";
import actions from "./services/index";
import Tools from "./pages/tools/Tools";

// redux imports
import { connect } from "react-redux";
import { checkLogin } from "./actions/auth";
import { useAsyncEffect } from "./hooks/use-async-effect";
import Charts from "pages/charts/Charts";

const App = (props) => {
    useAsyncEffect(async () => {
        await props.checkLogin();
        console.log(props);
    }, []);

    return (
        <main>
            <CssBaseline />
            {props.user?.data ? (
                <Switch>
                    <Route
                        exact
                        path={["/", "/home"]}
                        render={(props) => <Home {...props} />}
                    ></Route>

                    <Route
                        exact
                        path="/sign-up"
                        render={(props) => <SignUp {...props} />}
                    ></Route>

                    <Route
                        exact
                        path="/log-in"
                        render={(props) => <LogIn {...props} />}
                    ></Route>

                    <Route
                        exact
                        path="/profile/:otheruser"
                        render={(props) => <OtherProfile {...props} />}
                    ></Route>

                    <Route
                        exact
                        path="/profile"
                        render={(props) => <Profile {...props} />}
                    ></Route>

                    <Route
                        exact
                        path="/postIdea"
                        render={(props) => <PostIdea {...props} />}
                    ></Route>

                    <Route
                        exact
                        path="/postTrade"
                        render={(props) => <PostTrade {...props} />}
                    ></Route>

                    <Route
                        exact
                        path="/charts"
                        render={(props) => <Charts {...props} />}
                    ></Route>
                    <Route
                        exact
                        path="/tools"
                        render={(props) => <Tools {...props} />}
                    ></Route>

                    <Route component={NotFound} />
                </Switch>
            ) : (
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={(props) => <Landing {...props} />}
                    ></Route>

                    <Route
                        exact
                        path="/home"
                        render={(props) => <Landing {...props} />}
                    ></Route>

                    <Route
                        exact
                        path="/sign-up"
                        render={(props) => <SignUp {...props} />}
                    ></Route>

                    <Route
                        exact
                        path="/log-in"
                        render={(props) => <LogIn {...props} />}
                    ></Route>

                    <Route
                        exact
                        path="/profile/:otheruser"
                        render={(props) => <LogIn {...props} />}
                    ></Route>

                    <Route
                        exact
                        path="/profile"
                        render={(props) => <LogIn {...props} />}
                    ></Route>

                    <Route
                        exact
                        path="/postIdea"
                        render={(props) => <LogIn {...props} />}
                    ></Route>

                    <Route
                        exact
                        path="/postTrade"
                        render={(props) => <LogIn {...props} />}
                    ></Route>

                    <Route
                        exact
                        path="/tools"
                        render={(props) => <LogIn {...props} />}
                    ></Route>

                    <Route component={NotFound} />
                </Switch>
            )}
        </main>
    );
};

const mapStateToProps = (state) => {
    return { user: state.checkLogin };
};
export default connect(mapStateToProps, { checkLogin })(App);
