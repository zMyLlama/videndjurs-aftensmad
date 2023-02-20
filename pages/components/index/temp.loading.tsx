import styled from "styled-components"
import { device } from "../../../js/devices"

function TempLoading() {
    return ( 
        <Wrapper>
            <Header>Under ombygning</Header>
            <Paragraph>
                Det vigtigste på siden er at man kan se madplanen, siden dette stadig er muligt har jeg tænkt mig at lukke siden i ukendt tid.
                <br />
                <br />
                Grunden til jeg vælger og gøre dette er for at siden kan blive mere modulær og potentailt bruges af andre skoler.
                <br />
                Jeg skal derfor bruge tid på at forbedre koden, tilgængelighed og designet af hjemmesiden, udover dette skal jeg også integrere den med et fuldt konto system.
                <br />
                <br />
                Når siden åbner op igen vil det være et krav at have en konto, udover dette vil der potentailt også være en app til android.
                <br />
                <br />
                Mange tak for jeres forståelse, jeg satser på faktisk at lave den nye hjemmeside og ikke bare forsinke den forevigt. 
                <br />
                <br />
                <b>- Educended</b>
            </Paragraph>

            <Line />

            <List>
                <Item>
                    <Left>Mandag</Left>
                    <Right>Kødsovs m/ pasta</Right>
                </Item>
                <Item>
                    <Left>Tirsdag</Left>
                    <Right>Boller i karry m/ris (Jannies hjemmelavet kødboller)</Right>
                </Item>
                <Item>
                    <Left>Onsdag</Left>
                    <Right>Skinkesteg m/halve kartofler og skysovs</Right>
                </Item>
                <Item>
                    <Left>Torsdag</Left>
                    <Right>Tyrkisk suppe m/hjemmelavet brød og cremefraiche</Right>
                </Item>
                <Item>
                    <Left>Fredag</Left>
                    <Right>Oksespidsbryst m/peberrodssovs og kartofler</Right>
                </Item>
                <Item>
                    <Left>Lørdag</Left>
                    <Right>Pizza m/kokkens overraskelse</Right>
                </Item>
                <Item>
                    <Left>Søndag</Left>
                    <Right>Paprikagryde m/ris</Right>
                </Item>
            </List>

            <ErrorWrapper>
                <Error>CONSTRUCTION</Error>
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

    overflow-y: scroll;
    @media ${device.mobileL} { 
        
    }
`

const Header = styled.h1`
    font-weight: 700;
    font-size: 90px;

    color: #FFFFFF;
    white-space: nowrap;

    @media ${device.tablet} { font-size: 45px; }
    @media ${device.mobileL} { font-size: 34px; }
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

    min-height: 500px;
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
    font-size: 14vh;
    color: #202020;
    transform: rotate(90deg);
`

export default TempLoading;