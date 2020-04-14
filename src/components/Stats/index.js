import React from 'react';
import { connect } from 'react-redux';
import useStats from '../../hooks/useStats';
import { numberWithCommas } from '../../lib/util';

import { StatBlock, Confirmed, Recovered, Deaths, StatGrid } from './styles';
import StatChange from '../StatChange';
import CountUp, { useCountUp } from 'react-countup';

const mapStateToProps = state => ({
    selectedCountry: state.selectedCountry,
    darkMode: state.darkMode
});

function Stats({ url, darkMode }) {
    const { stats, loading, error } = useStats(url);
    const yesterdayData = useStats('https://corona.lmao.ninja/yesterday/all');

    if (error) return <p>Error: {error.message}</p>;

    return (
        <StatGrid darkMode={darkMode}>
            <StatBlock darkMode={darkMode}>
                <Confirmed darkMode={darkMode}>
                    {stats ? <CountUp separator="," end={stats.cases} /> : '0'}
                </Confirmed>
                <h4>Confirmed</h4>
                <StatChange
                    current={stats ? stats.cases : 0}
                    old={yesterdayData.stats ? yesterdayData.stats.cases : 0}
                    upColor="#f9345e"
                    downColor="#6dd428"
                />
            </StatBlock>
            <StatBlock darkMode={darkMode}>
                <Confirmed darkMode={darkMode}>
                    {' '}
                    {stats ? <CountUp separator="," end={stats.todayCases} /> : '0'}
                </Confirmed>
                <h4>New Cases</h4>
                <StatChange
                    current={stats ? stats.todayCases : 0}
                    old={yesterdayData.stats ? yesterdayData.stats.todayCases : 0}
                    upColor="#f9345e"
                    downColor="#6dd428"
                />
            </StatBlock>
            <StatBlock darkMode={darkMode}>
                <Recovered darkMode={darkMode}>
                    {' '}
                    {stats ? <CountUp separator="," end={stats.recovered} /> : '0'}
                </Recovered>
                <h4>Recovered</h4>

                <StatChange
                    current={stats ? stats.recovered : 0}
                    old={yesterdayData.stats ? yesterdayData.stats.recovered : 0}
                    upColor="#6dd428"
                    downColor="#f9345e"
                />
            </StatBlock>
            <StatBlock darkMode={darkMode}>
                <Deaths darkMode={darkMode}>
                    {stats ? <CountUp separator="," end={stats.deaths} /> : '0'}
                </Deaths>
                <h4>Deaths</h4>

                <StatChange
                    current={stats ? stats.deaths : 0}
                    old={yesterdayData.stats ? yesterdayData.stats.deaths : 0}
                    upColor="#f9345e"
                    downColor="#6dd428"
                />
            </StatBlock>
        </StatGrid>
    );
}

export default connect(mapStateToProps)(Stats);
