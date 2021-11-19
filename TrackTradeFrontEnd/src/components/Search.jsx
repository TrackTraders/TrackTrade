import { InputAdornment, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const Search = ({ placeholder, handleSearch, width, style }) => {
    const styles = makeStyles(() => ({
        search: {
            borderRadius: "0.4rem",
            // backgroundColor: theme.palette.background.paper,
            boxShadow: "0px 2px 3px rgba(0,0,0,0.0.5)",
            marginLeft: 0,
            width: width ? width : 300,
            height: "auto",
            alignSelf: "center",
            // border: `1px solid ${theme.palette.text.border}`,
            ...style,
        },
        field: {
            height: "auto",
            width: "100%",
            margin: "0 !important",
            padding: "0 !important",
            "& > *": {
                paddingLeft: "0",
                fontSize: "1.4rem",
            },
        },
        searchIcon: {
            height: "100%",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // fill: theme.palette.text.primary,
            "& > *": {
                width: "1.6rem",
            },
        },
    }));
    const classes = styles();
    return (
        <div className={classes.search}>
            <TextField
                className={classes.field}
                placeholder={placeholder}
                onChange={(e) => handleSearch(e)}
                size="small"
                variant="outlined"
                InputProps={{
                    startAdornment: (
                        <InputAdornment
                            className={classes.searchIcon}
                            position="start"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="23.237"
                                viewBox="0 0 24 23.237"
                            >
                                <path d="M21.75,23.026l-3.964-3.963a10.81,10.81,0,1,1,1.937-2.14l4.066,4.065a.721.721,0,0,1,0,1.019l-1.02,1.019a.718.718,0,0,1-1.019,0ZM2.883,10.811a7.928,7.928,0,1,0,7.929-7.927A7.937,7.937,0,0,0,2.883,10.811Z" />
                            </svg>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};

export default Search;
