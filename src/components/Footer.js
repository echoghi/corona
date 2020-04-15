import React from 'react';
import styled from 'styled-components';
import theme from '../lib/theme';

const Container = styled.footer`
    color: ${props => (props.darkMode ? theme.white.primary : theme.dark.primary)};
    width: 100%;
    margin: 2rem 0;
    height: 2em;
    line-height: 2em;
    text-align: center;

    p {
        font-size: 1em;
        margin: 0;
    }

    @media (max-width: 767px) {
        margin: 8rem 0;
    }
`;

const Footer = ({ darkMode }) => {
    return (
        <Container darkMode={darkMode}>
            <div>
                <p>&copy; {new Date().getFullYear()}, Emile Choghi</p>
            </div>
        </Container>
    );
};

export default Footer;
