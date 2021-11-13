import Header from "pages/partials/Header";
import React, { useEffect } from "react";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

const Charts = (props) => {
    return (
        <div>
            <Header where="Charts" {...props} loggedIn={true} />
            <div id="charts">
                <div id="tradingview-widget-container">
                    <TradingViewWidget
                        symbol="CURRENCYCOM:US30"
                        theme={Themes.DARK}
                        locale="en"
                        autosize
                    />
                </div>
            </div>
        </div>
    );
};

export default Charts;
