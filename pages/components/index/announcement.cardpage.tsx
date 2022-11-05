import styled from "styled-components"
import Image from "next/image";
import { motion } from "framer-motion"

function AnnouncementCardpage(props : any) {
    return ( 
        <Wrapper
            initial={{ opacity: 0, transform: "translateY(30px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)", transition: { delay: 0.5, duration: 1, ease: [0.33, 1, 0.68, 1] } }}
            exit={{ opacity: 0, transform: "translateY(-20px)", transition: { duration: 0.7 } }}
        >
            <ImageWrapper
                initial={{ transform: "scale(1.25)", opacity: 0 }}
                animate={{ transform: "scale(1)", opacity: 1, transition: { delay: 0.25, duration: 1.5 } }}
                exit={{ transform: "scale(1.1)", opacity: 0, transition: { duration: 1 } }}
                className={ props.Title === "Opdatering 3.0.0" ? "AnimateFlip" : "" }
            >
                <Image src={ props.src } className={"ImageFit"} layout="fill" />
            </ImageWrapper>

            <Title>{ props.Title }</Title>
            <Description>{ props.Description }</Description>
            <Button onClick={props.ButtonFunction}>{ props.ButtonText }</Button>
        </Wrapper>
    );
}

const Wrapper = styled(motion.div)`
    position: absolute;
    margin-top: 180px;
    z-index: 2;
    width: 100%;

    padding-left: 30px;
    padding-right: 30px;

    display: flex;
    flex-direction: column;
    row-gap: 5px;
`

const ImageWrapper = styled(motion.div)`    
    position: absolute;
    left: 0;
    top: -100%;
    transform: translate(0%, -50%);
    width: 100%;
    height: 110px;
    z-index: 2;
`

const Title = styled.h6`
    font-weight: 600;
    color: var(--text-color)
`

const Description = styled.p`
    font-size: 15px;
    font-weight: 500;
    color: var(--detail-text-color);
    white-space: pre-line;
`

const Button = styled.button`
    margin-top: 15px;
    width: 100px;
    height: 25px;
    background: var(--attention-color);
    border-radius: 10px;

    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
`

export default AnnouncementCardpage;