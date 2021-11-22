import { useTheme } from "context/themeCtx";
import React, { Component, useEffect } from "react";

const News = () => {
    const { darkMode } = useTheme();
    useEffect(() => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
        script.innerHTML = JSON.stringify({
            colorTheme: darkMode ? "dark" : "light",
            isTransparent: false,
            width: "510",
            height: "600",
            locale: "en",
            importanceFilter: "-1,0,1",
        });
        document.getElementById("fxcalendar").appendChild(script);
    }, []);

    return <div id="fxcalendar"></div>;
};

export default News;
