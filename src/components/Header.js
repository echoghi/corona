import React from 'react';
import DarkMode from '@components/DarkMode';
import { useDarkMode } from '@context';

const Header = () => {
    const { darkMode } = useDarkMode();
    const className = darkMode ? 'dark' : undefined;

    return (
        <header className={className} data-testid="app-header">
            <div>
                <h1 data-testid="app-heading">
                    <span>Covid-19</span>
                </h1>
                <DarkMode tabIndex="0" />
                {/* <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/page-2/">Page 2</Link>
                    </li>
                </ul> */}
            </div>
        </header>
    );
};

export default Header;
