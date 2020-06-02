import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import { DarkModeProvider, CountryProvider } from '@context';
import IndexPage from '../../src/pages';
import theme from '@theme';

function App() {
    return (
        <DarkModeProvider>
            <CountryProvider>
                <IndexPage />
            </CountryProvider>
        </DarkModeProvider>
    );
}

afterEach(cleanup);

describe('darkMode', () => {
    test('header renders correct initial styling', () => {
        const { getByTestId } = render(<App />);

        // <header>
        expect(getByTestId('app-header')).toHaveStyle(`
            background-color: ${theme.white.primary};
            transition: ${theme.transitions.darkMode};
        `);

        // h1
        expect(getByTestId('app-heading')).toHaveStyle(`
            color: #6135fc;
        `);
    });

    test('header renders correct styling after toggle', () => {
        const { getByTestId } = render(<App />);

        // <header>
        expect(getByTestId('app-header')).toHaveStyle(`
            background-color: ${theme.white.primary};
            transition: ${theme.transitions.darkMode};
        `);

        // h1
        expect(getByTestId('app-heading')).toHaveStyle(`
            color: #6135fc;
        `);

        fireEvent(
            getByTestId('dark-mode-icon'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        );

        ////// new styles should reflect darkMode ///////

        // <header>
        expect(getByTestId('app-header')).toHaveStyle(`
            background-color: ${theme.dark.primary};
            transition: ${theme.transitions.darkMode};
        `);

        // h1
        expect(getByTestId('app-heading')).toHaveStyle(`
            color: ${theme.white.primary};
        `);
    });
});
