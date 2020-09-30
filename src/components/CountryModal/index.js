import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { numberWithCommas } from '@lib/util';
import { Container, Header, CloseIcon, List, ListItem } from './styles';
import theme from '@theme';
import { useDarkMode, useCountry } from '@context';

const CountryModal = () => {
    const { modalData, countryModal, setCountryModal } = useCountry();
    const { darkMode } = useDarkMode();
    const { country, cases, deaths, recovered, updatedFormatted } = modalData;
    const iconColor = !darkMode ? theme.colors.purpleDark : theme.white.primary;

    if (!countryModal) return <div style={{ display: 'none' }} />;

    return (
        <Container darkMode={darkMode} data-testid="map-modal">
            <CloseIcon
                data-testid="map-modal-close"
                color={iconColor}
                size="3x"
                icon={faTimes}
                onClick={() => setCountryModal(false)}
            />
            <div>
                <Header>{country}</Header>

                <List darkMode={darkMode} data-testid="map-modal-list">
                    <ListItem darkMode={darkMode} data-testid="map-modal-cases">
                        <span>Confirmed:</span> {numberWithCommas(cases)}
                    </ListItem>
                    <ListItem darkMode={darkMode} data-testid="map-modal-deaths">
                        <span>Deaths:</span> {numberWithCommas(deaths)}
                    </ListItem>
                    <ListItem darkMode={darkMode} data-testid="map-modal-recovered">
                        <span>Recovered:</span> {numberWithCommas(recovered)}
                    </ListItem>
                </List>

                <span data-testid="map-modal-updated">Last Updated {updatedFormatted}</span>
            </div>
        </Container>
    );
};

export default CountryModal;
