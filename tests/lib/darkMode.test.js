import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import { DarkModeProvider, CountryProvider } from '@context';
import IndexPage from '../../src/pages';
import fetchMock from 'jest-fetch-mock';
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
    fetchMock.resetMocks();
    console.log(fetchMock.mock.calls);
});

beforeEach(() => {
    // if you have an existing `beforeEach` just add the following lines to it
    fetchMock.mockResponse((req) => {
        if (req.href === 'https://corona.lmao.ninja/v2/all') {
            return Promise.resolve({ body: [] });
        } else {
            Promise.reject(new Error('bad url'));
        }
    });
});

describe('darkMode', () => {
    test('header', async () => {
        const { getByTestId } = render(<App />);
        const header = getByTestId('app-header');
        const heading = getByTestId('app-heading');
        const icon = getByTestId('dark-mode-icon');

        // <header>
        expect(header).toHaveStyle(`
            background-color: ${theme.white.primary};
            transition: ${theme.transitions.darkMode};
        `);

        // h1
        expect(heading).toHaveStyle(`
            color: #6135fc;
        `);

        // assert that the moon icon rendered
        expect(icon).toHaveAttribute('data-icon', 'moon');

        await fireEvent(
            icon,
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

        // assert that the sun icon rendered
        expect(icon).toHaveAttribute('data-icon', 'sun');
    });

    test.skip('stats', async () => {
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
        await fireEvent(
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

    test.skip('country modal', async () => {
        const { getByTestId } = render(<App />);
        const modal = getByTestId('map-modal');
        const modalList = getByTestId('map-modal-list');
        const cases = getByTestId('map-modal-cases');
        const deaths = getByTestId('map-modal-deaths');
        const recovered = getByTestId('map-modal-recovered');

        //// check styling for each stat box in normal (non-dark) mode

        expect(modal).toHaveStyle(`
            background: ${theme.white.primary};
            color: ${theme.colors.purpleDark};
            transition: ${theme.transitions.darkMode};
        `);

        // enable darkMode
        await fireEvent(
            getByTestId('dark-mode-icon'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        );

        ////// new styles should reflect darkMode ///////

        expect(modal).toHaveStyle(`
            background: ${theme.dark.secondary};
            color: ${theme.white.primary};
            transition: ${theme.transitions.darkMode};
        `);
    });

    // TODO: mock api calls
    test.skip('country search', async () => {
        const { getByTestId } = render(<App />);
        const searchInput = getByTestId('app-country-search');
        const listItem = getByTestId('app-country-list-item');

        //// check styling for each stat box in normal (non-dark) mode

        expect(searchInput).toHaveStyle(`
            background: #f0f3f7;
            color: ${theme.colors.purpleDark};
            transition: ${theme.transitions.darkMode};
        `);

        expect(listItem).toHaveStyle(`
            color: #1a1053;
        `);

        // enable darkMode
        await fireEvent(
            getByTestId('dark-mode-icon'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        );

        ////// new styles should reflect darkMode ///////

        expect(searchInput).toHaveStyle(`
            background: ${theme.dark.secondary};
            color: ${theme.white.primary};
            transition: ${theme.transitions.darkMode};
        `);

        expect(listItem).toHaveStyle(`
            color: #fff;
        `);
    });
});
