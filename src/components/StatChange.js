import React from 'react';
import { getPercentageChange } from '@lib/util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from '@context';

function StatChange({ current, old, upColor, downColor }) {
    const { darkMode } = useDarkMode();
    let percentChange;

    if (!old && !current) {
        percentChange = '---';
    } else {
        percentChange = getPercentageChange(old, current);
    }

    function ChangeIcon() {
        if (!percentChange || typeof percentChange === 'string') return null;

        if (percentChange > 0) {
            return <FontAwesomeIcon icon={faCaretUp} color={upColor} size="lg" />;
        } else {
            return <FontAwesomeIcon icon={faCaretDown} color={downColor} size="lg" />;
        }
    }

    return (
        <span className={darkMode ? 'stat__difference dark' : 'stat__difference'}>
            <span className="stat__percentage">{percentChange === 0 ? '---' : `${percentChange}%`}</span>
            <ChangeIcon percent={percentChange} />
        </span>
    );
}

export default StatChange;
