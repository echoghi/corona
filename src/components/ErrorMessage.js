import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from '../context';
import theme from '../lib/theme';

const Message = styled.div`
    background: ${(props) => (props.darkMode ? theme.dark.primary : theme.white.primary)};
    color: ${(props) => (props.darkMode ? theme.white.primary : '#f84745')};
    position: relative;
    display: grid;
    align-items: center;
    align-content: center;
    height: 100vh;
    width: 100vw;
    text-align: center;
    justify-content: center;

    svg {
        margin: 0 auto;
    }

    p {
        color: #878787;
    }
`;

export default function ErrorMessage() {
    const { darkMode } = useDarkMode();

    return (
        <Message darkMode={darkMode}>
            <FontAwesomeIcon icon={faExclamationTriangle} size="5x" color="#f84745" />
            <h1>oooooops</h1>
            <p>Something went wrong, please try again...</p>
        </Message>
    );
}
