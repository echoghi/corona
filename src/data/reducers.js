import Cookies from 'universal-cookie';
import theme from '../lib/theme';

const cookies = new Cookies();

export function appState(
    state = {
        darkMode: JSON.parse(cookies.get('isDark')) || false,
        selectedCountry: {
            iso3: 'USA',
            lat: 38,
            long: -97
        },
        countryChartData: [],
        countryModal: false,
        modalData: {}
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
        case 'TOGGLE_DARK_MODE':
            cookies.set('isDark', !state.darkMode, { path: '/' });

            document.getElementsByTagName('body')[0].style.background = !state.darkMode
                ? theme.dark.primary
                : theme.white.primary;
            return { ...state, darkMode: !state.darkMode };
        default:
            return state;
    }
}
