import styled from "styled-components"
import { motion } from "framer-motion";

interface Props {
    isEven : boolean;
}

const variants = {
    hidden: { translate: "-100vw" },
    show: { translate: "0vw", transition: { type: "spring", stiffness: 70, mass: 0.6 } }
}

function LeaderboardItem(props : any) {
    const isEven = function(number: number) {
        return number % 2 === 0 ? true : false;
    }

    return ( 
        <Wrapper variants={variants} isEven={isEven(props.number)}>
            <Ranking>{ props.number }</Ranking>
            <Meal>{ props.meal || "Loading fejl" }</Meal>

            <StarsText className="bold">{ (props.amount / props.votersAmount) || "Ingen" } stjerner</StarsText>
            <Amount className="bold">{ props.amount }</Amount>
            <VotersAmount className="bold">{ props.votersAmount }</VotersAmount>
        </Wrapper>
    );
}

const Wrapper = styled(motion.div)<Props>`
    display: flex;
    align-items: center;
    column-gap: 30px;

    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;

    background: ${(props) => props.isEven ? "transparent" : "var(--list-color)"};
    border: ${(props) => props.isEven ? "transparent" : "1px solid #E5E5E5;"};
    border-radius: 10px;
`

const Ranking = styled.h4``
const Meal = styled.p`
    width: 50%;
`

const StarsText = styled.h6`
    margin-left: auto;
`
const Amount = styled.h6`
    width: 50px;
    text-align: right;
    margin-right: 10px; 
`
const VotersAmount = styled.h6`
    width: 25px;
    text-align: right;
`

export default LeaderboardItem;