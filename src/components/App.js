import React, { useEffect } from 'react';
import Helmet from 'react-helmet';

import Layout from '@components/Layout';
import Map from '@components/Map';
import Stats from '@components/Stats';
import CountrySearch from '@components/CountrySearch';
import LoadingSpinner from '@components/LoadingSpinner';
import CountryModal from '@components/CountryModal';
import ErrorMessage from '@components/ErrorMessage';

import { useStats } from '@hooks';
import { useDarkMode, useCountry } from '@context';

const App = () => {
    const { selectedCountry, setCountryData } = useCountry();
    const { darkMode } = useDarkMode();
    const defaultState = selectedCountry.lat === 0 && selectedCountry.long === 0;

    const zoom = defaultState ? 2 : 5;
    const defaultBaseMap = darkMode ? 'MapBox' : 'OpenStreetMap';

    const { stats, loading, error } = useStats('https://corona.lmao.ninja/v2/countries');

    useEffect(() => {
        if (!error && !loading && stats) {
            setCountryData(stats);
        }
    }, [stats, error, loading]);

    if (error) return <ErrorMessage />;

    const spinnerCSS = { position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 };

    return (
        <Layout pageName="home">
            <Helmet>
                <title>Covid-19 - Global Trend</title>
            </Helmet>

            <Stats url="https://corona.lmao.ninja/v2/all" />

            <div className={darkMode ? 'map__container dark' : 'map__container'}>
                {!loading ? (
                    <>
                        <CountrySearch />
                        <Map zoom={zoom} defaultBaseMap={defaultBaseMap} />

                        <CountryModal />
                    </>
                ) : (
                    <LoadingSpinner style={spinnerCSS} />
                )}
            </div>
        </Layout>
    );
};

export default App;
