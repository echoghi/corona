import Cookies from 'universal-cookie';
import theme from '../lib/theme';

const cookies = new Cookies();

/**
 * isDomAvailable
 * @description Checks to see if the DOM is available by checking the existence of the window and document
 * @see https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/ExecutionEnvironment.js#L12
 */

export function isDomAvailable() {
    return typeof window !== 'undefined' && !!window.document && !!window.document.createElement;
}

export function numberWithCommas(x) {
    if (!x) return x;

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function getPercentageChange(oldNumber, newNumber) {
    const decreaseValue = newNumber - oldNumber;
    const percentChange = (decreaseValue / oldNumber) * 100;

    return percentChange.toFixed(2);
}

export function setTheme() {
    const isDark = JSON.parse(cookies.get('isDark'));

    document.getElementsByTagName('body')[0].style.background = !isDark
        ? theme.white.primary
        : theme.dark.primary;
}
