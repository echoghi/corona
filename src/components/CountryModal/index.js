import React from 'react';
import { connect } from 'react-redux';
import { closeCountryModal } from '../../data/actions';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { numberWithCommas } from '../../lib/util';
import { Container, Header, CloseIcon, List, ListItem } from './styles';
import theme from '../../lib/theme';
import Grow from '@material-ui/core/Grow';
import { useDarkMode } from '../../context';

const mapStateToProps = (state) => ({
    modalActive: state.countryModal,
    ...state.modalData,
});

const mapDispatchToProps = {
    closeCountryModal: () => closeCountryModal(),
};

const CountryModal = ({
    modalActive,
    country,
    casesString,
    deaths,
    recovered,
    closeCountryModal,
    updatedFormatted,
}) => {
    const { darkMode } = useDarkMode();
    const iconColor = !darkMode ? theme.colors.purpleDark : theme.white.primary;

    return (
        <Grow in={modalActive} timeout={{ enter: 300, exit: 0 }}>
            <Container darkMode={darkMode}>
                <CloseIcon color={iconColor} size="3x" icon={faTimes} onClick={closeCountryModal} />
                <div>
                    <Header>{country}</Header>

                    <List darkMode={darkMode}>
                        <ListItem darkMode={darkMode}>
                            <span>Confirmed:</span> {casesString}
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

export default connect(mapStateToProps, mapDispatchToProps)(CountryModal);
