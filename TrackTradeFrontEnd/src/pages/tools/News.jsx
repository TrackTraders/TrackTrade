import React, { Component, useEffect } from "react";

const News = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
        document.getElementById("fxcalendar").appendChild(script);
    }, []);

    return <div id="fxcalendar"></div>;
};

export default News;
