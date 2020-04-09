export function appState(
    state = {
        selectedCountry: {
            iso3: 'USA',
            lat: 38,
            long: -97
        },
        countryChartData: []
    },
    action
) {
    switch (action.type) {
        case 'SET_COUNTRY':
            return { ...state, selectedCountry: action.data };
        case 'SAVE_COUNTRY_DATA':
            return { ...state, countryData: action.data };
        case 'SAVE_COUNTRY_CHART_DATA':
            return { ...state, countryChartData: action.data };
        default:
            return state;
    }
}
