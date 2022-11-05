import { useState, useEffect, useRef } from "react";
import useWindowSize from "../hooks/useWindowSize"
import { lightTheme, darkTheme, GlobalStyles } from "../js/themes.js";
import { motion } from "framer-motion";
import { device } from "../js/devices";
import fetchData from "../hooks/fetchData";
import Confetti from 'react-confetti'
import styled, { ThemeProvider } from "styled-components";
import secondsToTimestamp from "../hooks/secondsToTimestamp";
import getGameData from "../hooks/getGameData";

import HamburgerMenu from "./components/misc/hamburger.menu";
import PrizePool from "./components/leaderboard/prize.pool";
import SyncLoader from "react-spinners/SyncLoader";
import Ranking from "./components/leaderboard/ranking";
import RatingPedestals from "./components/leaderboard/rating.pedestals";
import LeaderboardWrapper from "./components/leaderboard/leaderboard.wrapper";

function getOffset(el : any) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}

type unknownData = {
    Editor: string;
    [key: string]: any;
};

function Leaderboard() {
    const emptyData: unknownData[] = [];

    const { width, height } = useWindowSize();
    const confettiSourceE = useRef();

    const [ isLoading, setIsLoading ] = useState(true);
    const [ timestamp, setTimestamp ] = useState("");
    const [ points, setPoints ] = useState("Loading...");
    const [ participants, setParticipants ] = useState(-1);
    const [ confettiRecycle, setConfettiRecycle ] = useState(true);
    const [ theme, setTheme ] = useState("light");
    const [ confettiSourceLocation, setConfettiSourceLocation ] = useState({ x: 100, y: 100, w: 10, h: 10 })
    const [ data, setData ] = useState(emptyData);
    const [ sortedData, setSortedData ] = useState(emptyData);

    const sortData = async function(data : any) {
        if (sortedData.length) return;
        const tempData : any = sortedData;

        for (const week in data.Editor) {
            for (const day in data.Editor[week]) {
                if (typeof data.Editor[week][day] !== "object") continue;
                if (data.Editor[week][day].Rating.Amount === 0) continue;
                var dayData = data.Editor[week][day];
                dayData["Week"] = week;
                tempData.push(dayData);
            }
        }

        await tempData.sort((a : any, b : any) => (a.Rating.Amount > b.Rating.Amount) ? -1 : 1);
        console.log(tempData);
        setSortedData(tempData);
    }

    useEffect(() => {
        const asyncFetc = async function() {
            const data = await fetchData();
            setData(data);
            await sortData(data);
            setIsLoading(false);
        }
        asyncFetc();

    }, []);

    useEffect(() => {
        const disableConfettiAfterDelay = async function() {
            await new Promise(res => setTimeout(res, 100))
            setConfettiRecycle(false);
        }
        disableConfettiAfterDelay();

        const handlePuljeGame = async function() {
            const res = await getGameData();
            
            setTimestamp(res.serverTimestamp);
            function interval()
            {
                res.seconds -= 1;
                setTimestamp(secondsToTimestamp(res.seconds));
            }
            setInterval(interval, 1000);
            if (res.message === "OK") {
                setPoints(res.points);
                setParticipants(res.participants);
            };
        }
        handlePuljeGame();

        if (!isLoading && confettiSourceE) {
            localStorage.getItem("theme");
            setTheme(localStorage.getItem("theme") ? localStorage.getItem("theme") as string : "light");

            const x = getOffset(confettiSourceE.current).left + 35;
            const y = getOffset(confettiSourceE.current).top;
            setConfettiSourceLocation({ x: x, y: y, w: 20, h: 20 })
        }
    }, [isLoading])

    if (isLoading) return (
        <LoaderWrapper>
            <GlobalStyles theme={theme} />
            <SyncLoader color={theme === "light" ? "black" : "white"} /> 
            <LoadingDisclaimer style={{ textAlign: 'center', paddingLeft: '15px', paddingRight: '15px' }}></LoadingDisclaimer>
        </LoaderWrapper>
    )

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <GlobalStyles theme={theme} />
            <Confetti numberOfPieces={250} gravity={0.05} friction={0.994} recycle={confettiRecycle} width={width} height={height} confettiSource={confettiSourceLocation} />
            <Wrapper>
                <SideAccent>
                    <AccentText>M<br/>A<br/>D<br/>P<br/>L<br/>A<br/>N</AccentText>
                </SideAccent>

                <TopWrapper>
                    <Left>
                        <Logo>
                            <LogoText>Leaderboard</LogoText>
                        </Logo>
                        <AccountPoints>Du har 0 points</AccountPoints>
                    </Left>

                    <PrizePool participants={participants} points={points} timestamp={timestamp} />
                    {/*<HamburgerMenu accountData={accountData} themeToggle={themeToggle} setModalData={setModalData} />*/}
                </TopWrapper>

                <Line />

                <MiddleSectionWrapper>
                    <Ranking mealData={sortedData[1]} ranking={2} size="small" gradient="radial-gradient(50% 50% at 50% 50%, #3ECCA5 0%, #75B2F4 0.01%, #4297F4 100%)" />
                    <Ranking confettiSourceE={confettiSourceE} mealData={sortedData[0]} ranking={1} size="big" gradient="radial-gradient(50% 50% at 50% 50%, #3ECCA5 0%, #3ECC7F 100%)" />
                    <Ranking mealData={sortedData[2]} ranking={3} size="small" gradient="radial-gradient(50% 50% at 50% 50%, #FFA386 0%, #FF7E55 100%)" />
                </MiddleSectionWrapper>
                
                <RatingPedestals />
                <Bottom>
                    <LeaderboardWrapper sortedData={sortedData} />
                </Bottom>
            </Wrapper>
        </ThemeProvider>
    );
}

const Wrapper = styled.div`
    position: relative;
    width: calc(100% - 450px);
    height: 100vh;
    background-color: var(--bg-color);

    padding-left: 80px;
    padding-top: 80px;
    display: flex;
    flex-direction: column;
    transition: var(--transition-time);

    @media ${device.laptopS} {
        width: 100%;
        padding-top: 65px;
        padding-left: 20px;
    }
    @media ${device.desktop} {
        width: calc(100% - 600px);
        padding-left: 300px;
    }
    @media ${device.ultrawide} {
        width: calc(100% - 900px);
        padding-left: 300px;
    }
`

const MiddleSectionWrapper = styled.div`
    position: relative;
    width: calc(100% - 80px);

    display: flex;
    justify-content: center;
    column-gap: 130px;

    @media ${device.laptopS} { width: calc(100% - 20px); }
`

const Bottom = styled.div`
    width: calc(100vw - 450px);
    height: fit-content;
    padding-bottom: 40px;
    margin-top: -40px;
    margin-left: -20px;
    flex-shrink: 0;
    background: white;
    z-index: 3;
    overflow: hidden;

    padding-top: 15px;
    padding-left: 20px;
    padding-right: 20px;

    @media ${device.laptopS} {
        width: 100vw;
    }

    @media ${device.anythingAboveLaptopS} {
        padding-top: 20px;
        padding-left: 80px;
        padding-right: 80px;
        margin-left: -80px; 
    }

    @media ${device.anythingAboveDesktop} {
        width: calc(100vw - 600px);
    }
`


const Line = styled.div`
    position: relative;
    width: calc(100% - 80px);
    height: 2px;
    background: var(--border-color);
    border-radius: 100px;
    flex-shrink: 0;

    margin-top: 35px;
    margin-bottom: 35px;

    @media ${device.laptopS} { width: calc(100% - 20px); }
`

const TopWrapper = styled.div`
    height: fit-content;
    width: 100%;
    display: flex;
    column-gap: 20px;
    padding-right: 80px;

    @media ${device.laptopS} { padding-right: 20px; }
`

const SideAccent = styled.div`
    position: fixed;
    right: 0;
    top: 0;
    z-index: 4;
    width: 450px;
    height: 100vh;
    transition: var(--transition-time);

    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, #FF9877 0%, #FF8A65 30.68%, #FF7E55 82.96%);
    filter: ${(props) => props.theme.accentBrightness};

    @media ${device.laptopS} {
        top: 0;
        right: 0;
        width: 100%;
        height: 50px;
        background: linear-gradient(268.89deg, #FF9877 0%, #FF8A65 36.83%, #FF7E55 99.59%);
    }
    @media ${device.desktop} {
        width: 600px;
    }
    @media ${device.ultrawide} {
        width: 900px;
    }
`

const AccentText = styled.h1`
    color: #FF9D7E;
    font-size: 11.3vh;
    height: 100%;
    text-align: center;
    @media ${device.laptopS} {
        display: none;
    }
`

const Logo = styled.div`
    width: fit-content;
    height: 50px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;
    background-color: var(--logo-color);
    margin-right: 65px;

    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;

    @media ${device.tablet} {
        width: 114px;
        height: 40px;
    }
`
const Left = styled.div`
    display: flex;
    flex-direction: column;
`


const AccountPoints = styled.h5`
    color: var(--text-color);
    @media ${device.tablet} { font-size: 20px; margin-bottom: 30px; }
`

const LogoText = styled.h1`
    font-size: 38px;
    color: ${(props) => props.theme.logoTextColor};

    @media ${device.tablet} { font-size: 26px; }
`

const LoaderWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: var(--bg-color);

    z-index: 1001;
`

const LoadingDisclaimer = styled.p`
    color: var(--text-color);
    margin-top: 30px;
    overflow-y: hidden;
    animation-duration: 4s;
`

export default Leaderboard;