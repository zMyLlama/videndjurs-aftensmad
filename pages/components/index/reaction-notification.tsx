import { useEffect, useState } from "react"
import styled from "styled-components"
import { motion, useAnimationControls, AnimatePresence } from "framer-motion"
import { device } from "../../js/devices"

import ScheduleItem from "./schedule.item"

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

    const castRating = function() {
        props.setAllowRating(false);
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

    useEffect(() => {
        controls.start("animate");
    }, [])

    return ( 
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
                            <ScheduleItem data={props.data} day={findValueOfIndex(findIndexOfKey(props.today) - 1)} today={props.today} index={findIndexOfKey(props.today) - 1} forceSmallestGap={true} />
                        </YesterdayMealWrapper>
                        :
                        null
                    }
                </AnimatePresence>

                <SVG isExpanded={expanded} onClick={() => {props.setAllowRating(false), setExpanded(false)} } width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 13L13 1" stroke="#4b4d52" stroke-linecap="round"/>
                    <path d="M13 13L1 1" stroke="#2D2F33" stroke-linecap="round"/>
                </SVG>
            </TopWrapper>
            <Line />
            <BottomWrapper>
                { Rating.map((key, index) => {
                    return <RatingButton key={index} onClick={ castRating }>{ key }</RatingButton>
                }) }
            </BottomWrapper>
        </Wrapper>
     );
}

const Wrapper = styled(motion.div)`
    position: absolute;
    max-width: 750px;
    min-width: 610px;
    width: 30vw;
    height: fit-content;
    background: #FFFFFF;
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
    font-weight: 500;
    @media ${device.mobileL} { font-size: 14.5px; }
`
const More = styled.a`
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