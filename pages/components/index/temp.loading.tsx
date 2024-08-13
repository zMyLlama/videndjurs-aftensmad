import dayjs, { Dayjs } from "dayjs";
import isoWeek from 'dayjs/plugin/isoWeek';
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";
import styled from "styled-components";
import { device } from "../../../js/devices";

const translatedNames : any = ["Ma", "Ti", "On", "To", "Fr", "Lø", "Sø"]
const mealPlan : any = {
    "week": 33,
    "meals": {
        "monday": "Kylling i karry med ris",
        "tuesday": "Pasta carbonarda",
        "wednesday": "Taco tubes med oksekød",
        "thursday": "Lasagne",
        "friday": "Kylling med brun sovs og kartofler",
        "saturday": "Sprøde fisk med pommes frites",
        "sunday": "Kokkens overraskelse",
    }
}

dayjs.extend(isoWeek);

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        }
    }
}

const item = {
    hidden: { opacity: 0, transform: 'translateY(20px)' },
    show: { opacity: 1, transform: 'translateY(0px)', transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } }
}

function TempLoading() {
    const [ clientDateState, setClientDateState ] = useState<Dayjs>(dayjs());
    const [ weekNumberState, setWeekNumberState ] = useState<number>(0);
    const [ weekdayNumberState, setWeekdayNumberState ] = useState<number>(0);

    
    useEffect(() => {
        const clientDate: Dayjs = dayjs();
        setClientDateState(clientDate)
        setWeekNumberState(clientDate.isoWeek());
        setWeekdayNumberState((clientDate.isoWeekday() - 1));
    }, [])

    return ( 
        <Wrapper>
            <MarqueeWrapper>
                <Marquee
                    gradient={false}
                    speed={20}
                >
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => {
                        return <MarqueeText key={i}>Under ombygning   •  </MarqueeText>
                    })}
                </Marquee>
            </MarqueeWrapper>
            <Navigation>
                <Logo href="/">minmadplan.dk</Logo>
                <MealPlanStatus 
                    style={{ 
                        color: weekNumberState === mealPlan.week ? "#43965b" : "#c83e2e",
                        backgroundColor: weekNumberState === mealPlan.week ? "#d9f9e1" : "#fae5e3", 
                    }}
                >
                    { weekNumberState === mealPlan.week ? "Up-to-date" : "Forældet" }
                </MealPlanStatus>
            </Navigation>

            <NewWrapper>
                <Left>
                    <HeroText>Snart åbnes <InsideText><InsideTextImage src="/LeakForCampusmad.png" /></InsideText> der et nyt kapitel for campusmad 🙌</HeroText>
                    <HeroParagraph>... bare vent en smule længere </HeroParagraph>
                </Left>
                <Right>
                    <Shot src="/WebsiteShot.png" />
                </Right>
                <Gradient src="/GradientBG.png" />
            </NewWrapper>

            <MealPlanTitle>Madplan</MealPlanTitle>
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
            >
                { Object.keys(mealPlan.meals).map((day, index) => {
                    return <MealWrapper
                        variants={item}
                    >
                        <MealDay style={{ backgroundColor: `${weekdayNumberState === index && weekNumberState === mealPlan.week ? "#454cde" : "#D0D5DD"}`, color: `${weekdayNumberState === index && weekNumberState === mealPlan.week ? "white" : "#181818"}` }}>{ translatedNames[index] }</MealDay>
                        <Meal>{ mealPlan.meals[day] }</Meal>
                    </MealWrapper>
                }) }
            </motion.div>

            {
                /*
                    <List>
                        <Item>
                            <Left>Mandag</Left>
                            <Right>Kyllingfilet m/bacon, ovnkartfler og barbecuesovs</Right>
                        </Item>
                        <Item>
                            <Left>Tirsdag</Left>
                            <Right>Flæskesteg m/kartofler, rødkål og brun sovs</Right>
                        </Item>
                        <Item>
                            <Left>Onsdag</Left>
                            <Right>Kødboller m/kartofler, rødkål og brun sovs</Right>
                        </Item>
                        <Item>
                            <Left>Torsdag</Left>
                            <Right>Fiskefrikadeller m/rugbrød, remoulade og citron</Right>
                        </Item>
                        <Item>
                            <Left>Fredag</Left>
                            <Right>Tarteletter (Sidste aften måltid inden ferien)</Right>
                        </Item>
                        <Item>
                            <Left>Lørdag</Left>
                            <Right>No way det jo ferie. Den nye madplan er godt under udvikling!</Right>
                        </Item>
                        <Item>
                            <Left>Søndag</Left>
                            <Right>No way det jo ferie. Den nye madplan er godt under udvikling!</Right>
                        </Item>
                    </List>
                */
            }
        </Wrapper>
    );
}

const MealPlanTitle = styled.p`
    font-family: 'Inter';
    font-weight: 400;
    font-size: 16px;
    color: #344054;

    margin-top: 30px;
    margin-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
`

const Gradient = styled.img`
    position: absolute;
    width: 60%;
    height: 100%;
    right: 0;
    top: 0;
    opacity: 0.8;

    border-bottom-right-radius: 4rem;
    z-index: -1;

    @media ${device.tablet} { 
        border-bottom-right-radius: 2rem;
    }
`

const InsideText = styled.div`
    position: relative;

    border-radius: 100px;
    margin-bottom: -5px;
    margin-right: -5px;
    height: 40px;
    width: 100px;
    background-color: black;
    display: inline-block;
    overflow: hidden;

    @media ${device.anythingAboveLaptopL} { 
        height: 48px;
    }
    @media ${device.tablet} { 
        height: 35px;
    }
`

const InsideTextImage = styled.img`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow-y: scroll;

    background-color: white;
`

const NewWrapper = styled.div`
    position: relative;
    display: flex;
    flex-shrink: 0;
    z-index: -2;

    background-color: #eff0f2;
    width: 100%;
    height: fit-content;
    min-height: 200px;
    border-bottom-left-radius: 4rem;
    border-bottom-right-radius: 4rem;

    padding-top: 30px;
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 60px;

    @media ${device.tablet} { 
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 40px;
        border-bottom-left-radius: 2rem;
        border-bottom-right-radius: 2rem;
    }
`

const ReadMoreButton = styled.button`
    display: flex;
    column-gap: 10px;
    align-items: center;
    justify-content: center;

    background-color: #444CE7;
    color: white;
    font-family: 'Inter';
    font-size: 16px;
    font-weight: 600;
    border-radius: 12px;

    height: 48px;
    padding-left: 15px;
    padding-right: 15px;
    margin-top: 40px;

    @media ${device.tablet} { 
        margin-top: 30px;
        height: 42px;
    }
`

const Left = styled.div`
    width: 470px;
    flex-shrink: 0;

    @media ${device.tablet} { 
        width: 100%;
    }
`

const Right = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    
    @media ${device.tablet} { 
        display: none;
    }
`

const Shot = styled.img`
    transform: scale(1.5) rotateY(-20deg) rotateX(20deg) rotateZ(0deg);
    max-width: 400px;
    width: 100%;
    transition: 1000ms ease;

    @media ${device.anythingAboveLaptopL} { 
        max-width: 500px;
    }

    &:hover {
        transform: scale(1.6) rotateY(0deg) rotateX(0deg) rotateZ(0deg);
    }
`

const HeroText = styled.h1`
    font-family: 'Inter';
    font-weight: 400;
    font-size: 38px;
    white-space: pre-wrap;

    @media ${device.anythingAboveLaptopL} { 
        font-size: 63px;
        line-height: 100%;
    }
    @media ${device.tablet} { 
        font-size: 38px;
        line-height: 110%;
    }
`

const HeroParagraph = styled.p`
    margin-top: 10px;
    color: #344054;

    @media ${device.tablet} { 
        font-size: 16px;
    }
`

const Navigation = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;

    width: 100%;
    height: 64px;
    border-bottom: solid 1px #D0D5DD;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);

    padding-left: 40px;
    padding-right: 40px;

    @media ${device.tablet} { 
        padding-left: 20px;
        padding-right: 20px;
    }
`

const MealPlanStatus = styled.p`
    font-family: 'Inter';
    font-weight: 500;
    font-size: 16px;
    border-radius: 100px;

    padding: 5px 15px;

    @media ${device.tablet} { 
        font-size: 14px;
    }
`

const Logo = styled.a`
    font-size: 28px;
    font-weight: 800;
    text-decoration: none;
    color: #454cde;

    @media ${device.tablet} { 
        font-size: 22px;
    }
`

const MarqueeWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-shrink: 0;

    width: 100%;
    height: 40px;

    background-color: black;
`

const MarqueeText = styled.p`
    color: white;
    font-weight: 600;
    font-size: 15px;
    white-space: pre;
`

const MealWrapper = styled(motion.div)`
    display: flex;
    align-items: center;
    column-gap: 10px;

    width: calc(100% - 40px);
    min-height: 60px;
    border: 1px solid #D0D5DD;
    border-radius: 12px;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    flex-shrink: 0;

    padding: 5px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
`

const MealDay = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    font-size: 14px;
    width: 50px;
    aspect-ratio: 1 / 1;

    font-family: 'Inter';
    font-weight: 800;
    background-color: #D0D5DD;
    font-size: 24px;
    color: #181818;
    border-radius: 8px;
`

const Meal = styled.p`
    font-size: 16px;
    font-weight: 300;
    font-family: 'Inter';

    margin-top: 5px;
`

export default TempLoading;
