import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { numberWithCommas } from '@lib/util';
import theme from '@theme';
import { useDarkMode, useCountry } from '@context';

const CountryModal = () => {
    const { modalData, countryModal, setCountryModal } = useCountry();
    const { darkMode } = useDarkMode();
    const { country, cases, deaths, recovered, updatedFormatted } = modalData;
    const iconColor = !darkMode ? theme.colors.purpleDark : theme.white.primary;

    if (!countryModal) return <div style={{ display: 'none' }} />;

    return (
        <div className={darkMode ? 'modal__container dark' : 'modal__container'} data-testid="map-modal">
            <FontAwesomeIcon
                className="modal__close"
                data-testid="map-modal-close"
                color={iconColor}
                size="3x"
                icon={faTimes}
                onClick={() => setCountryModal(false)}
            />
            <div>
                <h2 className="modal__header">{country}</h2>

                <ul className={darkMode ? 'modal__stats dark' : 'modal__stats'} data-testid="map-modal-list">
                    <li data-testid="map-modal-cases">
                        <span>Confirmed:</span> {numberWithCommas(cases)}
                    </li>
                    <li data-testid="map-modal-deaths">
                        <span>Deaths:</span> {numberWithCommas(deaths)}
                    </li>
                    <li data-testid="map-modal-recovered">
                        <span>Recovered:</span> {numberWithCommas(recovered)}
                    </li>
                </ul>

                <span data-testid="map-modal-updated">Last Updated {updatedFormatted}</span>
            </div>
        </div>
    );
};

export default CountryModal;
