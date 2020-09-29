import React, { useEffect } from "react";
import Helmet from "react-helmet";
import styled from "styled-components";

import Layout from "@components/Layout";
import Map from "@components/Map";
import Stats from "@components/Stats";
import CountrySearch from "@components/CountrySearch";
import LoadingSpinner from "@components/LoadingSpinner";
import CountryModal from "@components/CountryModal";
import ErrorMessage from "@components/ErrorMessage";

import { useStats } from "@hooks";
import { useDarkMode, useCountry } from "@context";

const MapContainer = styled.div`
    position: relative;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: ${(props) => (!props.darkMode ? "2px 2px 20px rgba(0, 0, 0, 0.1)" : "none")};
    grid-column-start: 2;
    display: grid;
    grid-auto-columns: 200px 1fr;
    grid-auto-rows: 1fr 150px;
    grid-gap: 2rem;
    max-height: 60vh;
    min-height: 60vh;
    transition: 0.2s all ease;

    @media (max-width: 767px) {
        display: block;
        padding: 0;
        margin: 1rem 0;
    }
`;

const App = () => {
    const { selectedCountry, setCountryData } = useCountry();
    const { darkMode } = useDarkMode();
    const defaultState = selectedCountry.lat === 0 && selectedCountry.long === 0;

    const zoom = defaultState ? 1 : 5;
    const defaultBaseMap = darkMode ? "MapBox" : "OpenStreetMap";

    const { stats, loading, error } = useStats("https://corona.lmao.ninja/v2/countries");

    useEffect(() => {
        if (!error && !loading && stats) {
            setCountryData(stats);
        }
    }, [stats, error, loading]);

    if (error) return <ErrorMessage />;

    const spinnerCSS = { position: "absolute", top: 0, right: 0, left: 0, bottom: 0 };

    return (
        <Layout pageName="home">
            <Helmet>
                <title>Covid-19 - Global Trend</title>
            </Helmet>

            <Stats url="https://corona.lmao.ninja/v2/all" />

            <MapContainer darkMode={darkMode}>
                {!loading ? (
                    <>
                        <CountrySearch />
                        <Map zoom={zoom} defaultBaseMap={defaultBaseMap} />

                        <CountryModal />
                    </>
                ) : (
                    <LoadingSpinner style={spinnerCSS} />
                )}
            </MapContainer>
        </Layout>
    );
};

export default App;
