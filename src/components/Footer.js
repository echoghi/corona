import React from 'react';
import { useDarkMode } from '@context';

const Footer = () => {
    const { darkMode } = useDarkMode();

    return (
        <footer className={darkMode ? 'dark' : ''}>
            <div>
                <p>&copy; {new Date().getFullYear()}, Emile Choghi</p>
            </div>
        </footer>
    );
};

export default Footer;
