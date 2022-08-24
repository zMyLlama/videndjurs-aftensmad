import styled from "styled-components"
import { useState, useEffect } from "react";
import { device, fakeData } from "./js/Devices";

import Status from "./components/index/index.status";
import Schedule from "./components/index/schedule.plan";
import RollDown from "./components/index/roll.down";

function Home() {
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const [ weekNumber, setWeekNumber ] = useState();
  const [ today, setToday ] = useState("Fetching date from local device...");
  const [ data, setData ] = useState(fakeData);

  useEffect(() => {
    const date = new Date();
    setToday(weekday[date.getDay()]);
    
    const startDate = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - startDate) /
        (24 * 60 * 60 * 1000));
    const weekNumberResult = Math.ceil(days / 7);
    setWeekNumber(weekNumberResult);
  }, []);

  return ( 
    <Wrapper>
      <SideAccent>
        <AccentText>M<br/>A<br/>D<br/>P<br/>L<br/>A<br/>N</AccentText>
      </SideAccent>
      <LeftAccent />

      <CurrentWeek>
        <CurrentWeekText>Uge { weekNumber }</CurrentWeekText>
      </CurrentWeek>
      <SupposedWeek>Nuværende madplan er for uge { data.Week }</SupposedWeek>

      <Status data={data} week={weekNumber} />
      <Schedule today={today} data={data} />
      <RollDown />
      

      <Bottom>
        <Link>Noget galt? Skriv til os...</Link>
        <Link>Spisetider</Link>
        <Link>Opdaterings log</Link>
      </Bottom>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: calc(100% - 450px);
  height: 100vh;
  background-color: #f5f5f5;

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

const Bottom = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  padding-left: 80px;
  height: 40px;
  width: 100%;
  z-index: 9999;

  display: flex;
  column-gap: 25px;

  @media ${device.tablet} { padding-left: 20px; column-gap: 15px; height: 30px; }
  @media ${device.desktop} {
    padding-left: 300px;
  }
`

const Link = styled.a`
  all: unset;
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
  color: white;

  @media ${device.tablet} { font-size: 26px; }
`

const SupposedWeek = styled.h5`
  margin-bottom: 65px;
  @media ${device.tablet} { font-size: 20px; margin-bottom: 30px; }
`

export default Home;