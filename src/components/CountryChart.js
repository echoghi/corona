import React from 'react';
import { connect } from 'react-redux';
import { AreaChart, XAxis, YAxis, CartesianGrid, Area, Tooltip } from 'recharts';

const mapStateToProps = state => ({
    countryChartData: state.countryChartData
});

function CountryChart({ countryChartData }) {
    const data = [];

    if (!countryChartData.timeline) return <div>Loading...</div>;

    for (let day in countryChartData.timeline.cases) {
        data.push({
            name: day,
            cases: countryChartData.timeline.cases[day],
            deaths: countryChartData.timeline.deaths[day],
            recovered: countryChartData.timeline.recovered[day]
        });
    }

    return (
        <AreaChart
            width={830}
            height={150}
            data={data}
            margin={{ top: 0, right: 0, left: 10, bottom: 0 }}
        >
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6DD428" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6DD428" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f9345e" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f9345e" stopOpacity={0} />
                </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            {/* <Area
                type="monotone"
                dataKey="cases"
                stroke="#efefef"
                fillOpacity={1}
                fill="url(#colorUv)"
            /> */}
            <Area
                type="monotone"
                dataKey="recovered"
                stroke="#1cb142"
                fillOpacity={1}
                fill="url(#colorUv)"
            />
            <Area
                type="monotone"
                dataKey="deaths"
                stroke="#f9345e"
                fillOpacity={1}
                fill="url(#colorPv)"
            />
        </AreaChart>
    );
}

export default connect(mapStateToProps)(CountryChart);
