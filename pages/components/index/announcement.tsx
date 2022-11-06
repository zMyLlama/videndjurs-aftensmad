import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled, { keyframes } from "styled-components"
import Image from "next/image";
import { device } from "../../../js/devices";

import AnnouncementCardpage from "./announcement.cardpage";

interface Props {
    selected : boolean
}

function Announcement(props: any) {
    const [ currentPage, setPage ] = useState(0);
    const exitAnnouncement = function() {
        //document.cookie=props.announcementKey + "=1; expires=Tue, 19 Jan 2038 04:14:07 GMT; path=/; SameSite=lax"
        props.setAnnouncementVisible(false)
    }

    const nextPage = function() 
    {
        setPage(currentPage + 1);
    }

    const pages : any = {
        0: {
            "Title": "Opdatering 3.0.0",
            "Description": "Den største opdatering til Campus Mad... Nogensinde!\n\nFortsæt for at se alle de nye features.",
            "ButtonText": "Fortsæt",
            "ButtonFunction": nextPage,
            "src": "/Announcement/AnnouncementLogo.png",
        },
        1: {
            "Title": "Leaderboard",
            "Description": "Fra den 1/10/2022 vil du kunne se hvad alt mad derefter har fået i score.\n\nKom der ind ved at åbne menuen.",
            "ButtonText": "Næste",
            "ButtonFunction": nextPage,
            "src": "/Announcement/AnnouncementLeaderboard.png",
        },
        2: {
            "Title": "Konto system",
            "Description": "Rating vil være baseret ud fra kontoer nu. jeg anbefaler stærkt at man laver en.\n\nI tvivl om sikkerhed? Klik her.",
            "ButtonText": "Næste",
            "ButtonFunction": nextPage,
            "src": "/Announcement/AnnouncementAccount.png",
        },
        3: {
            "Title": "Pulje spillet",
            "Description": "Pulje spillet er et spil, som alle der har en konto kan deltage i hver dag fra 11:45 til 23:59.\n\nKlik her for flere detaljer.",
            "ButtonText": "Næste",
            "ButtonFunction": nextPage,
            "src": "/Announcement/AnnouncementGame.png",
        },
        4: {
            "Title": "Alerts",
            "Description": "Med alerts vil de stå (ligesom breaking news på tv2) oppe i toppen af din skærm.\n\nIngen irriterende popups længere.",
            "ButtonText": "Næste",
            "ButtonFunction": nextPage,
            "src": "/Announcement/AnnouncementAlert.png",
        },
        5: {
            "Title": "Til sidst",
            "Description": "Jeg håber at i kommer til at bruge den nye opdatering. I kan, som altid se flere detaljer om opdateringen ved at åbne opdaterings loggen.",
            "ButtonText": "Afslut",
            "ButtonFunction": exitAnnouncement,
            "src": "/Announcement/AnnouncementMore.png",
        }
    }

    return ( 
        <Wrapper>
            <Card>
                <Gradient>
                    <Image className="i spent so long on this and it didnt look the way i wanted thats why there are two images" src="/Announcement/BackgroundGradient.png" layout="fill" />
                    <Image className="i spent so long on this and it didnt look the way i wanted thats why there are two images" src="/Announcement/BackgroundGradient.png" layout="fill" />
                </Gradient>

                <AnimatePresence>
                    { currentPage !== -1 ?
                        <AnnouncementCardpage key={currentPage} Title={pages[currentPage].Title} Description={pages[currentPage].Description} ButtonText={pages[currentPage].ButtonText} ButtonFunction={pages[currentPage].ButtonFunction} src={pages[currentPage].src}  />
                    :
                        null
                    }
                </AnimatePresence>

                <Pages>
                    {
                        [0,1,2,3,4,5].map(index => {
                            return <PageDot selected={index === currentPage} />
                        })
                    }
                </Pages>
            </Card>
        </Wrapper>
    );
}

const Wrapper = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 999999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
`

const Card = styled.div`
    position: relative;
    max-width: 400px;
    width: calc(100% - 40px);
    height: 380px;

    background: ${(props) => props.theme.announcementBg};
    border: 1px solid var(--border-color);
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    transition: var(--transition-time);

    @media ${device.anythingAboveTablet} {
        transform: scale(1.2);
    }
`

const fadeInKeyframes = keyframes`
    0% { height: 150px; opacity: 0; mask-size: 100% 100%; mask-position: 0px; }
    100% { height: 225px; opacity: 1; mask-size: 1500px 1500px; mask-position: -550px; }
`

const Gradient = styled.div`    
    position: absolute; 
    width: 100%;
    height: 190px;
    border-radius: 10px 10px 0px 0px;
    opacity: 0;
    overflow: hidden;

    mask-image: radial-gradient(50% 50% at 50% 50%, #000000 0%, rgba(0, 0, 0, 0) 50%);
    animation-name: ${fadeInKeyframes};
    animation-duration: 4s;
    animation-fill-mode: forwards;
`

const Pages = styled.div`
    position: absolute;
    bottom: 0;
    height: 30px;
    width: 100%;
    
    display: flex;
    column-gap: 7px;
    align-items: center;
    justify-content: center;
`

const PageDot = styled.div<Props>`
    width: ${(props) => props.selected ? "8px" : "7px"};
    height: ${(props) => props.selected ? "8px" : "7px"};
    background: ${(props) => props.selected ? "var(--attention-color)" : "var(--border-color)"};
    border-radius: 100%;
`

export default Announcement;