import React from 'react';
import Helmet from 'react-helmet';

import Layout from 'components/Layout';

const SecondPage = () => {
    return (
        <Layout pageName="two">
            <Helmet>
                <title>Page Two</title>
            </Helmet>
            <div>
                <h1>Page Two</h1>
                <p>Welcome to page 2</p>
            </div>
        </Layout>
    );
};

export default SecondPage;
