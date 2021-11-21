import React, { Component, useEffect } from "react";

const Chart = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://s3.tradingview.com/tv.js";
        document.getElementById("tvchart").appendChild(script);
    }, []);

    return <div id="tvchart"></div>;
};

export default Chart;
