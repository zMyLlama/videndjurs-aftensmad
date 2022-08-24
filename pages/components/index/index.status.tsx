import styled from "styled-components"
import Image from 'next/image'
import { device } from "../../../js/devices"

function Status(props: any) {
    return ( 
        <Wrapper>
            <NextImage>
                <Image src={ props.data["Week"] == props.week ? "/SuccessIcon.png" : "/AlertIcon.png" } layout="fill" />
            </NextImage>
            <FlexDown>
                <AlertMessage>{ props.data["Week"] == props.week ? "Perfekt! Madplanen er helt opdateret 🎉" : "Hol’ up. Denne madplan er forældet 🥲" }</AlertMessage>
                <AlertDescription>{ props.data["Week"] == props.week ? "Hvis der er fejl i madplanen så kontakt os med linket i bunden" : "Vi opdatere den snarest muligt." }</AlertDescription>
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