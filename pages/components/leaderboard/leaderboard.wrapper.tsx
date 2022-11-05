import { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import styled from "styled-components"

import Chip from "./chip"
import LeaderboardItem from "./leaderboard.item";
const Chips = ["Bedst til værst", "Værst til bedst"]

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08
        }
    }
}

function LeaderboardWrapper(props : any) {
    const [ selectedChip, setSelectedChip ] = useState("Bedst til værst");
    const [ showFilters, setShowFilters ] = useState(true);
    const controls = useAnimationControls()

    useEffect(() => {
        controls.start("show")
    }, [selectedChip])

    const getSortedData = () => {
        if (selectedChip === "Bedst til værst") {
            return <>
                {
                    props.sortedData.map((dayData : any, index : number) => {
                        index++;
                        return <LeaderboardItem amount={dayData.Rating.Amount} votersAmount={dayData.Rating.Voters.length} meal={dayData.Meal} number={index} key={selectedChip + index} />
                    })
                }
            </>
        } else if (selectedChip === "Værst til bedst") {
            return <>
                {
                    props.sortedData.slice(0).reverse().map((dayData : any, index : number) => {
                        index++;
                        return <LeaderboardItem amount={dayData.Rating.Amount} votersAmount={dayData.Rating.Voters.length} meal={dayData.Meal} number={props.sortedData.length - (index - 1)} key={selectedChip + index} />
                    })
                }
            </>
        }
    }

    return ( 
        <Wrapper>
            <Title>Alle måltider</Title>
            <ChipsList>
                <Filter onClick={ () => setShowFilters(!showFilters) }>{ showFilters ? "Gem filtre" : "Hvis filtre" }</Filter>
                {
                    showFilters ?
                        Chips.map((chip, index) => {
                            return <Chip key={index} selected={selectedChip === chip ? true : false} inside={chip} setSelectedChip={setSelectedChip} />
                        })
                    :
                    null
                }
            </ChipsList>

            <List variants={container} animate={controls} initial="hidden">
                <ListDefiner>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-award"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
                    <DefinerText>Måltid</DefinerText>
                    <svg style={{ marginLeft: "auto", marginRight: "5px" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <DefinerText >Score</DefinerText>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </ListDefiner>
                { selectedChip ?
                        getSortedData()
                    :
                        null
                }
            </List>
        </Wrapper>
    );
}

const Wrapper = styled.div``

const ListDefiner = styled.div`
    display: flex;
    align-items: center;
    column-gap: 30px;

    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 10px;
`

const DefinerText = styled.h6``

const ChipsList = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    row-gap: 5px;
    column-gap: 10px;
    margin-top: 10px;
    margin-bottom: 40px;
`

const Filter = styled.button`
    width: fit-content;
    height: 30px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 10px;
    background-color: var(--logo-color);

    color: ${(props) => props.theme.logoTextColor};
    font-size: 20px;
    font-weight: 600;

    display: flex;
    justify-content: center;
    align-items: center;

`

const Title = styled.h2` font-weight: 600; `

const List = styled(motion.div)`
    width: 100%;
`

export default LeaderboardWrapper;