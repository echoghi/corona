import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { closeCountryModal } from '../data/actions';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { numberWithCommas } from '../lib/util';
import theme from '../lib/theme';

export const CloseIcon = styled(FontAwesomeIcon)`
    position: fixed;
    top: 15px;
    right: 15px;
    display: block;
    cursor: pointer;

    @media (min-width: 768px) {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 0.8rem;
    }
`;

const Contqiner = styled.div`
    display: ${props => (props.active ? 'block' : 'none')};
    position: absolute;
    background: ${props => (!props.darkMode ? '#fff' : '#272727')};
    border-radius: 0.5rem;
    z-index: 999999;
    text-align: left;
    box-sizing: border-box;
    color: ${props => (props.darkMode ? '#fff' : '#1a1053')};
    font-size: 0.7rem;
    font-weight: bold;
    padding: 1rem;
    margin: 0;
    left: 270px;
    top: 37px;

    h2 {
        margin: 0;
        padding: 0;
        text-align: center;
    }

    @media (max-width: 767px) {
        position: fixed;
        display: ${props => (props.active ? 'flex' : 'none')};
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
        left: 0;
        right: 0;
        top: 0;
        left: 0;
        text-align: center;
    }
`;

const Header = styled.h2`
    margin: 0;

    @media (max-width: 767px) {
        font-size: 50px;
        text-align: center;
    }
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
    color: ${props => (props.darkMode ? theme.white.primary : '#f9345e')};
`;

const ListItem = styled.li`
    list-style: none;
    padding: 2.5px 0;

    span {
        color: ${props => (props.darkMode ? theme.white.primary : '#1a1053')};
    }

    @media (max-width: 767px) {
        font-size: 30px;
        padding: 1rem 0;
        text-align: center;
    }
`;

const mapStateToProps = state => ({
    modalActive: state.countryModal,
    darkMode: state.darkMode,
    ...state.modalData
});

const mapDispatchToProps = {
    closeCountryModal: () => closeCountryModal()
};

const countryModal = ({
    modalActive,
    country,
    casesString,
    deaths,
    recovered,
    closeCountryModal,
    updatedFormatted,
    darkMode
}) => {
    const iconColor = !darkMode ? '#1a1053' : theme.white.primary;

    return (
        <Contqiner active={modalActive} darkMode={darkMode}>
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
        </Contqiner>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(countryModal);
