export function setCountry(data) {
    return {
        type: 'SET_COUNTRY',
        data
    };
}

export function saveCountryData(data) {
    return {
        type: 'SAVE_COUNTRY_DATA',
        data
    };
}

export function toggleCountryModal(data = {}) {
    return {
        type: 'TOGGLE_MODAL',
        data
    };
}

export function closeCountryModal() {
    return {
        type: 'CLOSE_MODAL'
    };
}

export function saveCountryChartData(data) {
    return {
        type: 'SAVE_COUNTRY_CHART_DATA',
        data
    };
}

export function getCountryChartData(code = 'USA') {
    return function (dispatch) {
        return fetch(`https://corona.lmao.ninja/v2/historical/${code}?lastdays=30`)
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error)
            )
            .then(json => dispatch(saveCountryChartData(json)));
    };
}
