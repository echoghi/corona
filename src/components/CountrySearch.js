import React from 'react';
import Downshift from 'downshift';

import { connect } from 'react-redux';
import styled from 'styled-components';
import { setCountry, getCountryChartData } from '../data/actions';

const Results = styled.ul`
    overflow-y: auto;
    height: 85%;
    overflow-x: hidden;
    padding: 0 1rem;

    &::-webkit-scrollbar {
        width: 8px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        background: #f0f3f7;
        border-radius: 1rem;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: #dfdbf0;
        width: 15px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: #1a1053;
    }
`;

const ResultsContainer = styled.div`
    height: 100%;
`;

const Result = styled.li`
    list-style: none;
    padding: 1rem;
    border-radius: 1rem;
    display: flex;
    color: #1a1053;
    align-items: center;

    &:hover {
        background: #dfdbf0;
        cursor: pointer;
    }
`;

const Container = styled.div`
    overflow: hidden;
    grid-row-start: 1;
    grid-row-end: 3;
`;

const Input = styled.input`
    border-radius: 3rem;
    background: #f0f3f7;
    color: #1a1053;
    outline: none;
    padding: 1rem;
    font-size: 16px;
    box-shadow: none;
    border: none;
    width: 100%;
`;

const Flag = styled.img`
    height: 15px;
    width: 20px;
    margin-right: 10px;
`;

const mapStateToProps = state => ({
    selectedCountry: state.selectedCountry,
    countryData: state.countryData
});

const mapDispatchToProps = {
    setSelectedCountry: country => setCountry(country),
    getCountryChartData: country => getCountryChartData(country)
};

function CountrySearch({ countryData, setSelectedCountry, getCountryChartData }) {
    if (!countryData) return <p>Loading...</p>;

    function handleSelection(selection) {
        getCountryChartData(selection.countryInfo.iso3);
        setSelectedCountry(selection.countryInfo);
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
                    getRootProps
                }) => (
                    <ResultsContainer>
                        {/* <label {...getLabelProps()}>Enter a Country</label> */}
                        <div
                            style={{ display: 'inline-block' }}
                            {...getRootProps({}, { suppressRefError: true })}
                        >
                            <Input {...getInputProps()} placeholder="Search a country" />
                        </div>
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
