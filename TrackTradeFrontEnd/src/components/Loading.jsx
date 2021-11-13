import { CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <CircularProgress size={52} />
        </div>
    );
};

export default Loading;
