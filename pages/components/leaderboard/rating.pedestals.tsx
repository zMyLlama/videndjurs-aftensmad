import styled from "styled-components"
import { motion } from "framer-motion";
import Image from "next/image";
import { device } from "../../../js/devices";

function RatingPedestals() {
    return ( 
        <Wrapper>
            <LeftPedestal>
                <Image className="ImageFit" src="/RatingNumbers/RatingNumberTwo.png" alt="New Update Preview" layout="fill" />
            </LeftPedestal>
            <CenterPedestal>
                <Image className="ImageFit" src="/RatingNumbers/RatingNumberOne.png" alt="New Update Preview" layout="fill" />
            </CenterPedestal>
            <RightPedestal>
                <Image src="/RatingNumbers/RatingNumberThree.png" alt="New Update Preview" layout="fill" />
            </RightPedestal>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    position: relative;
    width: calc(100% - 80px);
    margin-top: 100px;

    display: flex;
    justify-content: center;

    @media ${device.laptopS} { width: calc(100% - 20px); }
`

const CenterPedestal = styled.div`
    width: 190px;
    height: 260px;
    z-index: 1;
`

const LeftPedestal = styled.div`
    position: absolute;
    rotate: -15deg;
    translate: -150px 50px 0px;
    width: 206px;
    height: 260px;
    z-index: 0;
`

const RightPedestal = styled.div`
    position: absolute;
    rotate: 15deg;
    translate: 150px 50px 0px;
    width: 206px;
    height: 260px;
    z-index: 0;
`

export default RatingPedestals;