import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVirus } from '@fortawesome/free-solid-svg-icons';

export default function LoadingSpinner({ fullPage, ...props }) {
    const fullPageClass = fullPage ? ' full-page' : '';

    return (
        <div className={`loading-container${fullPageClass}`} fullPage={fullPage} {...props}>
            <FontAwesomeIcon className="loading-spinner" icon={faVirus} color="#6dd428" size="5x" />
        </div>
    );
}
