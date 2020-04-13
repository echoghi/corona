import React from 'react';
import styled from 'styled-components';
import theme from '../lib/theme';

const Container = styled.footer`
    color: ${props => (props.darkMode ? theme.white.primary : theme.dark.primary)};
`;

const Footer = ({ darkMode, lastUpdated = '' }) => {
    return (
        <Container darkMode={darkMode}>
            <div>
                <p>Last Updated: {lastUpdated}</p>
            </div>
        </Container>
    );
};

export default Footer;
