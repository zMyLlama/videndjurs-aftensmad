import styled, { keyframes } from "styled-components"
import { device } from "../../../js/devices"

interface Props {
    position : string
}

function RollDown(props : any) {
    const switchWeek = function() {
        props.setModalData(["Kommer snart...", ['Du sidder måske der og tænker, wow det er rimelig cool det her men mig og the ', <strong>BOYS</strong>, ' har en discord kanal og vi elsker at stå og fotografere madplanen hver mandag og det er helt fair... ', <strong>MEN</strong>, ' her på Campus mad er vi virkelig "nytækende" og har derfor lavet et samarbejde med køkkent så du kan se 2-4 uger frem i madplanen selvfølgelig med potentailt minimale ændringer.', <br/>, <br/>, "På grund af delay er denne features udkommelses tid ukendt."]])
    }

    return ( 
        <Wrapper>
            <SwitchWeek onClick={switchWeek} position="left">
                <SVG position="left" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 9.5L10.5 1.5L10.5 17.5L1.5 9.5Z" fill="white" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </SVG>
            </SwitchWeek>
            <SwitchWeek onClick={switchWeek} position="right">
                <SVG position="right" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 9.5L10.5 1.5L10.5 17.5L1.5 9.5Z" fill="white" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </SVG>
            </SwitchWeek>

            <RollWrapper>
                <Circle></Circle>
            </RollWrapper>
            <Tip>Husk at du kan rulle ned på madplanen<br /> hvis du ikke kan se hele ugen.</Tip>
        </Wrapper>
     );
}

const SwitchWeek = styled.button<Props>`
    position: absolute;
    ${props => props.position == "left" && 'left: 0px;'}
    ${props => props.position == "right" && 'right: 0px;'}
    background-color: var(--logo-color);
    border-radius: 10px;
    width: 50px;
    aspect-ratio: 1 / 1;

    display: flex;
    align-items: center;
    justify-content: center;

    opacity: 0.6;
    cursor: not-allowed;

    @media ${device.tablet} { width: 45px; }
    @media ${device.mobileL} { width: 40px; margin-right: 20px }
`

const SVG = styled.svg<Props>`
    width: 14px;
    height: 24px;
    ${props => props.position == "right" && 'transform: scale(-1);'}

    @media ${device.mobileL} {
        width: 11px;
        height: 18px;
    }
`

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    max-width: 1200px;
    width: 75%;
    height: 45px;
    margin-top: 15px;

    @media ${device.tablet} { 
        margin-top: 25px;
        box-sizing: initial;
        max-width: 100%;
        padding-left: 10px;
        padding-right: 20px;
        width: calc(100% - 30px);
    }
    @media ${device.mobileL} { height: 30px; }
`

const RollWrapper = styled.div`
    position: relative;
    width: 26px;
    height: 100%;
    border: 2px solid var(--logo-color);
    border-radius: 9999px;
    padding: 2px;
    flex-shrink: 0;

    @media ${device.mobileL} { width: 18px; }
`

const rollAnimationNormal = keyframes`
    0% { bottom: 2px; opacity: 0; }
    40% { bottom: 2px; opacity: 1; }
    80% { bottom: calc(100% - 20px); opacity: 1; }
    85% { bottom: calc(100% - 20px); opacity: 1; }
    100% { bottom: calc(100% - 20px); opacity: 0; }
`

const rollAnimationNormalPhone = keyframes`
    0% { bottom: 2px; opacity: 0; }
    40% { bottom: 2px; opacity: 1; }
    80% { bottom: calc(100% - 12px); opacity: 1; }
    85% { bottom: calc(100% - 12px); opacity: 1; }
    100% { bottom: calc(100% - 12px); opacity: 0; }
`

const slideAway = keyframes`
    /* Times are totally thrown off now cause i removed 10 seconds from the animation time */
    0% { opacity: 1; max-width: 0px; margin-left: 0px; } /* Initial state */
    50% { opacity: 1; max-width: 0px; margin-left: 0px; } /* Wait 25 seconds */
    52% { opacity: 1; max-width: 0px; margin-left: 20px; } /* Animates margin out, in 1s */
    57% { opacity: 1; max-width: 100%; margin-left: 20px; } /* Animates text out, in 2.5s */
    77% { opacity: 1; max-width: 100%; margin-left: 20px; } /* Waits 10 seconds */
    82% { opacity: 1; max-width: 0px; margin-left: 20px; } /* Animates text in, in 2.5s */
    84% { opacity: 1; max-width: 0px; margin-left: 0px; } /* Animates margin in, in 1s */
    100% { opacity: 1; max-width: 0px; margin-left: 0px; } /* Waits 8 seconds  */
`

const Circle = styled.div`
    position: absolute;

    width: calc(100% - 4px);
    aspect-ratio: 1 / 1;
    background-color: var(--logo-color);
    border-radius: 100%;

    animation-name: ${rollAnimationNormal};
    animation-duration: 2.5s;
    animation-iteration-count: infinite;
    @media ${device.mobileL} { animation-name: ${rollAnimationNormalPhone}; }
`

const Tip = styled.p`
    font-weight: 600;
    margin-left: 0px;
    max-width: 0px;
    white-space: nowrap;
    overflow-x: hidden;
    width: fit-content;

    animation-name: ${slideAway};
    animation-duration: 40s;
    animation-delay: -17s;
    animation-iteration-count: infinite;

    @media ${device.tablet} { 
        font-size: 2.4vw;
    }
    @media ${device.mobileL} { font-size: 3vw; }
`

export default RollDown;