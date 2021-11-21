import React, { Component, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";

// component imports
import Landing from "./pages/home/Landing";
import Dashboard from "./pages/dashboard/Dashboard";
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
import Sidebar from "components/Sidebar";
import ContentWrapper from "components/ContentWrapper";
import ProtectedRoute from "components/ProtectedRoute";
import Browse from "pages/browse/Browse";

const App = (props) => {
    useAsyncEffect(async () => {
        await props.checkLogin();
        console.log(props);
    }, []);

    return (
        <main>
            <CssBaseline />

            <Sidebar />
            <Switch>
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

                <ProtectedRoute
                    exact
                    path={["/", "/dashboard"]}
                    render={(props) => <Dashboard {...props} />}
                ></ProtectedRoute>

                <ProtectedRoute
                    path="/browse"
                    render={(props) => <Browse {...props} />}
                ></ProtectedRoute>

                <ProtectedRoute
                    exact
                    path="/profile/:otheruser"
                    render={(props) => <OtherProfile {...props} />}
                ></ProtectedRoute>

                <ProtectedRoute
                    exact
                    path="/profile"
                    render={(props) => <Profile {...props} />}
                ></ProtectedRoute>

                <ProtectedRoute
                    exact
                    path="/postIdea"
                    render={(props) => <PostIdea {...props} />}
                ></ProtectedRoute>

                <ProtectedRoute
                    exact
                    path="/postTrade"
                    render={(props) => <PostTrade {...props} />}
                ></ProtectedRoute>
                <ProtectedRoute
                    exact
                    path="/tools"
                    render={(props) => <Tools {...props} />}
                ></ProtectedRoute>

                <ProtectedRoute component={NotFound} />
            </Switch>
        </main>
    );
};

const mapStateToProps = (state) => {
    return { user: state.checkLogin };
};
export default connect(mapStateToProps, { checkLogin })(App);
