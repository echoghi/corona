import React from 'react';
import Downshift from 'downshift';

import {
    Container,
    ResultsContainer,
    InputContainer,
    Input,
    SearchIcon,
    CloseIcon,
    Flag,
    Results,
    Result
} from './styles';
import { connect } from 'react-redux';
import { setCountry, getCountryChartData } from '../../data/actions';
import { faSearchLocation, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const mapStateToProps = state => ({
    selectedCountry: state.selectedCountry,
    countryData: state.countryData,
    darkMode: state.darkMode
});

const mapDispatchToProps = {
    setSelectedCountry: country => setCountry(country),
    getCountryChartData: country => getCountryChartData(country)
};

function CountrySearch({ countryData, setSelectedCountry, getCountryChartData, darkMode }) {
    if (!countryData) return <p></p>;

    function handleSelection(selection) {
        if (selection) {
            //getCountryChartData(selection.countryInfo.iso3);
            setSelectedCountry(selection.countryInfo);
        }
    }

    return (
        <Container>
            <Downshift
                defaultIsOpen
                onChange={handleSelection}
                itemToString={item => (item ? item.country : '')}
            >
                {({
                    getInputProps,
                    getItemProps,
                    getLabelProps,
                    getMenuProps,
                    isOpen,
                    inputValue,
                    highlightedIndex,
                    selectedItem,
                    getRootProps,
                    clearSelection
                }) => (
                    <ResultsContainer>
                        {/* <label {...getLabelProps()}>Enter a Country</label> */}
                        <InputContainer {...getRootProps({}, { suppressRefError: true })}>
                            <SearchIcon icon={faSearchLocation} color="grey" size="lg" />
                            <Input
                                {...getInputProps()}
                                placeholder="Search a country"
                                darkMode={darkMode}
                            />
                            {inputValue && (
                                <CloseIcon
                                    icon={faTimesCircle}
                                    color="grey"
                                    size="sm"
                                    onClick={clearSelection}
                                />
                            )}
                        </InputContainer>
                        <Results {...getMenuProps()}>
                            {isOpen
                                ? countryData
                                      .filter(
                                          item =>
                                              !inputValue ||
                                              item.country
                                                  .toLowerCase()
                                                  .includes(inputValue.toLowerCase())
                                      )
                                      .map((item, index) => (
                                          <Result
                                              darkMode={darkMode}
                                              {...getItemProps({
                                                  key: item.country,
                                                  index,
                                                  item
                                              })}
                                          >
                                              <Flag
                                                  src={item.countryInfo.flag}
                                                  alt={item.country}
                                              />
                                              {item.country}
                                          </Result>
                                      ))
                                : null}
                        </Results>
                    </ResultsContainer>
                )}
            </Downshift>
        </Container>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(CountrySearch);
