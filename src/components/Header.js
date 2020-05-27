import React from 'react';
import styled from 'styled-components';
import DarkMode from './DarkMode';
import theme from '../lib/theme';
import { useDarkMode } from '../context';

const Heading = styled.h1`
    color: ${(props) => (!props.darkMode ? '#6135fc' : theme.white.primary)};

    font-size: 35px;
    margin: 2rem 0;
    font-weight: bold;
    align-items: center;
    display: flex;

    @media (max-width: 767px) {
        font-size: 20px;
    }
`;

const Container = styled.div`
    grid-column-start: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Wrapper = styled.header`
    transition: ${theme.transitions.darkMode};
    background: ${(props) => (!props.darkMode ? theme.white.primary : theme.dark.primary)};
    z-index: 9999;

    @media (max-width: 767px) {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        padding: 0 15px;
    }
`;

const Header = () => {
    const { darkMode } = useDarkMode();

    return (
        <Wrapper darkMode={darkMode}>
            <Container>
                <Heading darkMode={darkMode}>
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
