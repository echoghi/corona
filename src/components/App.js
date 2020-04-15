/* eslint-disable import/first */
import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import L from 'leaflet';

import { saveCountryData, getCountryChartData, toggleCountryModal } from '../data/actions';
import styled from 'styled-components';
import Layout from 'components/Layout';
import Map from 'components/Map';
import Stats from 'components/Stats';
import ErrorMessage from 'components/ErrorMessage';
import LoadingSpinner from 'components/LoadingSpinner';
import CountrySearch from 'components/CountrySearch';
import CountryChart from 'components/CountryChart';
import CountryModal from 'components/CountryModal';

import useStats from '../hooks/useStats';
import theme from '../lib/theme';
import { setTheme } from '../lib/util';

const MapContainer = styled.div`
    position: relative;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: ${props => (!props.darkMode ? '2px 2px 20px rgba(0, 0, 0, 0.1)' : 'none')};
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

const LOCATION = {
    lat: 0,
    lng: 0
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;

const mapStateToProps = state => ({
    darkMode: state.darkMode,
    selectedCountry: state.selectedCountry
});

const mapDispatchToProps = {
    saveCountryData: country => saveCountryData(country),
    getCountryChartData: () => getCountryChartData(),
    toggleCountryModal: options => toggleCountryModal(options)
};

const App = ({
    darkMode,
    getCountryChartData,
    selectedCountry,
    saveCountryData,
    toggleCountryModal
}) => {
    useEffect(() => {
        setTheme();
    }, []);

    const { stats, loading, error } = useStats('https://corona.lmao.ninja/countries');

    // if (loading || !stats) return <LoadingSpinner fullPage />;
    if (error) return <ErrorMessage />;

    if (!loading && stats) {
        saveCountryData(stats);
        // getCountryChartData();
    }
    /**
     * mapEffect
     * @description Fires a callback once the page renders
     * @example Here this is and example of being used to zoom in and set a popup on load
     */
    async function mapEffect({ leafletElement: map } = {}) {
        const data = stats || [];
        const hasData = Array.isArray(data) && data.length > 0;

        if (!hasData) return;

        const geoJson = {
            type: 'FeatureCollection',
            features: data.map((country = {}) => {
                const { countryInfo = {} } = country;
                const { lat, long: lng } = countryInfo;
                return {
                    type: 'Feature',
                    properties: {
                        ...country
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [lng, lat]
                    }
                };
            })
        };

        const geoJsonLayers = new L.GeoJSON(geoJson, {
            pointToLayer: (feature = {}, latlng) => {
                const { properties = {} } = feature;
                let updatedFormatted;
                let casesString;

                const { updated, cases } = properties;

                casesString = `${cases}`;

                if (cases > 1000) {
                    casesString = `${casesString.slice(0, -3)}k+`;
                }

                if (updated) {
                    updatedFormatted = new Date(updated).toLocaleString();
                }

                const options = {
                    casesString,
                    updatedFormatted,
                    ...properties
                };

                const min = 1;
                const factor = 10;
                const zoomFactor = DEFAULT_ZOOM >= 5 ? 1 : DEFAULT_ZOOM / 10; // adjust divisor for best optics

                return L.circleMarker(latlng, {
                    className: 'icon',
                    color: darkMode ? 'rgb(255, 0, 0)' : 'rgb(51, 136, 255)',
                    radius: Math.floor(Math.log(cases) * factor * zoomFactor) + min,
                    stroke: false
                }).on('click', function (e) {
                    toggleCountryModal(options);
                });
            }
        });

        geoJsonLayers.addTo(map);
    }

    const mapSettings = {
        center: CENTER,
        defaultBaseMap: darkMode ? 'MapBox' : 'OpenStreetMap',
        zoom: selectedCountry ? 5 : DEFAULT_ZOOM,
        mapEffect
    };

    const spinnerCSS = { position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 };

    return (
        <Layout pageName="home">
            <Helmet>
                <title>Covid-19 - Global Trend</title>
            </Helmet>

            <Stats url="https://corona.lmao.ninja/all" />

            <MapContainer darkMode={darkMode}>
                {!loading ? (
                    <>
                        <CountrySearch />
                        <Map {...mapSettings} />

                        <CountryModal />
                    </>
                ) : (
                    <LoadingSpinner style={spinnerCSS} />
                )}
            </MapContainer>
        </Layout>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
