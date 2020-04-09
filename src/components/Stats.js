import React from 'react';
import { connect } from 'react-redux';
import useStats from '../hooks/useStats';
import styled from 'styled-components';
import { numberWithCommas } from '../lib/util';

const StatBlock = styled.div`
    background: #fff;
    font-size: 2rem;
    padding: 2rem;
    border-radius: 1rem;
    display: grid;
    align-items: center;
    justify-items: center;
    text-align: center;
    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.1);

    h4 {
        margin: 0.5rem 1rem;
        font-size: 20px;
        color: #1a1053;
    }
`;

const Confirmed = styled(StatBlock)`
    span {
        color: black;
        font-weight: bold;
    }
`;

const Recovered = styled(StatBlock)`
    span {
        color: #1cb142;
        font-weight: bold;
    }
`;

const Deaths = styled(StatBlock)`
    span {
        color: #f9345e;
        font-weight: bold;
    }
`;

const StatGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: ${props => (props.noPadding ? '0' : '2rem 0')};
    grid-gap: 5rem;
    grid-column-start: 2;
`;

const mapStateToProps = state => ({
    selectedCountry: state.selectedCountry
});

function Stats({ url, selectedCountry }) {
    const searchUrl = url || `https://covid19.mathdro.id/api/countries/${selectedCountry.iso3}`;
    const { stats, loading, error } = useStats(searchUrl);

    if (loading || !stats) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <StatGrid noPadding={!url}>
            <Confirmed>
                <h4>Confirmed:</h4>
                <span>{numberWithCommas(stats.confirmed.value)}</span>
            </Confirmed>
            <Recovered>
                <h4>Recovered:</h4>
                <span>{numberWithCommas(stats.recovered.value)}</span>
            </Recovered>
            <Deaths>
                <h4>Deaths:</h4>
                <span>{numberWithCommas(stats.deaths.value)}</span>
            </Deaths>
        </StatGrid>
    );
}

export default connect(mapStateToProps)(Stats);
