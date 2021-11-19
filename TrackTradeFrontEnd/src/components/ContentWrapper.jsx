import React from "react";
import { useLocation } from "react-router";

const ContentWrapper = ({ children, style, contentStyle }) => {
    const location = useLocation();
    const isDashboard =
        location.pathname === "/" || location.pathname === "/dashboard";
    return (
        <div
            className="wrapper"
            style={{
                ...style,
            }}
        >
            <div
                style={{
                    padding: `${
                        isDashboard ? "0 10% 0 200px" : "0 10% 0 100px"
                    }`,
                    width: "100%",
                    transition: "all .1s ease-in",
                    ...contentStyle,
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default ContentWrapper;
