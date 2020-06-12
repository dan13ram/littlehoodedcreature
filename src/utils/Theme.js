const darkTheme = {
    '--dark-color': 'black',
    '--light-color': 'white',
    '--light-color-3': 'rgba(255,255,255,0.5)',
    '--shadow-color': 'rgba(128,128,128)',
    '--shadow-color-3': 'rgba(128,128,128,0.3)',
};

// const darkTheme = {
//     '--dark-color': '#0F3B5C',
//     '--light-color': '#58B2F5',
//     '--light-color-3': 'rgba(88, 178, 245, 0.5)',
//     '--shadow-color': '#2C73A8',
//     '--shadow-color-3': 'rgba(44, 115, 168, 0.3)',
// };

const lightTheme = {
    '--dark-color': 'white',
    '--light-color': 'black',
    '--light-color-3': 'rgba(0,0,0,0.5)',
    '--shadow-color': 'rgba(128,128,128)',
    '--shadow-color-3': 'rgba(128,128,128,0.3)',
};

export const applyTheme = (nextTheme) => {
    const theme = nextTheme === 'dark' ? lightTheme : darkTheme;
    Object.keys(theme).forEach((key) => {
        const value = theme[key];
        document.documentElement.style.setProperty(key, value);
    });
};
