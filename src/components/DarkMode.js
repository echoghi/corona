import React from 'react';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import theme from '@theme';
import { useDarkMode } from '@context';

const DarkMode = () => {
    const { darkMode, setDarkMode } = useDarkMode();
    const color = darkMode ? theme.white.primary : theme.dark.primary;
    const icon = darkMode ? faSun : faMoon;

    return (
        <div className="darkmode__container">
            <FontAwesomeIcon
                className="darkmode__icon"
                color={color}
                size="lg"
                icon={icon}
                onClick={() => setDarkMode(!darkMode)}
                data-testid="dark-mode-icon"
            />
        </div>
    );
};

export default DarkMode;
