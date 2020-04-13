import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import 'assets/stylesheets/application.scss';

import Header from 'components/Header';
import Footer from 'components/Footer';
import theme from '../lib/theme';

export const Wrapper = styled.div`
    min-height: 100vh;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 3rem;
    display: grid;
    grid-template-rows: auto 1fr auto;
    background: ${props => (!props.darkMode ? theme.white.primary : theme.dark.primary)};
    transition: ${theme.transitions.darkMode};

    @media (max-width: 767px) {
        padding: 0 1rem;
    }
`;

const mapStateToProps = state => ({
    darkMode: state.darkMode
});

const Layout = ({ children, pageName, darkMode }) => {
    let className = '';

    if (pageName) {
        className = `${className} page-${pageName}`;
    }

    return (
        <>
            <Helmet bodyAttributes={{ class: className }}>
                <title>Gatsby Site</title>
            </Helmet>
            <Wrapper darkMode={darkMode}>
                <Header />
                <main>{children}</main>
                <Footer />
            </Wrapper>
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    pageName: PropTypes.string
};

export default connect(mapStateToProps)(Layout);
