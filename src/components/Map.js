import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map as BaseMap, TileLayer, ZoomControl } from 'react-leaflet';

import { useConfigureLeaflet, useMapServices, useRefEffect } from 'hooks';
import { isDomAvailable } from 'lib/util';

const DEFAULT_MAP_SERVICE = 'OpenStreetMap';

const mapStateToProps = state => ({
    selectedCountry: state.selectedCountry
});

const Map = ({
    children,
    className,
    defaultBaseMap = DEFAULT_MAP_SERVICE,
    mapEffect,
    selectedCountry,
    zoom,
    ...rest
}) => {
    const mapRef = useRef();

    useConfigureLeaflet();

    useRefEffect({
        ref: mapRef,
        effect: mapEffect
    });

    const services = useMapServices({
        names: [...new Set([defaultBaseMap, DEFAULT_MAP_SERVICE])]
    });
    const basemap = services.find(service => service.name === defaultBaseMap);

    let mapClassName = `map`;

    if (className) {
        mapClassName = `${mapClassName} ${className}`;
    }

    if (!isDomAvailable()) {
        return (
            <div className={mapClassName}>
                <p className="map-loading">Loading map...</p>
            </div>
        );
    }

    const mapSettings = {
        className: 'map-base',
        zoomControl: false,
        center: [selectedCountry.lat, selectedCountry.long],
        zoom
    };

    return (
        <div className={mapClassName}>
            <BaseMap ref={mapRef} {...mapSettings}>
                {children}
                {basemap && <TileLayer {...basemap} />}
                <ZoomControl position="bottomright" />
            </BaseMap>
        </div>
    );
};

Map.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    defaultBaseMap: PropTypes.string,
    mapEffect: PropTypes.func
};

export default connect(mapStateToProps)(Map);
