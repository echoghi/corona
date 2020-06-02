import React from 'react';
import { DarkModeProvider, CountryProvider } from '@context';

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => {
    return (
        <DarkModeProvider>
            <CountryProvider>{element}</CountryProvider>
        </DarkModeProvider>
    );
};
