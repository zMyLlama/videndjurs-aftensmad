import { ReactNode } from "react";
import styled from "styled-components"

interface Props {
    selected : boolean;
}

function Chip(props : any) {
    return ( 
        <ChipButton onClick={ () => props.setSelectedChip(props.inside) } selected={ props.selected }>
            <Text selected={ props.selected }>{ props.inside }</Text>
        </ChipButton>
    );
}

const ChipButton = styled.button<Pick<Props, "selected">>`
    padding-left: 10px;
    padding-right: 10px;
    height: 25px;

    transition: var(--transition-time);

    display: flex;
    align-items: center;
    justify-content: center;

    border: ${props => props.selected ? '2px solid #4285F4' : "2px solid #2D2F33"};
    background: ${props => props.selected ? 'rgba(66, 133, 244, 0.7)' : "transparent"};
    border-radius: 100px;
`
const Text = styled.p<Props>`
    color: ${props => props.selected ? 'white' : "black"};
    font-size: 16px;
    font-weight: 600;
    transition: var(--transition-time);
`

export default Chip;