import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import theme from '@theme';

export const CloseIcon = styled(FontAwesomeIcon)`
    position: fixed;
    top: 15px;
    right: 15px;
    display: block;
    cursor: pointer;

    @media (min-width: 768px) {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 0.8rem;
    }
`;

export const Container = styled.div`
    position: absolute;
    background: ${(props) => (!props.darkMode ? theme.white.primary : theme.dark.secondary)};
    border-radius: 0.5rem;
    z-index: 999999;
    text-align: left;
    box-sizing: border-box;
    color: ${(props) => (props.darkMode ? theme.white.primary : theme.colors.purpleDark)};
    transition: ${theme.transitions.darkMode};
    font-size: 0.7rem;
    font-weight: bold;
    padding: 1rem;
    margin: 0;
    left: 270px;
    top: 37px;

    h2 {
        margin: 0;
        padding: 0;
        text-align: center;
    }

    @media (max-width: 767px) {
        position: fixed;
        display: flex;
        justify-content: center;
        border-radius: 0;
        align-items: center;
        height: 100vh;
        width: 100vw;
        left: 0;
        right: 0;
        top: 0;
        left: 0;
        text-align: center;
    }
`;

export const Header = styled.h2`
    margin: 0;

    @media (max-width: 767px) {
        font-size: 50px;
        text-align: center;
    }
`;

export const List = styled.ul`
    list-style: none;
    padding: 0;
    color: ${(props) => (props.darkMode ? theme.white.primary : '#f9345e')};
`;

export const ListItem = styled.li`
    list-style: none;
    padding: 2.5px 0;

    span {
        color: ${(props) => (props.darkMode ? theme.white.primary : theme.colors.purpleDark)};
    }

    @media (max-width: 767px) {
        font-size: 30px;
        padding: 1rem 0;
        text-align: center;
    }
`;
