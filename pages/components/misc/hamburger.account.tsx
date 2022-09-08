import styled from "styled-components"

function HamburgerAccount() {
    return ( 
        <Wrapper>
            <Grid>
                <ProfilePicture className='grid-row-span-2'></ProfilePicture>
                <Name>Ingen konto</Name>
                <Extra>Loading...</Extra>
            </Grid>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    pointer-events: none;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 15px;
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 40px 1fr;
    grid-column-gap: 15px;
`;

const ProfilePicture = styled.div`
    width: 40px;
    aspect-ratio: 1 / 1;
    background-color: var(--border-color);
    border-radius: 50%;
    overflow: hidden;
`;
const Name = styled.h6`
    color: var(--text-color);
`;
const Extra = styled.p`
    color: var(--detail-text-color);
    font-size: 16px;
`;

export default HamburgerAccount;