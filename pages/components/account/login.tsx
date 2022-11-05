import toast from 'react-hot-toast';
import styled from "styled-components"
import { device } from "../../../js/devices";

const getHostName = function() {
    const URL = new window.URL(window.location.href).hostname;
    var finalURL = "https://" + URL;
    if (URL == "localhost") finalURL = "http://localhost:3000";
    return finalURL;
}

function Login(props: any) {
    const handleSubmit = async function(e : any) {
        e.preventDefault();

        const postURL = getHostName() + '/api/login';
        var body : any = {};
        var formData = new FormData(e.target);
        /* @ts-ignore */
        for await (const [key, value] of formData) {
            body[key] = value;
        }

        props.wrapperControls.start("hidden");
        props.loaderControls.start("show");
        props.setLoaderText("Logger ind...")
        const res = await fetch(postURL, {
            headers: {
            'CONTENT_TYPE': 'application/json',
            },
            body: JSON.stringify(body),
            method: 'POST',
        })

        const resJson = await res.json();
        if (resJson.status) {
            props.setLoaderText("Hej, " + body["username"] + ". Vent venligst...")
            document.cookie=".HASHKEY=_[DO-NOT-SHARE]_" + resJson.message + "; expires=Tue, 19 Jan 2038 04:14:07 GMT; path=/; SameSite=lax"
            await new Promise(res => setTimeout(res, 1000))
            window.location.href = "/"
        } else {
            toast.error(resJson.message);
            props.wrapperControls.start("signup");
            props.loaderControls.start("hidden");
        }
    }

    const transitionToHome = async function() {
        props.loginControls.start("right"); 
        await new Promise(res => setTimeout(res, 300))
        props.wrapperControls.start("transition");
        await new Promise(res => setTimeout(res, 400))
        window.location.href = "/"
    }

    return ( 
        <Wrapper>
            <Logo onClick={transitionToHome}>
                <LogoText>Kridt</LogoText>
            </Logo>
            <SVG onClick={transitionToHome} width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 13L13 1" stroke-linecap="round"/>
                <path d="M13 13L1 1" stroke-linecap="round"/>
            </SVG>
            <h4>Log ind</h4>
            <Paragraph style={{ marginBottom: "20px" }}>Hvis du ikke har en konto så kan du trykke på linket neden under log ind knappen.</Paragraph>
            <form onSubmit={e => handleSubmit(e)} style={{ display: "flex", flexDirection: "column" }}>
                <Label >Brugernavn:</Label><br />
                <Input type="text" id="username" name="username" /><br />
                <Label >Adgangskode:</Label><br />
                <Input type="password" id="password" name="password" /><br />
                <CloudflareVerification className="cf-turnstile" data-sitekey="1x00000000000000000000AA"></CloudflareVerification> 
                <Button>Log ind</Button>
                <SwitchToLogin onClick={props.SwitchToSignup}>Jeg har ikke en konto</SwitchToLogin>
                <Paragraph style={{ marginTop: "20px" }}>Hvis du vil læse mere omkring hvordan vi håndtere dine oplysninger så <Highlight href="/gdpr">klik her</Highlight></Paragraph>
            </form>
        </Wrapper>
    );
}

const CloudflareVerification = styled.div`
    width: 100% !important;
    > * {
        width: 100% !important;
    }
`

const Wrapper = styled.div``

const Logo = styled.div`
    width: fit-content;
    height: fit-content;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 3px;
    padding-bottom: 3px;
    cursor: pointer;

    border-radius: 10px;
    background-color: var(--logo-color);

    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
`

const LogoText = styled.h1`
    font-size: 30px;
    color: ${(props) => props.theme.logoTextColor};

    @media ${device.tablet} { font-size: 26px; }
`

const Paragraph = styled.p`
    font-size: 16px;
    color: var(--detail-text-color);
`

const Highlight = styled.a`
    font-weight: bold;
    cursor: pointer;
`

const SwitchToLogin = styled.a`
    color: var(--text-color);
    margin-top: 10px;
    text-decoration: underline;
    cursor: pointer;
`

const Label = styled.label`
    color: var(--text-color);
    font-size: 16px;
`

const Input = styled.input`
    all: unset;
    color: var(--text-color);
    box-sizing: border-box;
    width: 100%;
    height: 35px;
    border: 1px solid var(--border-color);
    margin-bottom: 10px;
    border-radius: 5px;

    padding-left: 10px;
    padding-right: 10px;
`

const Button =  styled.button`
    all: unset;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: var(--logo-color);
    width: 100%;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;

    color: ${(props) => props.theme.logoTextColor};
    font-weight: 600;
    text-align: center;

    display: flex;
    align-items: center;
    justify-content: center;
    outline-offset: 0px;
    outline: solid 5px transparent;
    transition: var(--transition-time);

    &:hover {
        opacity: 0.9;
    }

    &:focus-visible {
        outline-offset: 4px;
        outline: solid 5px var(--attention-color);
    }

    &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }
`

const SVG = styled.svg`
    stroke: var(--detail-text-color);
    position: absolute;
    right: 20px;
    top: 38px;
    cursor: pointer;

    @media ${device.tablet} { width: 19px; height: 19px; top: 41px; }
`

export default Login;