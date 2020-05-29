import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from '@context';
import { Message } from './styles';

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
