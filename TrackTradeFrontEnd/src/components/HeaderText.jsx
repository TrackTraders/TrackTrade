import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
const useStyles = makeStyles((theme) => ({
    text: {
        fontSize: "3rem",
        fontWeight: "600",
        color: "#000",
        marginBottom: "3rem",
    },
}));
export default function HeaderText({ value }) {
    const classes = useStyles();
    return (
        <Typography className={classes.text} variant="h4">
            {value}
        </Typography>
    );
}
