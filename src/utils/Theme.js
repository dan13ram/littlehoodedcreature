const darkTheme = {
    '--dark-color': '#692c2f',
    '--dark-color-3': 'rgba(105, 44, 47, 0.3)',
    '--light-color': 'rgba(255, 240, 240)',
    '--light-color-3': 'rgba(255, 240, 240, 0.3)',
    '--light-color-8': 'rgba(255, 240, 240, 0.8)',
    '--shadow-color': 'rgba(255, 107, 147)',
    '--shadow-color-3': 'rgba(255, 107, 147, 0.3)'
};

const lightTheme = {
    '--light-color': '#692c2f',
    '--light-color-3': 'rgba(105, 44, 47, 0.3)',
    '--light-color-8': 'rgba(105, 44, 47, 0.8)',
    '--dark-color': 'rgba(255, 240, 240)',
    '--dark-color-3': 'rgba(255, 240, 240, 0.3)',
    '--shadow-color': 'rgba(255, 107, 147)',
    '--shadow-color-3': 'rgba(255, 107, 147, 0.3)'
};

export const applyTheme = (nextTheme) => {
    const theme = nextTheme === 'dark' ? lightTheme : darkTheme;
    Object.keys(theme).forEach((key) => {
        const value = theme[key];
        document.documentElement.style.setProperty(key, value);
    });
};
