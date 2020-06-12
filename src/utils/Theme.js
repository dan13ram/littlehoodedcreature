const darkTheme = {
    '--dark-color': 'black',
    '--light-color': 'white',
    '--light-color-3': 'rgba(255,255,255,0.5)',
};

const lightTheme = {
    '--dark-color': 'white',
    '--light-color': 'black',
    '--light-color-3': 'rgba(0,0,0,0.5)',
};

export const applyTheme = (nextTheme) => {
    const theme = nextTheme === 'dark' ? lightTheme : darkTheme;
    Object.keys(theme).forEach((key) => {
        const value = theme[key];
        document.documentElement.style.setProperty(key, value);
    });
};
