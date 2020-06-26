const darkTheme = {
    '--dark-color': 'rgba(145, 125, 126)',
    '--dark-color-3': 'rgba(145, 125, 126, 0.3)',
    '--dark-color-8': 'rgba(145, 125, 126, 0.8)',
    '--light-color': 'rgba(255, 255, 255)',
    '--light-color-3': 'rgba(255, 255, 255, 0.3)',
    '--light-color-8': 'rgba(255, 255, 255, 0.8)',
};

const lightTheme = {
    '--light-color': 'rgb(145, 125, 126)',
    '--light-color-3': 'rgba(145, 125, 126, 0.3)',
    '--light-color-8': 'rgba(145, 125, 126, 0.8)',
    '--dark-color': 'rgba(255, 255, 255)',
    '--dark-color-3': 'rgba(255, 255, 255, 0.3)',
    '--dark-color-8': 'rgba(255, 255, 255, 0.8)',
};

export const applyTheme = (nextTheme) => {
    const theme = nextTheme === 'dark' ? lightTheme : darkTheme;
    Object.keys(theme).forEach((key) => {
        const value = theme[key];
        document.documentElement.style.setProperty(key, value);
    });
};
