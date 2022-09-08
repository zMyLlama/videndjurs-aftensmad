import styled from "styled-components"
import Image from "next/image";

interface Props {
    isSelected : boolean
}

function HamburgerItem(props: any) {
    const executeClick = function() {
        if (props.type.toLowerCase() === "function") {
            props.execute(props.parameter)
        } else if (props.type.toLowerCase() === "hyperlink") {
            window.location.href = props.parameter;
        } else if (props.type.toLowerCase() === "theme") {
            props.execute();
        }
    }

    return ( 
        <Wrapper onClick={executeClick} isSelected={props.isSelected}>
            <ImageWrapper>
                <Image src={ props.svg } alt="Icon" layout="fill" />
            </ImageWrapper>
            <Text isSelected={props.isSelected}>{ props.text }</Text>
        </Wrapper>
    );
}

const Wrapper = styled.div<Props>`
    width: calc(100% - 20px);
    height: 45px;
    flex-shrink: 0;

    display: flex;
    transition: var(--transition-time);
    border-radius: 8px;
    cursor: pointer;
    align-items: center;
    column-gap: 15px;
    padding-left: 15px;
    padding-right: 15px;

    background-color: ${props => props.isSelected ? props.theme.menuHoverItem : "transparent"};
    &:hover {
        background-color: ${(props) => props.theme.menuHoverItem};
    }
`

const ImageWrapper = styled.div`
    position: relative;
    width: 22px;
    height: 22px;
    border-radius: 5px;
`

const Text = styled.p<Props>`
    color: var(--text-color);
    font-size: 16px;
    font-weight: ${props => props.isSelected ? "600" : "400"};
`

export default HamburgerItem;