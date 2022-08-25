const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '800px',
    laptopS: '1180px',
    laptopL: '1440px',
    desktop: '2560px',
    ultrawide: '3260px'
}

export const device = {
    mobileS: `(min-width: ${size.mobileS})`,
    mobileM: `(min-width: ${size.mobileM})`,
    mobileL: `(max-width: ${size.mobileL})`,
    tablet: `(max-width: ${size.tablet})`,
    laptopS: `(max-width: ${size.laptopS})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    ultrawide: `(min-width: ${size.ultrawide})`
};

export const fakeData = {
    "Week": 0,
    "Monday": {
        "Meal": "Loading...",
        "Prefix": "M",
        "Rating": 0
    },
    "Tuesday": {
        "Meal": "Loading...",
        "Prefix": "T",
        "Rating": 0
    },
    "Wednesday": {
        "Meal": "Loading...",
        "Prefix": "O",
        "Rating": 0
    },
    "Thursday": {
        "Meal": "Loading...",
        "Prefix": "T",
        "Rating": 0
    },
    "Friday": {
        "Meal": "Loading...",
        "Prefix": "F",
        "Rating": 0
    },
    "Saturday": {
        "Meal": "Loading...",
        "Prefix": "L",
        "Rating": 0
    },
    "Sunday": {
        "Meal": "Loading...",
        "Prefix": "S",
        "Rating": 0
    }
}