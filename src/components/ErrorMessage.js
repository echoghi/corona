import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from '@context';

export default function ErrorMessage() {
    const { darkMode } = useDarkMode();
    const className = darkMode ? 'error__message' : 'error__message dark';

    return (
        <div className={className}>
            <FontAwesomeIcon icon={faExclamationTriangle} size="5x" color="#f84745" />
            <h1>oooooops</h1>
            <p>Something went wrong, please try again...</p>
        </div>
    );
}
