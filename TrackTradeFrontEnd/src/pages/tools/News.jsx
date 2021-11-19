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

// <!-- TradingView Widget BEGIN -->
{
    /* <div class="tradingview-widget-container">
  <div class="tradingview-widget-container__widget"></div>
  <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/markets/currencies/economic-calendar/" rel="noopener" target="_blank"><span class="blue-text">Economic Calendar</span></a> by TradingView</div>
  <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-events.js" async>
  {
  "width": "100%",
  "height": "100%",
  "colorTheme": "dark",
  "isTransparent": false,
  "locale": "en",
  "importanceFilter": "-1,0,1"
}
  </script>
</div> */
}
// <!-- TradingView Widget END -->
