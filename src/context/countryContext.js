import React, { createContext, useContext } from 'react';
import { useState } from 'react';

export const CountryContext = createContext();
export const CountryProvider = ({ children }) => {
    const [countryData, setCountryData] = useState([]);
    const [countryModal, setCountryModal] = useState(false);
    const [modalData, setModalData] = useState({});

    const [selectedCountry, setSelectedCountry] = useState({
        iso3: 'USA',
        lat: 0,
        long: 0,
    });

    return (
        <CountryContext.Provider
            value={{
                countryData,
                setCountryData,
                selectedCountry,
                setSelectedCountry,
                countryModal,
                setCountryModal,
                modalData,
                setModalData,
            }}
        >
            {children}
        </CountryContext.Provider>
    );
};

export const useCountry = () => useContext(CountryContext);
