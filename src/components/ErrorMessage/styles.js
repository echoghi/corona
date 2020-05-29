import styled from 'styled-components';
import theme from '@theme';

export const Message = styled.div`
    background: ${(props) => (props.darkMode ? theme.dark.primary : theme.white.primary)};
    color: ${(props) => (props.darkMode ? theme.white.primary : '#f84745')};
    position: relative;
    display: grid;
    align-items: center;
    align-content: center;
    height: 100vh;
    width: 100vw;
    text-align: center;
    justify-content: center;

    svg {
        margin: 0 auto;
    }

    p {
        color: #878787;
    }
`;
