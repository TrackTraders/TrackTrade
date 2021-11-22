import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
};

const CustomThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggle = () => {
        setDarkMode((prev) => !prev);
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default CustomThemeProvider;
