import React, { useRef } from 'react';
import L from 'leaflet';
import { Map as BaseMap, TileLayer, ZoomControl } from 'react-leaflet';

import { useConfigureLeaflet, useMapServices, useRefEffect } from '@hooks';
import { isDomAvailable } from '@lib/util';
import { useCountry, useDarkMode } from '@context';

const Map = ({ children, className, defaultBaseMap = 'OpenStreetMap', zoom }) => {
    const { darkMode } = useDarkMode();
    const { selectedCountry, countryData, setCountryModal, setModalData } = useCountry();
    const mapRef = useRef();
    useConfigureLeaflet();

    /**
     * mapEffect
     * @description Fires a callback once the page renders
     * @example Here this is and example of being used to zoom in and set a popup on load
     */
    async function mapEffect({ leafletElement: map } = {}) {
        const data = countryData || [];
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
                        ...country,
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [lng, lat],
                    },
                };
            }),
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
                    ...properties,
                };

                const min = 1;
                const factor = 10;
                const zoomFactor = zoom === 1 ? 1 / 6 : 1 / 3; // adjust divisor for best optics

                return L.circleMarker(latlng, {
                    className: 'icon',
                    color: darkMode ? 'rgb(255, 0, 0)' : 'rgb(51, 136, 255)',
                    radius: Math.floor(Math.log(cases) * factor * zoomFactor) + min,
                    stroke: false,
                }).on('click', function (e) {
                    setCountryModal(true);
                    setModalData(options);
                });
            },
        });

        map.eachLayer((layer) => {
            const layerName = layer.options.name;
            const isBaseLayer = layerName === 'MapBox' || layerName === 'OpenStreetMap';

            // remove all previous markers/layers
            if (!isBaseLayer) map.removeLayer(layer);
        });

        geoJsonLayers.addTo(map);
    }

    useRefEffect({
        ref: mapRef,
        effect: mapEffect,
    });

    const services = useMapServices({
        names: [...new Set([defaultBaseMap, defaultBaseMap])],
    });
    const basemap = services.find((service) => service.name === defaultBaseMap);

    let mapClassName = `map`;

    if (className) {
        mapClassName = `${mapClassName} ${className}`;
    }

    return (
        <div className={mapClassName}>
            {isDomAvailable && (
                <BaseMap
                    ref={mapRef}
                    center={[selectedCountry.lat, selectedCountry.long]}
                    zoomControl={false}
                    className="map-base"
                    useFlyTo={true}
                    zoom={zoom}
                >
                    {children}
                    {basemap && <TileLayer {...basemap} />}
                    <ZoomControl position="bottomright" />
                </BaseMap>
            )}
        </div>
    );
};

export default Map;
