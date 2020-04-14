import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import theme from '../../lib/theme';

export const Results = styled.ul`
    overflow-y: auto;
    height: 85%;
    overflow-x: hidden;
    padding: 0 1rem;

    &::-webkit-scrollbar {
        width: 8px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        background: #f0f3f7;
        border-radius: 1rem;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: #dfdbf0;
        width: 15px;
        border-radius: 1rem;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: #1a1053;
    }
`;

export const ResultsContainer = styled.div`
    height: 100%;
`;

export const Result = styled.li`
    list-style: none;
    padding: 1rem;
    border-radius: 1rem;
    display: flex;
    color: ${props => (!props.darkMode ? '#1a1053' : theme.white.primary)};
    align-items: center;

    &:hover {
        background: #dfdbf0;
        color: #1a1053;
        cursor: pointer;
    }
`;

export const Container = styled.div`
    overflow: hidden;
    grid-row-start: 1;
    grid-row-end: 3;

    @media (max-width: 767px) {
        display: none;
    }
`;

export const Input = styled.input`
    border-radius: 3rem;
    background: ${props => (!props.darkMode ? '#f0f3f7' : theme.dark.secondary)};
    transition: ${theme.transitions.darkMode};
    color: ${props => (!props.darkMode ? theme.colors.purpleDark : theme.white.primary)};
    outline: none;
    padding: 1rem;
    padding-left: 3rem;
    font-size: 14px;
    box-shadow: none;
    border: none;
    width: 100%;
`;

export const Flag = styled.img`
    height: 15px;
    width: 20px;
    margin-right: 10px;
`;

export const SearchIcon = styled(FontAwesomeIcon)`
    position: absolute;
    top: 15px;
    left: 15px;
`;

export const CloseIcon = styled(FontAwesomeIcon)`
    position: absolute;
    top: 18px;
    right: 15px;
    cursor: pointer;
`;

export const InputContainer = styled.div`
    display: inline-block;
    position: relative;
`;
