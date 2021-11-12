import React from "react";

const MainButton = ({ children, onClick, ...props }) => {
    return (
        <button className="mainbutton" onClick={onClick} {...props}>
            {children}
        </button>
    );
};

export default MainButton;
