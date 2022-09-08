import styled from "styled-components"

function HamburgerVersion(props: any) {
    return ( 
        <Wrapper>
            <VersionText>{ props.version }</VersionText>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    position: absolute;
    bottom: 10px;
    left: 90px;

    width: fit-content;
    height: fit-content;
    border-radius: 5px;
    background-color: var(--logo-color);

    padding-left: 10px;
    padding-right: 10px;
    padding-top: 3px;
    padding-bottom: 3px;
`

const VersionText = styled.p`
    color: ${(props) => props.theme.logoTextColor};
    font-size: 12px;
    font-weight: 600;
`

export default HamburgerVersion;