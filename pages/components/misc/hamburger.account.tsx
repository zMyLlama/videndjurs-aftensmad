import styled from "styled-components"

function HamburgerAccount(props : any) {
    const getGreetingsMessage = function() {
        const today = new Date();
        const hours = today.getHours();

        if (hours < 10 && hours > 4) {
            return "Godmorgen, "
        } else if (hours < 13 && hours >= 10) {
            return "God formiddag, "
        } else if (hours < 17 && hours >= 13) {
            return "God eftermiddag, "
        } else {
            return "Godaften, "
        }
    }

    return ( 
        <Wrapper>
            <Grid>
                { Object.keys(props.accountData).length ?
                    <>
                        <ProfilePicture className='grid-row-span-2'></ProfilePicture>
                        <Name>{ getGreetingsMessage() + props.accountData.username || "Loading..." }</Name>
                        <Extra>{ props.accountData.points || "0" } points</Extra>
                    </>
                :
                    <>
                        <ProfilePicture className='grid-row-span-2'></ProfilePicture>
                        <Name>Ikke logget ind</Name>
                        <ExtraLink href="/account">Tryk her for at logge ind</ExtraLink>
                    </>
                }
            </Grid>
        </Wrapper>
    );
}

const Wrapper = styled.div`
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
const ExtraLink = styled.a`
    color: var(--detail-text-color);
    cursor: pointer;
    font-size: 16px;
`;

export default HamburgerAccount;