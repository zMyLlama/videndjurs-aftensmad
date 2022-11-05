import styled from "styled-components"
import Image from 'next/image'
import { device } from "../../../js/devices"

function Status(props: any) {
    if (!props.data) return (<div></div>)

    const getStatusMessage = function() {
        if (props.data["Week"] == props.deviceWeek) {
            return "Perfekt! Madplanen er helt opdateret 🎉";
        } else if (props.selectedWeek > props.deviceWeek ) {
            return "UMULIGT! Madplanen er fra fremtiden.";
        } else if (!props.fullDataSet[props.deviceWeek]) {
            return "Ingen madplan fra nuværende uge 🥲"
        } else {
            return "Uh... Denne madplan er fra fortiden."
        }
    }

    const getStatusDescriptionMessage = function() {
        if (props.data["Week"] == props.deviceWeek) {
            return "Hvis der er problemer med madplanen så kontakt os gennem menuen 💪";
        } else if (props.selectedWeek > props.deviceWeek ) {
            return "Der kan ske ændringer i madplanen da den er fra fremtiden 🤓";
        } else if (!props.fullDataSet[props.deviceWeek]) {
            return "Vi har ikke nogen madplan fra nuværende uge 🥲"
        } else {
            return "I update 3 kan du se anmeldelserne af tidligere madplaner 🤫"
        }
    }

    return ( 
        <Wrapper>
            <NextImage>
                <Image src={ props.data["Week"] == props.deviceWeek ? "/SuccessIcon.png" : "/AlertIcon.png" } alt="Status Symbol" layout="fill" />
            </NextImage>
            <FlexDown>
                <AlertMessage>{ getStatusMessage() }</AlertMessage>
                <AlertDescription>{ getStatusDescriptionMessage() }</AlertDescription>
            </FlexDown>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    column-gap: 20px;
    margin-bottom: 25px;
    @media ${device.tablet} { column-gap: 10px; }
`
const FlexDown = styled.div`
    display: flex;
    flex-direction: column;
`

const AlertMessage = styled.h5`
    color: var(--detail-text-color);
    @media ${device.tablet} { font-size: 16px; }
`

const AlertDescription = styled.h6`
    color: var(--text-color);
    @media ${device.tablet} { font-size: 14px; }
    @media ${device.mobileL} { width: 85%; }
`

const NextImage = styled.div`
    position: relative;
    width: 38px;
    height: 38px;
    flex-shrink: 0;

    @media ${device.tablet} { width: 28px; height: 28px; }
`

export default Status;