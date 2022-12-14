import React, { useState } from "react";
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion";
import { device } from "../../../js/devices"

import HamburgerItem from "./hamburger.item";
import HamburgerAccount from "./hamburger.account";
import HamburgerVersion from "./hamburger.version";

const lineOneVariants = {
    open: { transform: "translateY(0px) rotate(45deg)" },
    closed: { transform: "translateY(-9px) rotate(0deg)" },
}

const lineTwoVariants = {
    open: { width: "0%", transform: "translateX(-10px)", opacity: 0 },
    closed: { width: "100%", transform: "translateX(0px)", opacity: 1 },
}

const lineThreeVariants = {
    open: { width: "100%", transform: "translateY(0px) rotate(-45deg)" },
    closed: { width: "65%", transform: "translateY(9px) rotate(0deg)" },
}

function HamburgerMenu(props: any) {
    const navigationItems = [
        ["Line"],
        ["Madplan", "/madplan.svg", "Hyperlink", false, "/"], 
        ["Opdaterings log", "/opdateringlog.svg", "Hyperlink", false, "/update-log"], 
        ["Line"],
        ["Feedback", "/feedback.svg", "Function", props.setModalData, ["Feedback", ["Jeg orker ikke rigtig lave en kontakt form så bare skriv til mig gennem følgende veje:", <br/>,<br/>, <strong>Mail: noelgamsboel@gmail.com</strong>, <br/>, <strong>Telefon: +45 40494657</strong>, <br/>, <strong>Discord: zMyLlama#3455</strong> ]]], 
        ["Spisetider", "/spisetider.svg", "Function", props.setModalData, ["Spisetider", [<strong>Hverdag:</strong>, <br/>, "Morgenmad: 7-9", <br/>, "Forkost: 11-13", <br/>, "Eftermiddagsboller: 15-16", <br/>, "Aftensmad: 18-19:30", <br/>,<br/>, <strong>Weekend:</strong>, <br/>, "Brunch: 9-12 (Gerne kom ned af flere gange)", <br/>, "Eftermiddagsboller: 15-16", <br/>, "Aftensmad: 18-19:30"]]],
        ["Line"],
        ["Skift tema", "/tema.svg", "Theme", props.themeToggle],
        ["Line"],
        ["Log ind", "/login.svg", "Function", props.setModalData, ["Another one", [<strong>WHAT NO WAY ENDNU EN UPCOMING FEATURE!</strong>, <br/>,<br/>, "Du tænker nok at det er lidt i overkanten med et konto system og det har du fuldkommen ret i, derfor behøver du selvfølgelig ikke at have en, det er blot et tilbud.", <br/>, "Konto systemet kommer til at blive brugt i fremtidige løsninger fra ", <strong>Kridt™</strong>, " og til validering af anmeldelser... nok også noget mere.", <br/>,<br/>, <strong>Uhh denne feature kommer nok ud i sån version 3.0.0 eller 4.0.0, idk.</strong> ]]],
        ["Line"],
    ];

    const selected : any = props.selected || "Madplan" as any;
    const [ isVisible, setIsVisible ] = useState(false);

    const toggleMenu = function() {
        isVisible ? setIsVisible(false) : setIsVisible(true);
    }

    return ( 
        <>
            <Button onClick={toggleMenu}>
                <Line1 
                    animate={ isVisible ? "open" : "closed" }
                    variants={lineOneVariants}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                />
                <Line2 
                    animate={ isVisible ? "open" : "closed" }
                    variants={lineTwoVariants}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                />
                <Line3 
                    animate={ isVisible ? "open" : "closed" }
                    variants={lineThreeVariants}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                />
            </Button>

            <AnimatePresence>
                { isVisible ? 
                    <HideWrapper
                        initial={{ height: "0px" }}
                        exit={{ height: "0px" }}
                        animate={{ height: "calc(100vh - 125px)" }}
                    >
                        <MenuWrapper>
                            <HamburgerAccount />
                            
                            {
                                Object.values(navigationItems).map((value, index) => {
                                    if (value[0] == "Line") {
                                        return <Line />
                                    } else {
                                        return <HamburgerItem text={value[0]} svg={value[1]} isSelected={selected === value[0] ? true : false} type={value[2]} execute={value[3]} parameter={value[4]} />
                                    }
                                }) 
                            }

                            <HamburgerVersion version="Version 2.1.0" />
                            <Producer>Kridt™</Producer>
                        </MenuWrapper>
                    </HideWrapper>
                :
                    null
                }
            </AnimatePresence>
        </>
    );
}

const Button = styled.button`
    position: relative;
    width: 34px;
    height: 40px;
    margin-left: auto;
    border-radius: 5px;

    @media ${device.tablet} { width: 30px; height: 36px; }
    @media ${device.mobileL} { width: 28px; height: 32px; }
`

const Producer = styled.h6`
    position: absolute;
    bottom: 10px;
    left: 20px;

    font-weight: 600;
    font-size: 16px;
    color: var(--text-color);
`

/* This is one of the only styled components that focuses on the phone by default. */
const MenuWrapper = styled.div`
    position: absolute;
    width: calc(100vw - 40px);
    height: calc(100vh - 125px);
    border-radius: 10px;
    border: 2px solid var(--border-color);
    background-color: var(--list-color);

    display: flex;
    flex-direction: column;
    align-items: center;

    overflow-y: scroll;

    @media ${device.anythingAboveTablet} {
        width: 550px;
        height: 600px;
    }
`

const HideWrapper = styled(motion.div)`
    z-index: 1002;
    position: fixed;
    width: calc(100% - 40px);
    height: calc(100% - 125px);
    top: 115px;
    margin: auto;
    overflow-y: hidden;

    @media ${device.anythingAboveTablet} {
        width: 550px;
        height: 600px;
        top: 130px;
        right: 80px;
    }
    @media ${device.anythingAboveLaptopS} {
        right: calc(450px + 80px);
    }
    @media ${device.anythingAboveDesktop} {
        right: calc(600px + 80px);
    }
    @media ${device.anythingAboveUltrawide} {
        right: calc(900px + 80px);
    }
`

const Line = styled.div`
    width: 100%;
    height: 2px;
    background-color: var(--border-color);
    margin-top: 10px;
    margin-bottom: 10px;
`

const Line1 = styled(motion.div)`
    position: absolute;
    background-color: var(--text-color);
    height: 2px;
    width: 100%;
    transform: translateY(-9px);
`

const Line2 = styled(motion.div)`
    position: absolute;
    background-color: var(--text-color);
    height: 2px;
    width: 100%;
`

const Line3 = styled(motion.div)`
    position: absolute;
    background-color: var(--text-color);
    height: 2px;
    width: 65%;
    transform: translateY(9px);
`


export default HamburgerMenu;