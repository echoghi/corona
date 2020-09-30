import React from 'react';
import Downshift from 'downshift';
import { faSearchLocation, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDarkMode, useCountry } from '@context';

function CountrySearch() {
    const { countryData, setSelectedCountry, setCountryModal } = useCountry();
    const { darkMode } = useDarkMode();

    function handleSelection(selection) {
        if (selection) {
            setSelectedCountry(selection.countryInfo);
        }
    }

    return (
        <div className="search-results__container">
            <Downshift defaultIsOpen onChange={handleSelection} itemToString={(item) => (item ? item.country : '')}>
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
                    <div className="results__container">
                        <div className="search__container" {...getRootProps({}, { suppressRefError: true })}>
                            <FontAwesomeIcon className="search__icon" icon={faSearchLocation} color="grey" size="lg" />
                            <input
                                {...getInputProps()}
                                className={`search__input${darkMode ? ' dark' : ''}`}
                                placeholder="Search a country"
                                data-testid="app-country-search"
                            />
                            {inputValue && (
                                <FontAwesomeIcon
                                    className="search__icon--close"
                                    icon={faTimesCircle}
                                    color="grey"
                                    size="sm"
                                    onClick={() => {
                                        setSelectedCountry({
                                            iso3: 'USA',
                                            lat: 0,
                                            long: 0,
                                        });
                                        setCountryModal(false);
                                        clearSelection();
                                    }}
                                />
                            )}
                        </div>
                        <ul className="results__list" {...getMenuProps()}>
                            {isOpen
                                ? countryData
                                      .filter(
                                          (item) =>
                                              !inputValue ||
                                              item.country.toLowerCase().includes(inputValue.toLowerCase())
                                      )
                                      .map((item, index) => (
                                          <li
                                              className={`result${darkMode ? ' dark' : ''}`}
                                              data-testid="app-country-list-item"
                                              {...getItemProps({
                                                  key: item.country,
                                                  index,
                                                  item,
                                              })}
                                          >
                                              <img
                                                  src={item.countryInfo.flag}
                                                  alt={item.country}
                                                  className="result__flag"
                                              />
                                              {item.country}
                                          </li>
                                      ))
                                : null}
                        </ul>
                    </div>
                )}
            </Downshift>
        </div>
    );
}

export default CountrySearch;
