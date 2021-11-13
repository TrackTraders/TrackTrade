import React, { Component, useEffect } from "react";

const News = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://widgets.myfxbook.com/scripts/fxCalendar.js";
        script.async = true;
        script.onload = console.log("loaded");
        document.getElementById("fxcalendar").appendChild(script);
    }, []);
    return <div id="fxcalendar"></div>;
};

export default News;
