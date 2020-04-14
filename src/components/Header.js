import React from 'react';
import { Link } from 'gatsby';
import { connect } from 'react-redux';
import styled from 'styled-components';
import DarkMode from './DarkMode';
import theme from '../lib/theme';

const Heading = styled.h1`
    color: ${props => (!props.darkMode ? '#6135fc' : theme.white.primary)};
    transition: color 0.2s ease;

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
    @media (max-width: 767px) {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        padding: 0 15px;
    }
`;

const mapStateToProps = state => ({
    darkMode: state.darkMode
});

const Header = ({ darkMode }) => {
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

export default connect(mapStateToProps)(Header);
