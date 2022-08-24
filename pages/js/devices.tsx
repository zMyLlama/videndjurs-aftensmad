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

export const fakeData = 
{
    ["Week"]: 34,
    ["Monday"]: {
        ["Meal"]: "Svinekøller m/flødekartofler",
        ["Prefix"]: "M",
        ["Rating"]: 0,
    },
    ["Tuesday"]: {
        ["Meal"]: "Karrygryde m/chili, gulerødder, svine wokstrimler og ris",
        ["Prefix"]: "T",
        ["Rating"]: 0,
    },
    ["Wednesday"]: {
        ["Meal"]: "Piratens pølsegryde m/pasta",
        ["Prefix"]: "O",
        ["Rating"]: 0,
    },
    ["Thursday"]: {
        ["Meal"]: "Kyllingepande m/vilde ris",
        ["Prefix"]: "T",
        ["Rating"]: 0,
    },
    ["Friday"]: {
        ["Meal"]: "Græsk moussaka",
        ["Prefix"]: "F",
        ["Rating"]: 0,
    },
    ["Saturday"]: {
        ["Meal"]: "Fransk hotdogs og Koldskål m/kammerjunker",
        ["Prefix"]: "L",
        ["Rating"]: 0,
    },
    ["Sunday"]: {
        ["Meal"]: "Kyllingelår m/petit kartofler og pikantost",
        ["Prefix"]: "S",
        ["Rating"]: 0,
    },
};