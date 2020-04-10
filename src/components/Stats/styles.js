import React from 'react';
import styled from 'styled-components';

export const StatBlock = styled.div`
    background: #fff;
    font-size: 2rem;
    padding: 2rem 3rem;
    border-radius: 1rem;
    display: grid;
    align-items: center;
    justify-items: center;
    text-align: center;
    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.1);

    h4 {
        margin: 0.5rem 1rem;
        font-size: 20px;
        color: #1a1053;
    }
`;

export const Confirmed = styled.span`
    color: black;
    font-weight: bold;
`;

export const Recovered = styled.span`
    color: #6dd428;
    font-weight: bold;
`;

export const Deaths = styled.span`
    color: #f9345e;
    font-weight: bold;
`;

export const StatGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 2rem 0 3rem;
    grid-gap: 2rem;
    grid-column-start: 2;
`;
