import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '@echoghi/hooks';
import useTheme from '../hooks/useTheme';
import theme from '../lib/theme';

export const DarkModeContext = createContext();
export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useLocalStorage('isDark', false);

    useTheme(theme, darkMode);

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export const useDarkMode = () => useContext(DarkModeContext);
