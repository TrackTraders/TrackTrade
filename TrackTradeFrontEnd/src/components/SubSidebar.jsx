import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
    List,
    ListItem,
    ListItemText,
    Paper,
    Slide,
    Box,
    Typography,
    Divider,
} from "@mui/material";

export default function SubSideBar({ obj, loc, header }) {
    const history = useHistory();
    const location = useLocation();
    const [selected, setSelected] = useState(location.pathname);
    const handleOnClick = useCallback(
        (text) => history.push(`/${loc}/${text}`),
        [history, loc]
    );
    useEffect(() => {
        setSelected(location.pathname);
    }, [location]);

    const showItems = () => {
        return obj.map((each, i) => (
            <ListItem
                className={
                    selected.split("/")[2] === each.url
                        ? "subsidebar-item_selected"
                        : "subsidebar-item"
                }
                selected={selected.split("/")[2] === each.url}
                style={{ fontSize: "15px" }}
                onClick={() => handleOnClick(each.url)}
                button
                key={i}
            >
                {console.log(selected.split("/"), each.url)}
                <ListItemText primary={each.text} disableTypography />
            </ListItem>
        ));
    };
    return (
        <Slide in={true} out={true} direction="right">
            <Box className="subsidebar">
                <List padding="0">
                    <Box
                        style={{
                            marginBottom: "2rem",
                        }}
                    >
                        <Typography className="subsidebar-header" variant="h4">
                            {header}
                        </Typography>
                        <Divider sx={{ borderColor: "#ffffff50" }} />
                    </Box>
                    {showItems()}
                </List>
            </Box>
        </Slide>
    );
}
