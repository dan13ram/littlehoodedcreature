const darkTheme = {
    '--dark-color': 'rgba(196, 88, 93)',
    '--dark-color-3': 'rgba(196, 88, 93, 0.3)',
    '--dark-color-8': 'rgba(196, 88, 93, 0.8)',
    '--light-color': 'rgba(255, 245, 245)',
    '--light-color-3': 'rgba(255, 245, 245, 0.3)',
    '--light-color-8': 'rgba(255, 245, 245, 0.8)',
    '--shadow-color': 'rgba(148, 21, 26)',
    '--shadow-color-3': 'rgba(148, 21, 26, 0.3)'
};

const lightTheme = {
    '--light-color': 'rgb(196, 88, 93)',
    '--light-color-3': 'rgba(196, 88, 93, 0.3)',
    '--light-color-8': 'rgba(196, 88, 93, 0.8)',
    '--dark-color': 'rgba(255, 245, 245)',
    '--dark-color-3': 'rgba(255, 245, 245, 0.3)',
    '--dark-color-8': 'rgba(255, 245, 245, 0.8)',
    '--shadow-color': 'rgba(148, 21, 26)',
    '--shadow-color-3': 'rgba(148, 21, 26, 0.3)'
};

export const applyTheme = (nextTheme) => {
    const theme = nextTheme === 'dark' ? lightTheme : darkTheme;
    Object.keys(theme).forEach((key) => {
        const value = theme[key];
        document.documentElement.style.setProperty(key, value);
    });
};
