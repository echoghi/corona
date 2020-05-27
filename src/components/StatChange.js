import React from 'react';
import styled from 'styled-components';
import { getPercentageChange } from '../lib/util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import theme from '../lib/theme';
import { useDarkMode } from '../context';

const Difference = styled.span`
    font-size: 0.8rem;
    margin: 0.5rem;
    color: ${(props) => (!props.darkMode ? '#1a1053' : theme.white.primary)};
`;

const Percentage = styled.span`
    padding: 0 0.5rem;
    font-weight: bold;
`;

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
        <Difference darkMode={darkMode}>
            <Percentage>{percentChange === 0 ? '---' : `${percentChange}%`}</Percentage>
            <ChangeIcon percent={percentChange} />
        </Difference>
    );
}

export default StatChange;
