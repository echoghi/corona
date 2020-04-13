/* eslint-disable import/first */
import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../data/store';
import { createGlobalStyle } from 'styled-components';
import App from '../components/App';

const GlobalStyle = createGlobalStyle`
    html {
        font-family: -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
        'Open Sans', 'Helvetica Neue', sans-serif;
        background: #F9FCFF;
    }
`;

const IndexPage = () => {
    return (
        <Provider store={store}>
            <GlobalStyle />
            <App />
        </Provider>
    );
};

export default IndexPage;
