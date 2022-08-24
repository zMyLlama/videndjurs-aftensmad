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
    },
    ["Tuesday"]: {
        ["Meal"]: "Karrygryde m/chili, gulerødder, svine wokstrimler og ris",
        ["Prefix"]: "T",
    },
    ["Wednesday"]: {
        ["Meal"]: "Piratens pølsegryde m/pasta",
        ["Prefix"]: "O",
    },
    ["Thursday"]: {
        ["Meal"]: "Kyllingepande m/vilde ris",
        ["Prefix"]: "T",
    },
    ["Friday"]: {
        ["Meal"]: "Græsk moussaka",
        ["Prefix"]: "F",
    },
    ["Saturday"]: {
        ["Meal"]: "Fransk hotdogs og Koldskål m/kammerjunker",
        ["Prefix"]: "L",
    },
    ["Sunday"]: {
        ["Meal"]: "Kyllingelår m/petit kartofler og pikantost",
        ["Prefix"]: "S",
    },
};