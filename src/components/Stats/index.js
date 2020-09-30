import React from 'react';
import CountUp from 'react-countup';

import useStats from '@hooks/useStats';
import StatChange from '@components/StatChange';
import { useDarkMode } from '@context';

function Stats({ url }) {
    const { darkMode } = useDarkMode();
    const { stats, loading, error } = useStats(url);
    const yesterdayData = useStats('https://corona.lmao.ninja/v2/all?yesterday=true');

    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="stat__grid">
            <div className={darkMode ? 'stat__block dark' : 'stat__block'} data-testid="app-stat-block">
                <span className="confirmed" data-testid="app-stat-cases">
                    {stats ? <CountUp separator="," end={stats.cases} /> : '0'}
                </span>
                <h1>Confirmed</h1>
                <StatChange
                    current={stats ? stats.cases : 0}
                    old={yesterdayData.stats ? yesterdayData.stats.cases : 0}
                    upColor="#f9345e"
                    downColor="#6dd428"
                />
            </div>
            <div className={darkMode ? 'stat__block dark' : 'stat__block'}>
                <span className="confirmed" data-testid="app-stat-todayCases">
                    {' '}
                    {stats ? <CountUp separator="," end={stats.todayCases} /> : '0'}
                </span>
                <h1>New Cases</h1>
                <StatChange
                    current={stats ? stats.todayCases : 0}
                    old={yesterdayData.stats ? yesterdayData.stats.todayCases : 0}
                    upColor="#f9345e"
                    downColor="#6dd428"
                />
            </div>
            <div className={darkMode ? 'stat__block dark' : 'stat__block'}>
                <span className="recovered" data-testid="app-stat-recovered">
                    {' '}
                    {stats ? <CountUp separator="," end={stats.recovered} /> : '0'}
                </span>
                <h1>Recovered</h1>

                <StatChange
                    current={stats ? stats.recovered : 0}
                    old={yesterdayData.stats ? yesterdayData.stats.recovered : 0}
                    upColor="#6dd428"
                    downColor="#f9345e"
                />
            </div>
            <div className={darkMode ? 'stat__block dark' : 'stat__block'}>
                <span className="deaths" data-testid="app-stat-deaths">
                    {stats ? <CountUp separator="," end={stats.deaths} /> : '0'}
                </span>
                <h1>Deaths</h1>

                <StatChange
                    current={stats ? stats.deaths : 0}
                    old={yesterdayData.stats ? yesterdayData.stats.deaths : 0}
                    upColor="#f9345e"
                    downColor="#6dd428"
                />
            </div>
        </div>
    );
}

export default Stats;
