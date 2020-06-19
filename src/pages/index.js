/* eslint-disable import/first */
import React from 'react';
import { createGlobalStyle } from 'styled-components';
import App from '@components/App';
import theme from '@theme';

const GlobalStyle = createGlobalStyle`
    html {
        font-family: -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
        'Open Sans', 'Helvetica Neue', sans-serif;
    }

    html.dark,
    body.dark {
        background: ${theme.dark.primary};
        transition: ${theme.transitions.darkMode};
    }
`;

const IndexPage = () => {
    return (
        <>
            <GlobalStyle />
            <App />
        </>
    );
};

export default IndexPage;
