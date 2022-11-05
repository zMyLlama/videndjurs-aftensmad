import { useRef } from "react";
import styled from "styled-components"

interface Props {
    size : string,
    gradient : string,
    ranking : number
}

function Ranking(props : any) {
    const getSmiley = function() {
        if (props.ranking === 1) {
            return "😁"
        } else if (props.ranking === 2) {
            return "😀"
        } else {
            return "🙂"
        }
    }

    return ( 
        <Wrapper ref={ props.ranking === 1 ? props.confettiSourceE : null } size={props.size} gradient={props.gradient} >
            <Smiley>{ getSmiley()  }</Smiley>
            <RankingNumber ranking={props.ranking}>{ props.ranking }</RankingNumber>
            <InformationWrapper size={props.size} >
                <Meal>{ props.mealData.Meal || "Ingen" }</Meal>
                <TotalScore>Fik { props.mealData.Rating.Amount || "0" } i score</TotalScore>
            </InformationWrapper>
        </Wrapper>
    );
}

const Wrapper = styled.div<Pick<Props, 'size' | 'gradient'>>`
    position: relative;

    height: ${props => props.size === "big" ? "90px" : "80px"};
    width: ${props => props.size === "big" ? "90px" : "80px"};
    margin-top: ${props => props.size === "big" ? "0px" : "30px"};
    flex-shrink: 0;
    flex-grow: 0;
    background: ${props => props.gradient};
    border: 2px solid #2D2F33;
    border-radius: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`

const Smiley = styled.h2``

const InformationWrapper = styled.div<Pick<Props, 'size'>>`
    position: absolute;
    bottom: -50px;
    width: ${props => props.size === "big" ? "190px" : "140px"};
    flex-shrink: 0;
`

const Meal = styled.h6`
    overflow: hidden;
    white-space: nowrap;
    color: var(--text-color);
    width: 100%;
    height: 24px;
    text-overflow: ellipsis;
    text-align: center;
`

const TotalScore = styled.p`
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    color: var(--detail-text-color);
`

const RankingNumber = styled.div<Pick<Props, 'ranking'>>`
    position: absolute;
    top: -15px;

    background: ${props => props.ranking === 1 ? "linear-gradient(180deg, #F8D182 0%, #DAA22F 100%);" : "linear-gradient(180deg, #D7D7D7 0%, #968D7B 100%);"};
    background: ${props => props.ranking === 3 ? "linear-gradient(180deg, #F8B482 0%, #8B4B26 100%);" : null};
    width: ${props => props.ranking === 1 ? "35px" : "30px"};
    height: ${props => props.ranking === 1 ? "35px" : "30px"};

    display: flex;
    align-items: center;

    justify-content: center;
    font-weight: bold;
    color: white;
    font-size: ${props => props.ranking === 1 ? "25px" : "20px"};

    z-index: 3;
    border-radius: 100%;
    border: 2px solid #2D2F33;
`

export default Ranking;