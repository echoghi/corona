import React from 'react';
import { connect } from 'react-redux';
import useStats from '../hooks/useStats';
import styled from 'styled-components';
import { numberWithCommas } from '../lib/util';

import StatChange from './StatChange';

const StatBlock = styled.div`
    background: #fff;
    font-size: 2rem;
    padding: 2rem 3rem;
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

const Confirmed = styled.span`
    color: black;
    font-weight: bold;
`;

const Recovered = styled.span`
    color: #6dd428;
    font-weight: bold;
`;

const Deaths = styled.span`
    color: #f9345e;
    font-weight: bold;
`;

const StatGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 2rem 0 3rem;
    grid-gap: 2rem;
    grid-column-start: 2;
`;

const mapStateToProps = state => ({
    selectedCountry: state.selectedCountry
});

function Stats({ url }) {
    const { stats, loading, error } = useStats(url);
    const yesterdayData = useStats('https://corona.lmao.ninja/yesterday/all');

    if (loading || !stats || !yesterdayData.stats) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <StatGrid>
            <StatBlock>
                <h4>Confirmed:</h4>
                <Confirmed>{numberWithCommas(stats.cases)}</Confirmed>
                <StatChange
                    current={stats.cases}
                    old={yesterdayData.stats.cases}
                    upColor="#f9345e"
                    downColor="#6dd428"
                />
            </StatBlock>
            <StatBlock>
                <h4>New Cases:</h4>
                <Confirmed>{numberWithCommas(stats.todayCases)}</Confirmed>
                <StatChange
                    current={stats.todayCases}
                    old={yesterdayData.stats.todayCases}
                    upColor="#f9345e"
                    downColor="#6dd428"
                />
            </StatBlock>
            <StatBlock>
                <h4>Recovered:</h4>
                <Recovered>{numberWithCommas(stats.recovered)}</Recovered>

                <StatChange
                    current={stats.recovered}
                    old={yesterdayData.stats.recovered}
                    upColor="#6dd428"
                    downColor="#f9345e"
                />
            </StatBlock>
            <StatBlock>
                <h4>Deaths:</h4>
                <Deaths>{numberWithCommas(stats.deaths)}</Deaths>

                <StatChange
                    current={stats.deaths}
                    old={yesterdayData.stats.deaths}
                    upColor="#f9345e"
                    downColor="#6dd428"
                />
            </StatBlock>
        </StatGrid>
    );
}

export default connect(mapStateToProps)(Stats);
