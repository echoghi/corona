import React from 'react';
import { connect } from 'react-redux';
import useStats from '../../hooks/useStats';
import { numberWithCommas } from '../../lib/util';

import { StatBlock, Confirmed, Recovered, Deaths, StatGrid } from './styles';
import StatChange from '../StatChange';

const mapStateToProps = state => ({
    selectedCountry: state.selectedCountry,
    darkMode: state.darkMode
});

function Stats({ url, darkMode }) {
    const { stats, loading, error } = useStats(url);
    const yesterdayData = useStats('https://corona.lmao.ninja/yesterday/all');

    if (loading || !stats || !yesterdayData.stats) return null;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <StatGrid darkMode={darkMode}>
            <StatBlock darkMode={darkMode}>
                <Confirmed darkMode={darkMode}>{numberWithCommas(stats.cases)}</Confirmed>
                <h4>Confirmed</h4>
                <StatChange
                    current={stats.cases}
                    old={yesterdayData.stats.cases}
                    upColor="#f9345e"
                    downColor="#6dd428"
                />
            </StatBlock>
            <StatBlock darkMode={darkMode}>
                <Confirmed darkMode={darkMode}>{numberWithCommas(stats.todayCases)}</Confirmed>
                <h4>New Cases</h4>
                <StatChange
                    current={stats.todayCases}
                    old={yesterdayData.stats.todayCases}
                    upColor="#f9345e"
                    downColor="#6dd428"
                />
            </StatBlock>
            <StatBlock darkMode={darkMode}>
                <Recovered darkMode={darkMode}>{numberWithCommas(stats.recovered)}</Recovered>
                <h4>Recovered</h4>

                <StatChange
                    current={stats.recovered}
                    old={yesterdayData.stats.recovered}
                    upColor="#6dd428"
                    downColor="#f9345e"
                />
            </StatBlock>
            <StatBlock darkMode={darkMode}>
                <Deaths darkMode={darkMode}>{numberWithCommas(stats.deaths)}</Deaths>
                <h4>Deaths</h4>

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
