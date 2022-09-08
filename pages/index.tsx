import styled, { keyframes, ThemeProvider } from "styled-components";
import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from "react";
import { AnimatePresence, filterProps } from "framer-motion"
import { device, fakeData } from "../js/devices";
import { lightTheme, darkTheme, GlobalStyles } from "../js/themes.js";

import Status from "./components/index/index.status";
import Schedule from "./components/index/schedule.plan";
import RollDown from "./components/index/roll.down";
import ReactionNotification from "./components/index/reaction-notification";
import Modal from "./components/index/modal";
import SyncLoader from "react-spinners/SyncLoader";
import HamburgerMenu from "./components/misc/hamburger.menu";
import Announcement from "./components/index/announcement";

const getHostName = function() {
  const URL = new window.URL(window.location.href).hostname;
  var finalURL = "https://" + URL;
  if (URL == "localhost") finalURL = "http://localhost:3000";
  return finalURL;
}

type unknownData = {
  Editor: string;
  [key: string]: any;
};

function Home() {
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const arr: any[] = [];
  const dataArr: unknownData[] = [];

  const [ theme, setTheme ] = useState("light");
  const [ weekNumber, setWeekNumber ] = useState(0);
  const [ currentlySelectedWeek, setCurrentlySelectedWeek ] = useState(0);
  const [ today, setToday ] = useState("Fetching date from local device...");
  const [ allowRating, setAllowRating ] = useState(true);
  const [ modalData, setModalData ] = useState(arr);
  
  const [ announcementVisible, setAnnouncementVisible ] = useState(false);
  const announcementKey : string = "version-2.0.0"

  const [ data, setData ] = useState(dataArr);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    setPreCalculatedRandomValue(Math.random() * (99 - 70) + 70);
    localStorage.getItem("theme")
    setTheme(localStorage.getItem("theme") ? localStorage.getItem("theme") as string : "light");
    setIsLoading(true);

    /*
      Get week number from users device.
    */
    var date : any;
    var startDate : any;

    date = new Date();
    setToday(weekday[date.getDay()]);
    
    startDate = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - startDate) /
        (24 * 60 * 60 * 1000));
    var weekNumberResult = Math.ceil(days / 7);
    weekday[date.getDay()] == "Sunday" ? weekNumberResult -= 1 : null; // De satans amerikanere.
    setWeekNumber(weekNumberResult);
    setCurrentlySelectedWeek(weekNumberResult);
    setCurrentlySelectedWeek(36)

    /*
      Checks the cookies to see if it should display an announcement
    */
    const cookies = document.cookie.split(";");
    var exists : boolean = false;
    cookies.map((key) => {
        if (key.split("=")[0].toString() == announcementKey || key.split("=")[0].toString() == " " + announcementKey) {
            exists = true;
        }
    })
    if (!exists) { setAnnouncementVisible(true); }

    /*
      Function that fetchs the data on the client and populates the client with it.
    */
    const fetchData = async function() {
      const res = await fetch(getHostName() + '/api/getData', { /* https://campusmad.netlify.app/api/getData */
        headers: {
          'CONTENT_TYPE': 'application/json',
        },
        method: 'GET',
      })

      const result = await res.json();
      setData(result);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const changeCurrentlySelectedWeek = function(Value: number) {
    setCurrentlySelectedWeek(currentlySelectedWeek + Value);
  }

  const themeToggle = function() {
    theme === "light" ? setTheme("dark") : setTheme("light");
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  }

  const [preCalculatedRandomValue, setPreCalculatedRandomValue] = useState(0);
  if (isLoading) return (
    <LoaderWrapper> 
      <GlobalStyles theme={theme} />
      <SyncLoader color={theme === "light" ? "black" : "white"} /> 
      <LoadingDisclaimer style={{ textAlign: 'center', paddingLeft: '15px', paddingRight: '15px' }}><strong>BETA:</strong> hvis du har loadet i lang nok tid til at se denne besked så er der med { preCalculatedRandomValue }% sikkerhed et problem i databasen. Kom tilbage om et par timer eller i morgen hvor det med højst sandsynlighed er fixet.<br/><br/><span className="tiny">Det kan også være dit internet bare er lort... 😬</span></LoadingDisclaimer>
    </LoaderWrapper>
  )

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles theme={theme} />
      <Wrapper>
        <Head>
          <title>Campus Madplan</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <AnimatePresence>
          { modalData.length != 0 ?
            <Modal setModalData={setModalData} modalData={modalData} />
              :
            null
          }
          { announcementVisible ?
              <Announcement announcementKey={announcementKey} setAnnouncementVisible={setAnnouncementVisible} />
                :
              null
            }
        </AnimatePresence>

        <SideAccent>
          <AccentText>M<br/>A<br/>D<br/>P<br/>L<br/>A<br/>N</AccentText>
        </SideAccent>
        <LeftAccent />
        
        <TopWrapper>
          <CurrentWeek>
            <CurrentWeekText>Uge { weekNumber }</CurrentWeekText>
          </CurrentWeek>
          { /* <SwitchTheme onClick={themeToggle}>
            <Image src={ theme === "light" ? "/Moon.png" : "/Sun.png" } alt="Status Symbol" layout="fill" />
          </SwitchTheme> */ }
          <HamburgerMenu themeToggle={themeToggle} setModalData={setModalData} />
        </TopWrapper>
    
        <SupposedWeek>Nuværende madplan er for uge { data["Editor" as unknown as number][currentlySelectedWeek]["Week"] }</SupposedWeek>

        <Status fullDataSet={data["Editor" as unknown as number]} data={data["Editor" as unknown as number][currentlySelectedWeek]} deviceWeek={weekNumber} selectedWeek={currentlySelectedWeek} />
        <Schedule data={data["Editor" as unknown as number][currentlySelectedWeek]} today={today} selectedWeek={currentlySelectedWeek} deviceWeekNumber={weekNumber} />
        <RollDown fullDataSet={data["Editor" as unknown as number]} currentlySelectedWeek={currentlySelectedWeek} changeCurrentlySelectedWeek={changeCurrentlySelectedWeek} setModalData={setModalData} />
        <Bottom>
          { /* <ClickableNonLink 
            onClick={() => 
              setModalData(["Kontakt",
              ["Jeg orker ikke rigtig lave en kontakt form så bare skriv til mig gennem følgende veje:", <br/>,<br/>, <strong>Mail: noelgamsboel@gmail.com</strong>, <br/>, <strong>Telefon: +45 40494657</strong>, <br/>, <strong>Discord: zMyLlama#3455</strong> ]])} 
          >
            Noget galt? Skriv til os...
          </ClickableNonLink>
          <ClickableNonLink
            onClick={() => 
              setModalData(["Spisetider", 
              [<strong>Hverdag:</strong>, <br/>, "Morgenmad: 7-9", <br/>, "Forkost: 11-13", <br/>, "Eftermiddagsboller: 15-16", <br/>, "Aftensmad: 18-19:30", <br/>,<br/>, <strong>Weekend:</strong>, <br/>, "Brunch: 9-12 (Gerne kom ned af flere gange)", <br/>, "Eftermiddagsboller: 15-16", <br/>, "Aftensmad: 18-19:30"]])} 
          >
            Spisetider
          </ClickableNonLink>
          <Link href="/update-log">Opdaterings log</Link> */ }
        </Bottom>
        <BottomFlex>
          <AnimatePresence>
            { allowRating ? <ReactionNotification weekNumber={weekNumber} setAllowRating={setAllowRating} data={data["Editor" as unknown as number][weekNumber]} today={today} /> : null }            
          </AnimatePresence>
        </BottomFlex>
      </Wrapper>
    </ThemeProvider>
  );
}

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

const Wrapper = styled.div`
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

const TopWrapper = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 20px;
  padding-right: 80px;

  @media ${device.tablet} { padding-right: 20px; }
`

const SwitchTheme = styled.button`
  position: relative;
  width: 35px;
  height: 35px;
  border-radius: 5px;

  @media ${device.tablet} { width: 28px; height: 28px; }
`

const Bottom = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  padding-left: 80px;
  height: 40px;
  width: 100%;
  z-index: 10;

  display: flex;
  column-gap: 25px;

  @media ${device.laptopS} { padding-left: 20px; column-gap: 15px; height: 35px; }
  @media ${device.desktop} {
    padding-left: 300px;
  }
  @media ${device.mobileL} { height: 25px }
`

const BottomFlex = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0px;
  height: 100px;

  display: flex;
  justify-content: center;
  z-index: 999;
`

const ClickableNonLink = styled.p`
  all: unset;
  color: var(--text-color);
  font-family: Quicksand;
  font-size: 18px;
  text-decoration: underline;
  cursor: pointer;

  @media ${device.tablet} { font-size: 12px; }
`

const Link = styled.a`
  all: unset;
  color: var(--text-color);
  font-family: Quicksand;
  font-size: 18px;
  text-decoration: underline;
  cursor: pointer;

  @media ${device.tablet} { font-size: 12px; }
`

const SideAccent = styled.div`
  position: absolute;
  right: 0;
  top: 0;
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
    left: 0;
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

const LeftAccent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 0px;
  height: 100vh;
  transition: var(--transition-time);
  background: linear-gradient(180deg, #FF9877 0%, #FF8A65 30.68%, #FF7E55 82.96%);

  @media ${device.desktop} {
    width: 150px;
  }
`

const CurrentWeek = styled.div`
  width: 150px;
  height: 50px;
  border-radius: 10px;
  background-color: var(--logo-color);

  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;

  @media ${device.tablet} {
    width: 114px;
    height: 40px;
  }
`

const CurrentWeekText = styled.h1`
  font-size: 38px;
  color: ${(props) => props.theme.logoTextColor};

  @media ${device.tablet} { font-size: 26px; }
`

const SupposedWeek = styled.h5`
  color: var(--text-color);
  margin-bottom: 65px;
  @media ${device.tablet} { font-size: 20px; margin-bottom: 30px; }
`

const waitWithSpawningDisclaimer = keyframes`
  0% { height: 0px; marginTop: 0px }
  99% { height: 0px; marginTop: 0px }
  100% { height: fit-content; marginTop: 30px }
`

const LoadingDisclaimer = styled.p`
  color: var(--text-color);
  margin-top: 30px;
  overflow-y: hidden;
  animation-name: ${waitWithSpawningDisclaimer};
  animation-duration: 4s;
`

export default Home;