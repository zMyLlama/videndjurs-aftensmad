import styled from "styled-components"
import Image from "next/image";

function GDPR() {
    return ( 
        <Wrapper>
            <SideAccent />
            <BackWrapper onClick={() => window.location.href = "/" }>
                <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 18L2 10L10 2" stroke="#2D2F33" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <BackText>jeg er bange mor...</BackText>
            </BackWrapper>

            <Header>GDPR og din sikkerhed</Header>
            <Text>
                <b>TLDR: Vi tager sikkerheden alvorligt og vi indsamer ikke noget vigtig data på dig</b>
            </Text>
            <Text style={{ marginBottom: "20px" }}>
                Vi kan kun gøre så meget for at sikre dit password, men i sidste ende er det op til dig at lave et sikkert password.<br />
                Et sikkert password er på minimum 10 karaktere både store og små, indeholder specialekaraktere/symboler og indeholder tal.
                <br />
                <br />
                Jeg ved godt jeg laver meget sjov her inde men det er vigtigt for mig at i forstår at jeg aldrig ville lække eller sælge jeres data... uden tilladelse.
                <br />
                <br />
                <b>Data indsamling:</b>
                <br />
                Hjemmesiden samler næsten intet data på dig, den samler dog generelt set anonymt data på hvor mange der er inde på den og hvor lang tid de bruger på forskellige sider via Google Analytics.<br/>
                Det er ikke muligt for mig at se hvem disse data tilhører det er bare for at forbedre oplevelsen på hjemmesiden.
                <br />
                *Det er ikke muligt at takke nej til denne indsamling. Hvis man ikke ønsker det så kan man bare ikke bruge hjemmesiden.
                <br />
                <br />
                <b>Nødvendige cookies:</b>
                <br />
                Vi samler få nødvendige (funktionelle) cookies der er essentielle til at hjemmesiden kan køre. Ligesom før kan du ikke takke nej til disse cookies. Hvis man ikke ønsker det så kan man bare ikke bruge hjemmesiden.
                <br />
                <br />
                <b>Data sikkerhed:</b>
                <br />
                Cookies er vigtigt, men det er mindst lige så vigtigt at I kan føle jer trykke med at indtaste oplysninger der måske er jer personlige.
            </Text>
            <ImageWrapper style={{ marginBottom: "20px" }}>
                <Image className="ImageFit" src="/PasswordHashing.png" alt="New Update Preview" layout="fill" />
            </ImageWrapper>
            <Text>
                Oppe over er et meget flot billede af et diagram jeg har stjålet fra nettet men det beskriver meget godt vores process.
                <br />
                Jeg vil ikke gå i detaljer med hvordan koden virker det er bare vigtigt at forstå hvorfor at din data er sikker.
                <br />
                <br />
                Når du indsender dit password bruger vi en funktion (SHA256) der gør dit password om til en hash. Du kan betragte en hash, som en lang streng af tilfældige karaktere. Det er ikke muligt for os at gøre dette om igen vi kan derfor aldrig se hvad dit password faktisk er.
                <br />
                For at forhindre at nogen gætter hashen til dit password tilføjer vi det man kalder en salt foran dit password, som er en tilfældig streng af karaktere. Det gør hvert kodeord unikt, også selvom flere brugere har brugt samme password. 
                <br />
                For at sikre et total tilfældigt salt bruger jeg random.org der basere sin tilfældighed ud fra atmosfærisk støj.
                <br />
                <br />
                <b>Nyttige links:</b>
                <br />
                <a href="https://gdpr-info.eu/">Læs mere om GDPR</a>
                <br />
                <a href="https://auth0.com/blog/hashing-passwords-one-way-road-to-security/">Læs mere om password sikkerhed</a>
            </Text>
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

const ImageWrapper = styled.div`
    position: relative;
    width: 60%;
    height: 350px
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

const BackText = styled.h6`
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
`

const Text = styled.p`
    margin-bottom: 50px;
    max-width: 1120px;
`

export default GDPR;