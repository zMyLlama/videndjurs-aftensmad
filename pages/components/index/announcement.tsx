import { motion } from "framer-motion";
import styled from "styled-components"
import Image from "next/image";
import { device } from "../../../js/devices";

function Announcement(props: any) {
    const exitAnnouncement = function() {
        document.cookie=props.announcementKey + "=1; expires=Tue, 19 Jan 2038 04:14:07 GMT; path=/; SameSite=lax"
        props.setAnnouncementVisible(false)
    }

    return ( 
        <Wrapper
            transition={{ duration: 0.35 }}
            initial={{ transform: 'translateY(0px)' }}
            animate={{ transform: 'translateY(0px)' }}
            exit={{ transform: 'translateY(100vh)' }}
        >
            <AnnouncementWrapper>
                <TopWrapper>
                    <Header>Version 2.0.0</Header>
                    <SVG onClick={ exitAnnouncement } width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 13L13 1" stroke-linecap="round"/>
                        <path d="M13 13L1 1" stroke-linecap="round"/>
                    </SVG>
                </TopWrapper>

                <ImageWrapper>
                    <Image className="ImageFit" src="/PreviewUpdateImage.png" alt="New Update Preview" layout="fill" />
                </ImageWrapper>

                <Paragraph>
                    Endelig efter lidt delays og andet er version 2.0.0 klar til at blive udgivet. Som i kan se i billedet oppe over er alle de fancy forskellige indstillinger og knapper rykket ind i deres egen dedikeret menu,
                    jeg anbefaler helt klart at tage et kig da du f.eks. kan finde dark mode! <br/> Udover det kan du gå frem og tilbage i menuen med piltasterne i bunden af siden.
                    <br/>
                    <br/>
                    I version 3.0.0 eller måske tidligere kommer der til at være endnu en knap i menuen hvor du kan se alle tidligere anmeldelser og den bedst anmeldte mad!
                    <br/>
                    <br/>
                    For en mere detaljeret opdaterings log anbefaler jeg at i hopper ind i opdaterings loggen og kigger der. I kan finde linket til opdateringsloggen ved at åbne menuen selvfølgelig
                    <br/><br/>
                    <strong>Du vil kun se denne besked en gang.</strong>
                </Paragraph>
                <Button onClick={ exitAnnouncement }>OK</Button>
            </AnnouncementWrapper>
        </Wrapper>
    );
}

const Wrapper = styled(motion.div)`
    display: flex;
    justify-content: center;

    z-index: 999999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
`

const ImageWrapper = styled.div`
    display: block;
    position: relative;
    width: calc(100vh / 4.5);
    aspect-ratio: 1 / 1;
    margin-bottom: 10px;

    @media ${device.anythingAboveMobileL} { width: calc(100vh / 4); }
    @media ${device.anythingAboveTablet} { width: calc(100vh / 3); }
`

const AnnouncementWrapper = styled.div`
    display: flex;
    flex-direction: column;

    z-index: 1000000;
    position: fixed;
    max-width: 1000px;
    width: 100vw;
    height: calc(100vh - 90px);
    bottom: 0;

    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 10px;
    overflow-y: scroll;

    border: 2px solid var(--border-color);
    box-shadow: 0px -14px 27px rgba(0, 0, 0, 0.2);
    border-radius: 20px 20px 0px 0px;
    background-color: var(--bg-color);
`

const SVG = styled.svg`
    cursor: pointer;
    stroke: var(--detail-text-color);

    @media ${device.laptopL} { width: 22px; height: 22px; }
`

const TopWrapper = styled.div`
    position: relative;
    width: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    margin-top: 15px;
    margin-bottom: 20px;
`

const Header = styled.h4`
    color: var(--text-color);
    text-decoration: underline;
`

const Paragraph = styled.p`
    color: var(--text-color);
    margin-bottom: 30px;
    @media ${device.mobileL} { font-size: 16px; }
`

const Button = styled.button`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    margin-top: auto;

    background-color: var(--logo-color);
    border-radius: 10px;
    font-size: 20px;
    font-weight: 700;
    color: ${(props) => props.theme.logoTextColor};
`

export default Announcement;