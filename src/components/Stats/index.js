import React from 'react';
import { connect } from 'react-redux';
import useStats from '../../hooks/useStats';
import { numberWithCommas } from '../../lib/util';

import { StatBlock, Confirmed, Recovered, Deaths, StatGrid } from './styles';
import StatChange from '../StatChange';

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
