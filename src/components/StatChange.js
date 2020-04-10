import React from 'react';
import styled from 'styled-components';
import { getPercentageChange } from '../lib/util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const Difference = styled.span`
    font-size: 0.8rem;
    margin: 0.5rem;
    color: #1a1053;
`;

const Percentage = styled.span`
    padding: 0 0.5rem;
    font-weight: bold;
`;

export default function StatChange({ current, old, upColor, downColor }) {
    const percentChange = getPercentageChange(old, current);

    function ChangeIcon() {
        if (!percentChange) return null;

        if (percentChange > 0) {
            return <FontAwesomeIcon icon={faCaretUp} color={upColor} size="lg" />;
        } else {
            return <FontAwesomeIcon icon={faCaretDown} color={downColor} size="lg" />;
        }
    }

    return (
        <Difference>
            <Percentage>{`${percentChange}%`}</Percentage>
            <ChangeIcon percent={percentChange} />
        </Difference>
    );
}
