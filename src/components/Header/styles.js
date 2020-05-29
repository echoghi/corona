import styled from 'styled-components';
import theme from '@theme';

export const Heading = styled.h1`
    color: ${(props) => (!props.darkMode ? '#6135fc' : theme.white.primary)};

    font-size: 35px;
    margin: 2rem 0;
    font-weight: bold;
    align-items: center;
    display: flex;

    @media (max-width: 767px) {
        font-size: 20px;
    }
`;

export const Container = styled.div`
    grid-column-start: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Wrapper = styled.header`
    transition: ${theme.transitions.darkMode};
    background: ${(props) => (!props.darkMode ? theme.white.primary : theme.dark.primary)};
    z-index: 9999;

    @media (max-width: 767px) {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        padding: 0 15px;
    }
`;
