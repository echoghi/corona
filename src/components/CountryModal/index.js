import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { numberWithCommas } from '../../lib/util';
import { Container, Header, CloseIcon, List, ListItem } from './styles';
import theme from '../../lib/theme';
import Grow from '@material-ui/core/Grow';
import { useDarkMode, useCountry } from '../../context';

const CountryModal = () => {
    const { modalData, countryModal, setCountryModal } = useCountry();
    const { darkMode } = useDarkMode();
    const { country, cases, casesString, deaths, recovered, updatedFormatted } = modalData;
    const iconColor = !darkMode ? theme.colors.purpleDark : theme.white.primary;
    console.log(numberWithCommas(cases));
    return (
        <Grow in={countryModal} timeout={{ enter: 300, exit: 0 }}>
            <Container darkMode={darkMode}>
                <CloseIcon
                    color={iconColor}
                    size="3x"
                    icon={faTimes}
                    onClick={() => setCountryModal(false)}
                />
                <div>
                    <Header>{country}</Header>

                    <List darkMode={darkMode}>
                        <ListItem darkMode={darkMode}>
                            <span>Confirmed:</span> {numberWithCommas(cases)}
                        </ListItem>
                        <ListItem darkMode={darkMode}>
                            <span>Deaths:</span> {numberWithCommas(deaths)}
                        </ListItem>
                        <ListItem darkMode={darkMode}>
                            <span>Recovered:</span> {numberWithCommas(recovered)}
                        </ListItem>
                    </List>

                    <span>Last Updated {updatedFormatted}</span>
                </div>
            </Container>
        </Grow>
    );
};

export default CountryModal;
