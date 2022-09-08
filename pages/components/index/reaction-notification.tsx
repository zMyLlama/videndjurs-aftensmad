import { useEffect, useState } from "react"
import styled from "styled-components"
import { motion, useAnimationControls, AnimatePresence } from "framer-motion"
import { device } from "../../../js/devices"

import ScheduleItem from "./schedule.item"

const getHostName = function() {
    const URL = new window.URL(window.location.href).hostname;
    var finalURL = "https://" + URL;
    if (URL == "localhost") finalURL = "http://localhost:3000";
    return finalURL;
}
    
const variants = {
    initial: { bottom: "-110px" },
    animate: { bottom: "10px", height: "fit-content" },
    expand: { bottom: "10px", height: "fit-content" },
    exit: { bottom: "-130px", height: "fit-content" },
}

interface Props {
    isExpanded : boolean
}

function ReactionNotification(props: any) {
    const controls = useAnimationControls()
    const Rating = [ "😢", "🙁", "😐", "🙂", "😀️" ]

    const [expanded, setExpanded] = useState(false);
    const [ hasReactedToday, sethasReactedToday ] = useState(false);

    const castRating = function(score: number) {
        props.setAllowRating(false);
        setExpanded(false);

        var exdate = new Date();
        exdate.setHours(23);
        exdate.setMinutes(59);
        exdate.setSeconds(59);
        document.cookie='reactedToday=1; expires='+exdate+'; path=/; SameSite=lax';
        

        const addRating = async function() {
            await fetch(getHostName() + '/api/addRating', { /* https://campusmad.netlify.app/api/getData */
                method: 'POST',
                body: JSON.stringify(score),
                headers: {
                'CONTENT_TYPE': 'application/json',
                },
            })
        }
        addRating();
    }
    const expandClick = function() {
        if (!expanded) {setExpanded(true); controls.start("expand"); return;}
        setExpanded(false); controls.start("animate");
    }
    const findIndexOfKey = function(key: string) {
        const array = Object.keys(props.data)
        return array.findIndex((day) => day === key);
    }
    const findValueOfIndex = function(index: number) {
        const array = Object.keys(props.data)
        return array[index];
    }
    const hasReactedTodayCheck = function() {
        if (!document) return false;
        const cookies = document.cookie.split(";");
        var exists : boolean = false;
        cookies.map((key) => {
            if (key.split("=")[0].toString() == "reactedToday" || key.split("=")[0].toString() == " reactedToday") {
                exists = true;
            }
        })
        
        sethasReactedToday(exists);
    }

    useEffect(() => {
        getHostName();
        hasReactedTodayCheck();
        controls.start("animate");
    }, [])

    return ( 
        <AllWrapper>
            { hasReactedToday ? 
                <div></div>
            :
                <Wrapper
                    initial={"initial"}
                    animate={controls}
                    exit={"exit"}
                    variants={variants}
                >
                    <TopWrapper>
                        <Question>Hvad syntes du om maden i går?</Question>
                        <More onClick={ expandClick }>{ expanded ? "Jeg er ikke dement længere" : "Dement? Se hvad vi fik i går" }</More>

                        <AnimatePresence>
                            { expanded ?
                                <YesterdayMealWrapper
                                    initial={{ height: "0px", marginTop: "10px", marginBottom: "20px" }}
                                    animate={{ height: "fit-content", marginTop: "10px", marginBottom: "20px" }}
                                    exit={{ height: "0px", marginTop: "0px", marginBottom: "0px" }}
                                >
                                    <ScheduleItem data={props.data} day={findValueOfIndex(findIndexOfKey(props.today) - 1)} today={props.today} currentlySelectedWeek={props.weekNumber} index={findIndexOfKey(props.today) - 1} forceSmallestGap={true} />
                                </YesterdayMealWrapper>
                                :
                                null
                            }
                        </AnimatePresence>

                        <SVG isExpanded={expanded} onClick={() => {props.setAllowRating(false), setExpanded(false)} } width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 13L13 1" stroke-linecap="round"/>
                            <path d="M13 13L1 1" stroke-linecap="round"/>
                        </SVG>
                    </TopWrapper>
                    <Line />
                    <BottomWrapper>
                        { Rating.map((key, index) => {
                            return <RatingButton key={index} onClick={() => castRating(index) }>{ key }</RatingButton>
                        }) }
                    </BottomWrapper>
                </Wrapper>
            }
        </AllWrapper>
    );
}

const AllWrapper = styled.div`
    max-width: 750px;
    min-width: 610px;
    width: 30vw;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1;

    display: flex;
    justify-content: center;

    @media ${device.tablet} { width: 40vw; min-width: 450px; }
    @media ${device.mobileL} { width: calc(100vw - 40px); min-width: 0px; }
`

const Wrapper = styled(motion.div)`
    position: absolute;
    max-width: 750px;
    min-width: 610px;
    width: 30vw;
    height: fit-content;
    background-color: ${props => props.theme === "light" ? "white" : "var(--list-color)"};
    border: 1px solid var(--border-color);
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    z-index: 1000;

    margin-left: auto;
    margin-right: auto;
    padding-left: 1;

    @media ${device.tablet} { width: 40vw; min-width: 450px; }
    @media ${device.mobileL} { width: calc(100vw - 40px); min-width: 0px; }
`

const TopWrapper = styled.div`
    position: relative;
    padding-left: 10px;
    padding-right: 15px;
    padding-top: 5px;
    margin-bottom: 5px;
    flex-shrink: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;

    @media ${device.mobileL} { margin-bottom: 12px; }
`
const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: var(--border-color);
    flex-shrink: 0;
`
const BottomWrapper = styled.div`
    display: flex;
    justify-content: center;
    column-gap: 30px;
    margin-bottom: 5px;
    margin-top: 5px;
    flex-shrink: 0;
`

const Question = styled.p`
    color: var(--text-color);
    font-weight: 500;
    @media ${device.mobileL} { font-size: 14.5px; }
`
const More = styled.p`
    all: unset;
    width: fit-content;
    cursor: pointer;
    color: var(--attention-color);
    font-family: Quicksand;
    font-size: 14px;
    text-decoration: underline;
    @media ${device.mobileL} { font-size: 13px; }
`

const RatingButton = styled.h4`
    cursor: pointer;
    @media ${device.mobileL} { font-size: 20px; }
`

const SVG = styled.svg<Props>`
    stroke: var(--detail-text-color);
    position: absolute;
    right: 15px;
    cursor: pointer;

    top: ${props => props.isExpanded ? "12px" : ""};

    @media ${device.laptopL} { width: 22px; height: 22px; }
`

const YesterdayMealWrapper = styled(motion.div)`
    width: fit-content;
    height: fit-content;
    margin-top: 10px;
    margin-bottom: 20px;
    overflow-y: hidden;
`

export default ReactionNotification;