import styled from "styled-components"
import { device } from "./js/Devices"

function UpdateLog() {
    return ( 
        <Wrapper>
            <SideAccent />
            <BackWrapper onClick={() => window.location.href = "/" }>
                <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 18L2 10L10 2" stroke="#2D2F33" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <BackText>wat da hell bruh take me back right now</BackText>
            </BackWrapper>
            <Header>Backstory</Header>
            <Text>
                Howdy 👋 siden i er ankommet her har i nok en form for interesse inden for den tekniske del af hjemmesiden... tænker jeg. <br />
                Før jeg begynder skal det lige siges at jeg er mega ligeglad med grammatikken her inde da det bare er sådan en hurtigt lille update log. <br />
                <b>Hvis du kun er interesseret i update loggen så fortsæt længere ned forbi den her ufattelig lange backstory.</b><br />
                <br />
                Hjemmesiden er bygget med nextjs og den henter alt sin data fra redis. Jeg bruger styled-components til at... well style mine components og så bruger jeg framer motion til lidt mere avanceret animationer såsom rating systemet.<br/>
                Så er der vidst også noget babel til at debugge lidt nemmere siden styled-components giver alle mulige russiske navne.<br/>
                <br/>
                Hjemmesiden er hostet på netlify, som jeg endte med (overvejede også firebase), udover det er den beskyttet med cloudflare fordi i er crazy alle sammen.<br/>
                <br/>
                Lige nu ændrer jeg madplanen direkte i databasen men i fremtiden kan man gøre det på hjemmesiden hvis man er admin selvfølgelig. I må gerne prøve at bypass det hvis i orker, jeg kunne ikke stoppe jer anyways.<br/>
                <br/>
                Tim kom op med idéen for hjemmesiden for sån 2 dage siden (8/22/2022) og jeg (Noel) programmerede den på et par dage, som et hobby projekt.
            </Text>

            <UpdateHeader>Update log <span className="tiny">i literally hard coded this... 💀</span></UpdateHeader>
            <UpdateWrapper>
                <UpdateWrapperHeader>RELEASE WOWOWO</UpdateWrapperHeader>
                <UpdateWrapperDate>24/8/2022</UpdateWrapperDate>
                <UpdateWrapperText>
                    Ok så det hele er i navnet det er literally bare release så alt hvad i ser lige nu på hele hjemmesiden og alle subpages.<br/>
                    <br/>
                    I tænker sikkert også (nok ikke) hvor sørgeligt det er jeg har siddet og skrevet de her beskeder før platformen er udgivet og ja det er rimelig sørgeligt men så er de klar til udgivelse og jeg håber på at bare lidt personer fra campus vil bruge hjemmesiden.
                    Jeg smider nok google analytics på hjemmesiden, ikke fordi jeg vil tracke alt jeres sensitive information jeg er bare oprigtigt interesseret i hvor mange der bruger hjemmesiden.<br/>
                    <br/>
                    Thats all.... 👋
                </UpdateWrapperText>
            </UpdateWrapper>
        </Wrapper>
     );
}

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    background-color: var(--bg-color);
    padding-top: 80px;
    padding-left: 20px;
    padding-right: 20px;
`

const BackWrapper = styled.div`
    display: flex;
    align-items: center;
    column-gap: 15px;
    margin-bottom: 5px;
    width: fit-content;
    height: 50px;
    cursor: pointer;
`

const SideAccent = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: linear-gradient(268.89deg, #FF9877 0%, #FF8A65 36.83%, #FF7E55 99.59%);
    transition: var(--transition-time);

    display: flex;
    align-items: center;
    justify-content: center;
`

const Header = styled.h1``
const UpdateHeader = styled.h1`
    @media ${device.mobileL} { line-height: 30px; width: 93%; }
`
const UpdateWrapperHeader = styled.h5`
    
`
const BackText = styled.h6`
    -moz-user-select: none;
   -khtml-user-select: none;
   -webkit-user-select: none;
`

const Text = styled.p`
    margin-bottom: 50px;
`
const UpdateWrapperText = styled.p`
    margin-top: 20px;
`

const UpdateWrapperDate = styled.h6`
    color: var(--detail-text-color);
    font-size: 16px;
`

const UpdateWrapper = styled.div`
    max-width: 1500px;
    width: 100%;
    margin-top: 20px;
    background: #FFFFFF;
    border: 2px solid #E6E5E5;
    border-radius: 20px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
`

export default UpdateLog;      