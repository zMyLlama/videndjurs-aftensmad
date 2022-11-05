import styled, { createGlobalStyle, css } from "styled-components"

export const lightTheme = {
    logoTextColor: "#fff",
    selectedScheduleItemBackground: "var(--attention-color)",
    selectedScheduleItemText: "white",
    fillSwitchWeekButton: "white",
    accentBrightness: "brightness(1)",
    rollCircleColor: "var(--logo-color)",
    modalBackgroundColor: "#fff",
    menuHoverItem: "#E5E5E5",
    bgLoginColor: "#fff",
    announcementBg: "#fff",
}
export const darkTheme = {
    logoTextColor: "#31C9C9",
    selectedScheduleItemBackground: "#032B3A",
    selectedScheduleItemText: "var(--attention-color)",
    fillSwitchWeekButton: "var(--attention-color)",
    accentBrightness: "brightness(0.7)",
    rollCircleColor: "var(--attention-color)",
    modalBackgroundColor: "var(--list-color)",
    menuHoverItem: "#11161A",
    bgLoginColor: "#000",
    announcementBg: "#000",
}

const lightMode = `
    --hover-opacity: 0.9;
    --transition-time: 0.15s;

    --bg-color: #f5f5f5;
    --logo-color: #2d2f33;
    --breakup-color: #ff7e55;
    --detail-text-color: #636363;
    --text-color: #000;
    --border-color: #E5E5E5;
    --list-color: #EDEDED;
    --icon-color: #888B90;
    --success-color: #3ECCA5;
    --attention-color: #4285F4;
`

const darkMode = `
    --hover-opacity: 0.9;
    --transition-time: 0.15s;

    --bg-color: #070B0D;
    --logo-color: #032B3A;
    --breakup-color: #ff7e55;
    --detail-text-color: #C2C3C3;
    --text-color: #FFFFFF;
    --border-color: #252525;
    --list-color: #151A1E;
    --icon-color: #888B90;
    --success-color: #3ECCA5;
    --attention-color: #31C9C9;
`

export const GlobalStyles = createGlobalStyle`
    :root {
        ${props => props.theme === "light" ? css`${lightMode}` : css`${darkMode}`}
    }
`