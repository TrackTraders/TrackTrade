import React from "react";
import { makeStyles } from "@mui/styles";
import { TextField } from "@mui/material";

const InputField = (props) => {
    const useStyles = makeStyles(() => ({
        root: {
            "& .MuiFilledInput-root": {
                background: "rgb(232, 241, 250)",
            },
        },
    }));
    const classes = useStyles();
    return <TextField className={classes.root} {...props} />;
};

export default InputField;
