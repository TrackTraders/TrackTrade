import React from "react";
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
    Rectangle,
} from "recharts";

const CustomBar = () => {
    const data = [
        { name: "EUR/USD", amount: 124.32 },
        { name: "EUR/GBP", amount: 22.13 },
        { name: "USD/CAD", amount: -57.45 },
        { name: "US30", amount: 231.12 },
        { name: "NAS100", amount: 31.12 },
    ];

    const CustomBarShape = (props) => {
        const { amount } = props;
        let fill;
        //business logic here to update fill color explicitly
        if (amount > 0) {
            fill = "#2c1";
        } else {
            fill = "#c21";
        }

        //use explicit fill here, or use the additional css class and make a css selector to update fill there
        return <Rectangle {...props} fill={fill} />;
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <ReferenceLine y={0} stroke="#000" />
                <Bar dataKey="amount" shape={CustomBarShape} barSize={40} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default CustomBar;
