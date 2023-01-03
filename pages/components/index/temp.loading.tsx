import styled from "styled-components"
import { device } from "../../../js/devices"

function TempLoading() {
    return ( 
        <Wrapper>
            <Header>Upsi dupsi...</Header>
            <Paragraph>
                På grund af det nye år har hjemmesidens dato håndtering system desværre sviget, jeg var dog klar over dette til gengæld havde jeg ikke overvejet at dette også er et skudår som putter systemet i... kritisk tilstand.
                <br/>
                <br/>
                Jeg har valgt at lukke siden ned indtil forhåbentlig den 9/1/2023 hvor hjemmesiden forhåbentlig er fikset og bliver åbnet op igen med den nyeste version. Hjemmesiden skulle have været lukket i kort tid alligevel på grund af sikkerhedsmæssige årsager med den nye opdatering så nu kan jeg heldigvis slå to fluer med et smæk.
                <br/>
                <br/>
                Super gange mange tak for at i gider at bruge campusmad. Later 👋
            </Paragraph>

            <Line />

            <List>
                <Item>
                    <Left>Mandag</Left>
                    <Right>Ferie</Right>
                </Item>
                <Item>
                    <Left>Tirsdag</Left>
                    <Right>Grillkøller m/ovnkartofler og coleslaw </Right>
                </Item>
                <Item>
                    <Left>Onsdag</Left>
                    <Right>Kong fiddes livret m/pommes frites</Right>
                </Item>
                <Item>
                    <Left>Torsdag</Left>
                    <Right>Lasagne</Right>
                </Item>
                <Item>
                    <Left>Fredag</Left>
                    <Right>Frikadeller m/bådkartofler</Right>
                </Item>
                <Item>
                    <Left>Lørdag</Left>
                    <Right>Hakkebøf, bådekartofler, ærter og bernaise</Right>
                </Item>
                <Item>
                    <Left>Søndag</Left>
                    <Right>Wokpande m/kalkun og pasta</Right>
                </Item>
            </List>

            <ErrorWrapper>
                <Error>ERROR404</Error>
            </ErrorWrapper>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    background-color: #070B0D;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;

    padding: 35px;
    display: flex;
    flex-direction: column;

    @media ${device.mobileL} { 
        overflow-y: scroll;
    }
`

const Header = styled.h1`
    font-weight: 700;
    font-size: 90px;

    color: #FFFFFF;
    white-space: nowrap;

    @media ${device.tablet} { font-size: 60px; }
    @media ${device.mobileL} { font-size: 50px; }
`

const Paragraph = styled.p`
    max-width: 800px;
    width: 100%;
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;

    color: #FFFFFF;

    @media ${device.tablet} { font-size: 14px; line-height: 18px; }
`

const Line = styled.div`
    max-width: 600px;
    width: 100%;
    height: 3px;
    flex-shrink: 0;
    border-radius: 100px;
    background-color: #202020;

    margin-top: 50px;
    margin-bottom: 50px;
`

const List = styled.div`
    max-width: 600px;
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 45px;

    height: 100%;
    overflow-y: scroll;

    @media ${device.mobileL} { 
        min-height: 300px;
    }
`

const Item = styled.p`
    width: 100%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    column-gap: 50px;

    @media ${device.mobileL} { column-gap: 35px; }
`

const Left = styled.p`
    flex-shrink: 0;
    font-weight: 700;
    font-size: 20px;
    color: #C2C3C3;

    @media ${device.mobileL} { font-size: 16px; }
`
const Right = styled.p`
    width: 100%;
    font-weight: 600;
    font-size: 20px;
    text-align: right;
    color: #FFFFFF;

    @media ${device.mobileL} { font-size: 16px; }
`

const ErrorWrapper = styled.div`
    position: absolute;
    right: 50px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 100vh;
    overflow: hidden;

    @media ${device.laptopS} { display: none; }
`

const Error = styled.h1`
    font-weight: 700;
    font-size: 21vh;
    color: #202020;
    transform: rotate(90deg);
`

export default TempLoading;