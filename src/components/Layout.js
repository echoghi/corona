import React from 'react';
import Helmet from 'react-helmet';

import 'assets/stylesheets/application.scss';

import Header from '@components/Header';
import Footer from '@components/Footer';
import { useDarkMode } from '@context';

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
                htmlAttributes={{ class: htmlClass, 'data-testid': 'app-html', lang: 'en' }}
            >
                <title>COVID-19 Tracker</title>
            </Helmet>
            <div className={darkMode ? 'layout__container dark' : 'layout__container'}>
                <Header />
                <main>{children}</main>
                <Footer darkMode={darkMode} />
            </div>
        </>
    );
};

export default Layout;
