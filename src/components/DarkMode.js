import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toggleDarkMode } from '../data/actions';
import theme from '../lib/theme';

const Container = styled.div`
    grid-column-start: 2;
`;

const Icon = styled(FontAwesomeIcon)`
    display: block;
    cursor: pointer;
`;

const mapStateToProps = state => ({
    darkMode: state.darkMode
});

const mapDispatchToProps = {
    toggleDarkMode: () => toggleDarkMode()
};

const DarkMode = ({ toggleDarkMode, darkMode }) => {
    const color = darkMode ? theme.white.primary : theme.dark.primary;
    const icon = darkMode ? faSun : faMoon;

    return (
        <Container>
            <Icon color={color} size="lg" icon={icon} onClick={toggleDarkMode} />
        </Container>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DarkMode);
