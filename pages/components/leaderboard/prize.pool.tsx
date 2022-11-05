import styled, { keyframes } from "styled-components"

import PrizePoolTimer from "./prize.pool.timer";

function PrizePool(props : any) {
    return ( 
        <Wrapper>
            <Statistics>
                <InfoText>Points i puljen</InfoText>
                <Amount>{ props.points }</Amount>
                <Participants>{ props.participants } deltagere</Participants>
            </Statistics>
            <Line />
            <PrizePoolTimer timestamp={props.timestamp} />
        </Wrapper>
    );
}

const pulseLight = keyframes`
    0% { outline: 0px solid rgba(66, 133, 244, 1) }
    100% { outline: 12px solid rgba(66, 133, 244, 0) }
`

const Wrapper = styled.div`
    max-width: 550px;
    width: 100%;
    height: 150px;
    padding: 15px;
    margin-left: auto;

    display: flex;

    background: #FFFFFF;
    border: 2px solid var(--border-color);
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;

    animation-name: ${pulseLight};
    animation-timing-function: cubic-bezier(0.33, 1, 0.68, 1);
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
`

const Statistics = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`

const InfoText = styled.h6` font-weight: 400; `
const Amount = styled.h2` font-weight: 600; `
const Participants = styled.p`
    margin-top: auto;
`

const Line = styled.div`
    background: #E6E5E5;
    width: 1px;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
`

export default PrizePool;