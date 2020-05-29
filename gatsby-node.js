/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                '@theme': path.resolve(__dirname, 'src/lib/theme'),
                '@lib': path.resolve(__dirname, 'src/lib'),
                '@hooks': path.resolve(__dirname, 'src/hooks'),
                '@context': path.resolve(__dirname, 'src/context'),
                '@components': path.resolve(__dirname, 'src/components'),
            },
        },
    });
};
