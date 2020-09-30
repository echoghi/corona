import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import 'assets/stylesheets/application.scss';

import Header from '@components/Header';
import Footer from '@components/Footer';
import theme from '@theme';
import { useDarkMode } from '@context';

export const Wrapper = styled.div`
    min-height: 100vh;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 3rem;
    display: grid;
    grid-template-rows: auto 1fr auto;
    background: ${(props) => (!props.darkMode ? theme.white.primary : theme.dark.primary)};
    transition: ${theme.transitions.darkMode};

    @media (max-width: 767px) {
        padding: 0 1rem;
        margin-bottom: 4rem;
    }
`;

const Layout = ({ children, pageName }) => {
    const { darkMode } = useDarkMode();
    const htmlClass = darkMode ? 'dark' : 'light';
    let className = '';

    if (pageName) {
        className = `page-${pageName}`;
    }

    return (
        <>
            <Helmet
                bodyAttributes={{ class: className, 'data-testid': 'app-body' }}
                htmlAttributes={{ class: htmlClass, 'data-testid': 'app-html' }}
            >
                <title>COVID-19 Tracker</title>
            </Helmet>
            <Wrapper darkMode={darkMode}>
                <Header />
                <main>{children}</main>
                <Footer darkMode={darkMode} />
            </Wrapper>
        </>
    );
};

export default Layout;
