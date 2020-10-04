import React from 'react';
import { useDarkMode } from '@context';

const Footer = () => {
    const { darkMode } = useDarkMode();
    const className = darkMode ? 'dark' : undefined;

    return (
        <footer className={className}>
            <div>
                <p>&copy; {new Date().getFullYear()}, Emile Choghi</p>
            </div>
        </footer>
    );
};

export default Footer;
