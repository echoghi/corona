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

afterEach(() => {
    cleanup();
    window.localStorage.clear();
});

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
        const header = getByTestId('app-header');
        const heading = getByTestId('app-heading');

        // <header>
        expect(header).toHaveStyle(`
            background-color: ${theme.white.primary};
            transition: ${theme.transitions.darkMode};
        `);

        // h1
        expect(heading).toHaveStyle(`
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
        expect(header).toHaveStyle(`
            background-color: ${theme.dark.primary};
            transition: ${theme.transitions.darkMode};
        `);

        // h1
        expect(heading).toHaveStyle(`
            color: ${theme.white.primary};
        `);
    });

    test('stats render correct styling after toggle', () => {
        const { getByTestId } = render(<App />);
        const cases = getByTestId('app-stat-cases');
        const todayCases = getByTestId('app-stat-todayCases');
        const recovered = getByTestId('app-stat-recovered');
        const deaths = getByTestId('app-stat-deaths');
        const statBlock = getByTestId('app-stat-block');

        //// check styling for each stat box in normal (non-dark) mode

        expect(statBlock).toHaveStyle(`
            box-shadow: 2px 2px 20px rgba(0,0,0,0.1);
        `);

        expect(cases).toHaveStyle(`
            color: #000;
        `);

        expect(todayCases).toHaveStyle(`
            color: #000;
        `);

        expect(recovered).toHaveStyle(`
            color: #6dd428;
        `);

        expect(deaths).toHaveStyle(`
            color: #f9345e;
        `);

        // enable darkMode
        fireEvent(
            getByTestId('dark-mode-icon'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        );

        ////// new styles should reflect darkMode ///////

        expect(statBlock).toHaveStyle(`
            box-shadow: none;
        `);

        expect(cases).toHaveStyle(`
            color: #fff;
        `);

        expect(todayCases).toHaveStyle(`
            color: #fff;
        `);

        expect(recovered).toHaveStyle(`
            color: #fff;
        `);

        expect(deaths).toHaveStyle(`
            color: #fff;
        `);
    });
});
