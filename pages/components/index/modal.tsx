import styled from "styled-components"
import { motion } from "framer-motion";
import { device } from "../../../js/devices";

function Modal(props: any) {
    const modalData = props.modalData || []

    return ( 
        <Wrapper
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <ModalWrapper>
                <TopWrapper>
                    <Header>{ modalData[0] }</Header>
                    <SVG onClick={() => props.setModalData([]) } width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 13L13 1" stroke="#4b4d52" stroke-linecap="round"/>
                        <path d="M13 13L1 1" stroke="#2D2F33" stroke-linecap="round"/>
                    </SVG>
                </TopWrapper>
                <Line />
                <BottomWrapper>
                    <Text>{ modalData[1] }</Text>
                </BottomWrapper>
            </ModalWrapper>
        </Wrapper>
     );
}

const Wrapper = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 9999;
    padding-left: 20px;
    padding-right: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
`

const ModalWrapper = styled.div`
    background: #FFFFFF;
    border: 2px solid var(--border-color);
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    padding-top: 15px;
    padding-bottom: 15px;
    min-width: 700px;
    width: fit-content;

    @media ${device.tablet} { min-width: 80%; }
    @media ${device.mobileL} { min-width: 300px; }
`

const Line = styled.div`
    width: 100%;
    height: 2px;
    background-color: var(--border-color);
`

const TopWrapper = styled.div`
    position: relative;
    padding-left: 25px;
    padding-right: 25px;
    display: flex;
    height: fit-content;
    align-items: center;
    margin-bottom: 15px;
`
const BottomWrapper = styled.div`
    padding-left: 25px;
    padding-right: 25px;
`

const Header = styled.h4`
`
const Text = styled.p`
    margin-top: 15px;
    @media ${device.mobileL} { font-size: 16px; }
`

const SVG = styled.svg`
    position: absolute;
    right: 25px;
    cursor: pointer;

    @media ${device.laptopL} { width: 22px; height: 22px; }
`

export default Modal;