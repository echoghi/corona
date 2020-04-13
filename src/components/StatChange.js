import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getPercentageChange } from '../lib/util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import theme from '../lib/theme';

const Difference = styled.span`
    font-size: 0.8rem;
    margin: 0.5rem;
    color: ${props => (!props.darkMode ? '#1a1053' : theme.white.primary)};
`;

const Percentage = styled.span`
    padding: 0 0.5rem;
    font-weight: bold;
`;

const mapStateToProps = state => ({
    darkMode: state.darkMode
});

function StatChange({ current, old, upColor, downColor, darkMode }) {
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
        <Difference darkMode={darkMode}>
            <Percentage>{`${percentChange}%`}</Percentage>
            <ChangeIcon percent={percentChange} />
        </Difference>
    );
}

export default connect(mapStateToProps)(StatChange);
