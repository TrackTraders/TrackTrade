import { Backdrop, Fade, Modal, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const CustomModal = ({ children, ...rest }) => {
    const useStyles = makeStyles(() => ({
        backdrop: { zIndex: 9999 },
    }));

    const classes = useStyles();
    return (
        <Modal
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
                classes: {
                    root: classes.backdrop,
                },
            }}
            disableScrollLock
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            {...rest}
        >
            <Fade in={rest.open}>
                <Paper sx={{ zIndex: 10000 }}>{children}</Paper>
            </Fade>
        </Modal>
    );
};

export default CustomModal;
