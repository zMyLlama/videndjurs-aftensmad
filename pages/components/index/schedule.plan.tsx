import styled from "styled-components"
import { device } from "../../../js/devices";

import ScheduleItem from "./schedule.item";

function Schedule(props: any) {

    if (!props.data) return (<div></div>)

    return ( 
        <Wrapper>
            { Object.keys(props.data).map((key, index) => {
                if (key.toLowerCase() != "week") {
                    return <ScheduleItem key={key} data={props.data} day={key} today={props.today} index={index} deviceWeekNumber={props.deviceWeekNumber} currentlySelectedWeek={props.selectedWeek} />
                }
            }) }
        </Wrapper>
    );
}

const Wrapper = styled.div`
    position: relative;
    box-sizing: initial;
    max-width: 1200px;
    width: 75%;
    max-height: calc(100% - 350px);
    height: fit-content;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    z-index: 998;

    @media ${device.tablet} { 
        max-width: 100%;
        padding-left: 10px;
        padding-right: 20px;
        width: calc(100% - 30px);
        max-height: calc(100% - 280px);
    }
`

export default Schedule;