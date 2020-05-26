import { useLayoutEffect } from 'react';

export default function useTheme(theme, isDark) {
    useLayoutEffect(() => {
        document.getElementsByTagName('html')[0].style.background = !isDark
            ? theme.white.primary
            : theme.dark.primary;
    }, [theme, isDark]);
}
