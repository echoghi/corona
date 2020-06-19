import React from 'react';
import Downshift from 'downshift';
import { faSearchLocation, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import {
    Container,
    ResultsContainer,
    InputContainer,
    Input,
    SearchIcon,
    CloseIcon,
    Flag,
    Results,
    Result,
} from './styles';
import { useDarkMode, useCountry } from '@context';

function CountrySearch() {
    const { countryData, setSelectedCountry } = useCountry();
    const { darkMode } = useDarkMode();

    function handleSelection(selection) {
        if (selection) {
            setSelectedCountry(selection.countryInfo);
        }
    }

    return (
        <Container>
            <Downshift
                defaultIsOpen
                onChange={handleSelection}
                itemToString={(item) => (item ? item.country : '')}
            >
                {({
                    getInputProps,
                    getItemProps,
                    getMenuProps,
                    isOpen,
                    inputValue,
                    highlightedIndex,
                    selectedItem,
                    getRootProps,
                    clearSelection,
                }) => (
                    <ResultsContainer>
                        <InputContainer {...getRootProps({}, { suppressRefError: true })}>
                            <SearchIcon icon={faSearchLocation} color="grey" size="lg" />
                            <Input
                                {...getInputProps()}
                                placeholder="Search a country"
                                darkMode={darkMode}
                                data-testid="app-country-search"
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
                                          (item) =>
                                              !inputValue ||
                                              item.country
                                                  .toLowerCase()
                                                  .includes(inputValue.toLowerCase())
                                      )
                                      .map((item, index) => (
                                          <Result
                                              darkMode={darkMode}
                                              data-testid="app-country-list-item"
                                              {...getItemProps({
                                                  key: item.country,
                                                  index,
                                                  item,
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

export default CountrySearch;
