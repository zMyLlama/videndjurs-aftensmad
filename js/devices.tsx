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
    anythingAboveMobileL: `(min-width: ${size.mobileL})`,
    tablet: `(max-width: ${size.tablet})`,
    anythingAboveTablet: `(min-width: ${size.tablet})`,
    laptopS: `(max-width: ${size.laptopS})`,
    anythingAboveLaptopS: `(min-width: ${size.laptopS})`,
    laptopL: `(min-width: ${size.laptopL})`,
    anythingAboveLaptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    anythingAboveDesktop: `(min-width: ${size.desktop})`,
    ultrawide: `(min-width: ${size.ultrawide})`,
    anythingAboveUltrawide: `(min-width: ${size.ultrawide})`,
};

export const fakeData = {
    "0": {
        "Week": 35,
        "Monday": {
        "Meal": "Fiskefrikadeller m/kartofler, persillesovs og gulerodssalat",
        "Prefix": "M",
        "Rating": "4,2"
        },
        "Tuesday": {
        "Meal": "Gryderet m/ris",
        "Prefix": "T",
        "Rating": "0,0"
        },
        "Wednesday": {
        "Meal": "Pasta carbonara",
        "Prefix": "O",
        "Rating": "0,0"
        },
        "Thursday": {
        "Meal": "Kylling m/ris og bearnaisesovs",
        "Prefix": "T",
        "Rating": "0,0"
        },
        "Friday": {
        "Meal": "Tarteletter m/høns i asparges",
        "Prefix": "F",
        "Rating": "0,0"
        },
        "Saturday": {
        "Meal": "Glaseret skinke m/flødekartofler",
        "Prefix": "L",
        "Rating": "0,0"
        },
        "Sunday": {
        "Meal": "Pitabrød m/kebab og diverse grønt og dressing",
        "Prefix": "S",
        "Rating": "0,1"
        }
    },
    "1": {},
    "2": {}
}