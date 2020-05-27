export function appState(
    state = {
        selectedCountry: {
            iso3: 'USA',
            lat: 0,
            long: 0,
        },
        countryChartData: [],
        countryModal: false,
        modalData: {},
    },
    action
) {
    switch (action.type) {
        case 'SET_COUNTRY':
            return {
                ...state,
                selectedCountry: action.data,
            };
        case 'SAVE_COUNTRY_DATA':
            return { ...state, countryData: action.data };
        case 'SAVE_COUNTRY_CHART_DATA':
            return { ...state, countryChartData: action.data };
        case 'TOGGLE_MODAL':
            let countryModal = !state.countryModal;
            if (
                state.countryModal &&
                action.data.countryInfo.iso3 !== state.modalData.countryInfo.iso3
            )
                countryModal = true;
            return { ...state, countryModal, modalData: action.data };
        case 'CLOSE_MODAL':
            return { ...state, countryModal: false, modalData: {} };
        default:
            return state;
    }
}
