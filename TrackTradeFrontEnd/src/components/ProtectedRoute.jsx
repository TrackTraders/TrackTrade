import { useAsyncEffect } from "hooks/use-async-effect";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Route as BaseRoute, Redirect, useLocation } from "react-router-dom";
import { checkLogin } from "actions/auth";
import Loading from "./Loading";
import Flex from "./Flex";

const ProtectedRoute = ({ path, children, exact, ...props }) => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useAsyncEffect(async () => {
        try {
            await props.checkLogin();
            console.log("logged in", props);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return (
            <div
                style={{
                    height: "100vh",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Loading />
            </div>
        );
    } else if (!props.user?.data) {
        return (
            <Redirect
                to={{
                    pathname: "/log-in",
                    state: { referrer: location },
                }}
            />
        );
    }

    return (
        <BaseRoute path={path} exact={exact} {...props}>
            {children}
        </BaseRoute>
    );
};

const mapStateToProps = (state) => {
    return { user: state.checkLogin };
};
export default connect(mapStateToProps, { checkLogin })(ProtectedRoute);
