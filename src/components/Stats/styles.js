import styled from 'styled-components';
import theme from '../../lib/theme';

export const StatBlock = styled.div`
    font-size: 2rem;
    padding: 2rem 3rem;
    border-radius: 1rem;
    display: grid;
    align-items: center;
    justify-items: center;
    text-align: center;
    box-shadow: ${props => (!props.darkMode ? '2px 2px 20px rgba(0, 0, 0, 0.1)' : 'none')};
    transition: box-shadow 0.2s ease;

    h4 {
        margin: 0.5rem 1rem;
        font-size: 20px;
        color: ${props => (!props.darkMode ? '#1a1053' : theme.white.primary)};
    }

    @media (max-width: 767px) {
        display: flex;
        justify-content: center;
        background: transparent;
        box-shadow: none;
        margin: 0;
        padding: 0.5rem 0;
        text-align: left;
        font-size: 1rem;

        h4 {
            margin: 0;
            padding: 0;
            margin: 0 10px;
            font-size: 1rem;
        }
    }
`;

export const Confirmed = styled.span`
    color: ${props => (!props.darkMode ? '#000' : theme.white.primary)};
    font-weight: bold;
`;

export const Recovered = styled.span`
    color: ${props => (!props.darkMode ? '#6dd428' : theme.white.primary)};
    font-weight: bold;
`;

export const Deaths = styled.span`
    color: ${props => (!props.darkMode ? '#f9345e' : theme.white.primary)};
    font-weight: bold;
`;

export const StatGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 2rem 0 3rem;
    grid-gap: 2rem;
    grid-column-start: 2;

    @media (max-width: 767px) {
        display: block;
        margin-top: 5rem;
        padding: 0;
    }
`;
