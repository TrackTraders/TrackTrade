import React, { Component, useEffect } from "react";

const NewsAlert = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://widgets.myfxbook.com/scripts/fxCalendar.js";
        document.getElementById("fxcalendar").appendChild(script);
    }, []);
    return <div id="fxcalendar"></div>;
};

export default NewsAlert;
