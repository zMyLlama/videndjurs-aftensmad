import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components"
import { device } from "../../js/Devices"

function ScheduleItem(props: any) {
    const [ itemDate, setItemDate ] = useState("Fetching...")

    const findIndexOfKey = function(key: string) {
        const array = Object.keys(props.data)
        return array.findIndex((day) => day === key);
    }

    const getWhenText = function() {
        const currentDayIndex = findIndexOfKey(props.today)    
        const todayDayIndex = findIndexOfKey(props.day); 

        if (props.today == props.day) return "I dag"
        if (props.index + 1 === currentDayIndex) {return "I går"} else if (props.index - 1 === currentDayIndex) {return "I morgen"}
        if (props.index + 1 < currentDayIndex) {return "Tidligere"} else if (props.index - 1 > currentDayIndex) {return todayDayIndex - currentDayIndex + " dage"}
    }

    const getDateOfWeek = function(w: number, add: number) { //This shit dies when a leap year rolls around
        const currentTime = new window.Date();
        const y = currentTime.getFullYear();
        
        var simple = new window.Date(y, 0, 1 + (w - 1) * 7);
        var dow = simple.getDay();
        const dateToWeek = simple;
        if (dow <= 4)
            dateToWeek.setDate(simple.getDate() - simple.getDay() + 1);
        else
            dateToWeek.setDate(simple.getDate() + 8 - simple.getDay());
        
        var day = (60 * 60 * 24 * 1000) * add;
        const finalDate = new window.Date(dateToWeek.getTime() + day).toString();
        return finalDate.split(" ")[2];
    }

    useEffect(() => {
        setItemDate(getDateOfWeek(props.data["Week"], props.index - 1))
    }, []);

    return ( 
        <TableRow forceSmallestGap={props.forceSmallestGap} today={ props.today == props.day ? true : false }>
            <LeftWrapper>
                <DayPrefix>{ props.data[props.day]["Prefix"] }</DayPrefix>
                <Date>{ itemDate } <span style={{ color: "#888B90" }}>th</span></Date>
            </LeftWrapper>
            <MiddleWrapper>
                <WhenWrapper today={ props.today == props.day ? true : false }>
                    <WhenText>{ getWhenText() }</WhenText>
                </WhenWrapper>
            </MiddleWrapper>
            <RightWrapper>
                <MealText>{ props.data[props.day]["Meal"] }</MealText>
            </RightWrapper>
        </TableRow>
     );
}

const TableRow = styled.div`
    display: flex;
    align-items: center;

    height: 130px;
    border-radius: 10px;
    background-color: ${props => props.today ? "var(--list-color)" : "var(--bg-color)"};
    border: ${props => props.today ? "1px solid var(--border-color)" : "var(--bg-color)"};
    flex-shrink: 0;
    column-gap: 80px;

    padding-left: 25px;
    padding-right: 25px;

    @media ${device.tablet} { 
        height: 100px;
        padding-left: 10px;
        padding-right: 10px;
        column-gap: 35px;
    }
    @media ${device.mobileL} { 
        height: 85px;
        column-gap: ${props => props.forceSmallestGap ? "5px" : "20px"};
     }
`

const LeftWrapper = styled.div`
    height: 100%;
    width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    @media ${device.tablet} { width: 60px; }
    @media ${device.mobileL} { width: 50px; }
`
const MiddleWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-shrink: 0;
    width: 130px;

    @media ${device.tablet} { width: 110px; }
    @media ${device.mobileL} { width: 80px; }
`
const RightWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    flex-grow: 1;
`

const DayPrefix = styled.h1`
    @media ${device.tablet} { font-size: 38px; }
    @media ${device.mobileL} { font-size: 30px; }
`
const Date = styled.h4`
    @media ${device.tablet} { font-size: 20px; }
    @media ${device.mobileL} { font-size: 18px; }
`

const pulseAnimation = keyframes`
    0% { outline: 0px solid rgba(66, 133, 244, 1); }
    60% { outline-color: rgba(66, 133, 244, 0.4); }
    100% { outline: 10px solid rgba(66, 133, 244, 0); }
`

const WhenWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    width: fit-content;
    height: 35px;
    background-color: ${props => props.today ? "var(--attention-color)" : "var(--icon-color)"};

    animation-name: ${props => props.today ? 'none' : "none"};
    animation-duration: 3s;
    animation-iteration-count: infinite;

    @media ${device.tablet} { height: 28px; border-radius: 5px; }
    @media ${device.mobileL} { height: 22px; border-radius: 5px; }
`

const WhenText = styled.h6`
    color: white;
    font-weight: bold;
    margin-left: 20px;
    margin-right: 20px;
    
    
    @media ${device.tablet} { font-size: 16px; margin-left: 15px; margin-right: 15px; }
    @media ${device.mobileL} { font-size: 13px; margin-left: 10px; margin-right: 10px; }
`

const MealText = styled.h6`
    @media ${device.tablet} { font-size: 16px; }
    @media ${device.mobileL} { font-size: 13px; }
`

export default ScheduleItem;