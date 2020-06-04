const darkTheme = {
    '--dark-color': 'black',
    '--light-color': 'white',
};

const lightTheme = {
    '--dark-color': 'white',
    '--light-color': 'black',
};

export const applyTheme = (nextTheme) => {
    const theme = nextTheme === 'dark' ? lightTheme : darkTheme;
    Object.keys(theme).forEach((key) => {
        const value = theme[key];
        document.documentElement.style.setProperty(key, value);
    });
};
