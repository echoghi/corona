import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const Message = styled.div`
    background: #fff;
    color: #f84745;
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
    return (
        <Message>
            <FontAwesomeIcon icon={faExclamationTriangle} size="5x" color="#f84745" />
            <h1>oooooops</h1>
            <p>Something went wrong, please try again...</p>
        </Message>
    );
}
