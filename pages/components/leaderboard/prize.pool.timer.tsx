import styled from "styled-components"

function PrizePoolTimer(props : any) {
    return ( 
        <Timer>
            <TimeLeft>{ props.timestamp }</TimeLeft>
            <TimeLeftDescription>Tid tilbage indtil puljen bliver fordelt.</TimeLeftDescription>
        </Timer>
    );
}

const Timer = styled.div`
    max-width: 200px;
    width: fit-content;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const TimeLeft = styled.h2` font-weight: 600; `
const TimeLeftDescription = styled.h6` 
    text-align: center;
    font-weight: 400; 
` 

export default PrizePoolTimer;