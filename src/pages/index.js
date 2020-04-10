/* eslint-disable import/first */
import React from 'react';
import Helmet from 'react-helmet';

import L from 'leaflet';
import { Provider } from 'react-redux';
import { store } from '../data/store';
import { saveCountryData, getCountryChartData } from '../data/actions';
import styled, { createGlobalStyle } from 'styled-components';
import Layout from 'components/Layout';
import Map from 'components/Map';
import Stats from 'components/Stats';
import CountrySearch from '../components/CountrySearch';
import CountryChart from '../components/CountryChart';
import { numberWithCommas } from '../lib/util';

const MapContainer = styled.div`
    background: #fff;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.1);
    grid-column-start: 2;
    display: grid;
    grid-auto-columns: 200px 1fr;
    grid-auto-rows: 1fr 150px;
    grid-gap: 2rem;
    max-height: 60vh;
    min-height: 60vh;
`;

const GlobalStyle = createGlobalStyle`
    html {
        font-family: -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
        'Open Sans', 'Helvetica Neue', sans-serif;
        background: #F9FCFF;
    }
`;

const LOCATION = {
    lat: 0,
    lng: 0
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 4;

const IndexPage = () => {
    /**
     * mapEffect
     * @description Fires a callback once the page renders
     * @example Here this is and example of being used to zoom in and set a popup on load
     */
    async function mapEffect({ leafletElement: map } = {}) {
        let response;

        try {
            response = await fetch('https://corona.lmao.ninja/countries').then(res => res.json());

            store.dispatch(saveCountryData(response));
            store.dispatch(getCountryChartData());
        } catch (e) {
            console.log(`Failed to fetch countries: ${e.message}`, e);
            return;
        }

        const data = response || [];
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

                const { country, updated, cases, deaths, recovered } = properties;

                casesString = `${cases}`;

                if (cases > 1000) {
                    casesString = `${casesString.slice(0, -3)}k+`;
                }

                if (updated) {
                    updatedFormatted = new Date(updated).toLocaleString();
                }

                const html = `
                  <div class="icon-marker">
                      <h2>${country}</h2>

                      <ul>
                        <li><span class="category">Confirmed:</span> ${casesString}</li>
                        <li><span class="category">Deaths:</span> ${numberWithCommas(deaths)}</li>
                        <li><span class="category">Recovered:</span> ${numberWithCommas(
                            recovered
                        )}</li>
                        </ul>

                        <span>Last Updated ${updatedFormatted}</span>
                  </div>
                `;

                return L.circleMarker(latlng, {
                    className: 'icon',
                    radius: 20 * Math.log(cases / 10000),
                    stroke: false
                }).bindTooltip(html);
            }
        });

        geoJsonLayers.addTo(map);
    }

    const mapSettings = {
        center: CENTER,
        defaultBaseMap: 'OpenStreetMap',
        zoom: DEFAULT_ZOOM,
        mapEffect
    };

    return (
        <Provider store={store}>
            <Layout pageName="home">
                <GlobalStyle />
                <Helmet>
                    <title>Covid-19 - Global Trend</title>
                </Helmet>

                <Stats url="https://corona.lmao.ninja/all" />

                <MapContainer>
                    <CountrySearch />
                    <Map {...mapSettings} />
                    <CountryChart />
                </MapContainer>
            </Layout>
        </Provider>
    );
};

export default IndexPage;
