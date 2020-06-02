import React from 'react';
import DarkMode from '@components/DarkMode';
import { useDarkMode } from '@context';
import { Wrapper, Container, Heading } from './styles';

const Header = () => {
    const { darkMode } = useDarkMode();

    return (
        <Wrapper darkMode={darkMode} data-testid="app-header">
            <Container>
                <Heading darkMode={darkMode} data-testid="app-heading">
                    <span>Covid-19</span>
                </Heading>
                <DarkMode />
                {/* <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/page-2/">Page 2</Link>
                    </li>
                </ul> */}
            </Container>
        </Wrapper>
    );
};

export default Header;
