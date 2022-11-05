import toast from 'react-hot-toast';
import { useRef } from "react";
import styled from "styled-components"
import { device } from "../../../js/devices";

const getHostName = function() {
    const URL = new window.URL(window.location.href).hostname;
    var finalURL = "https://" + URL;
    if (URL == "localhost") finalURL = "http://localhost:3000";
    return finalURL;
}

function SignUp(props: any) {
    const emailInput = useRef<HTMLInputElement>(null);
    const usernameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const repeatPasswordInput = useRef<HTMLInputElement>(null);
    const signupButton = useRef<HTMLButtonElement>(null);

    function containsWhitespace(str : any) {
        return /\s/.test(str);
    }

    function validatePassword() {
        return (passwordInput.current?.value === repeatPasswordInput.current?.value && passwordInput.current?.value != "" && Number(passwordInput.current?.value.length) >= 5 && Number(passwordInput.current?.value.length) <= 20 && !containsWhitespace(passwordInput.current?.value));
    }
    function validateUsername() {
        return (!containsWhitespace(usernameInput.current?.value) && Number(usernameInput.current?.value.length) <= 15 && usernameInput.current?.value != "");
    }
    function validateEmail() {
        var isValid : boolean = false;
        if (String(emailInput.current?.value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) !== "null") {
            isValid = true;
        } else {
            isValid = false;
        }
        return isValid;
    }

    const validate = function() {
        var passwordValid : boolean = false;
        var usernameValid : boolean = false;
        var emailValid : boolean = true;

        passwordValid = validatePassword();
        usernameValid = validateUsername();
        if (emailInput.current?.value != "") emailValid = validateEmail();

        if (passwordValid && usernameValid && emailValid) { signupButton.current!.type = "submit" } else { signupButton.current!.type = "" }
    }

    const submit = async function(e: any) {
        e.preventDefault();

        const postURL = getHostName() + '/api/createAccount';
        var body : any = {};
        var formData = new FormData(e.target);
        /* @ts-ignore */
        for await (const [key, value] of formData) {
            body[key] = value;
        }

        props.wrapperControls.start("hidden");
        props.loaderControls.start("show");
        props.setLoaderText("Opretter konto...")
        const res = await fetch(postURL, {
            headers: {
            'CONTENT_TYPE': 'application/json',
            },
            body: JSON.stringify(body),
            method: 'POST',
        })

        const resJson = await res.json();
        if (resJson.status) {
            toast.success(resJson.message);
            props.setLoaderText("Konto oprettet, du kan nu logge ind. Genindlæser...")
        } else {
            toast.error(resJson.message);
            props.wrapperControls.start("signup");
            props.loaderControls.start("hidden");
        }

        await new Promise(res => setTimeout(res, 2000))
        if (resJson.status) window.location.reload();

        return false;
    }

    const validateWithNotification = function(e: any) {
        if (usernameInput.current?.value == "") {
            toast.error('Du skal skrive et brugernavn.');
            e.preventDefault();
            return false;
        }
        if (containsWhitespace(usernameInput.current?.value)) {
            toast.error('Der må ikke være mellemrum i dit brugernavn');
            e.preventDefault();
            return false;
        }
        if (Number(usernameInput.current?.value.length) > 15) {
            toast.error('Dit brugernavn må maksimum være på 15 karaktere.');
            e.preventDefault();
            return false;
        }

        if (passwordInput.current?.value == "") {
            toast.error('Du skal skrive et password.');
            e.preventDefault();
            return false;
        }
        if (containsWhitespace(passwordInput.current?.value)) {
            toast.error('Der må ikke være mellemrum i dit password.');
            e.preventDefault();
            return false;
        }
        if (Number(passwordInput.current?.value.length) < 5 || Number(passwordInput.current?.value.length) > 20) {
            toast.error('Dit password skal minimum være på 5 karaktere og maksimum være på 20 karaktere.');
            e.preventDefault();
            return false;
        }
        if (passwordInput.current?.value !== repeatPasswordInput.current?.value) {
            toast.error('Det gantaget password matcher ikke angivet password.');
            e.preventDefault();
            return false;
        }

        if (emailInput.current?.value == "") return;
        if (containsWhitespace(emailInput.current?.value)) {
            toast.error('Der må ikke være mellemrum i din email. Hvis du ikke ønsker at bruge email så sørg for at fjerne alle karaktere i feltet.');
            e.preventDefault();
            return false;
        }
        if (String(emailInput.current?.value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) === "null") {
            toast.error('Tjek din email og prøv igen');
            e.preventDefault();
            return false;
        }
    }

    const transitionToHome = async function() {
        props.signUpControls.start("left"); 
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
            <h4>Opret en konto</h4>
            <Paragraph style={{ marginBottom: "20px" }}>Opet en konto for at komme i gang</Paragraph>
            <form onSubmit={e => submit(e)} style={{ display: "flex", flexDirection: "column" }}>
                <Label >Email (valgfri):</Label><br />
                <Input ref={emailInput} onChange={validate} type="email" id="email" name="email" /><br />
                <Label >Brugernavn:</Label><br />
                <Input ref={usernameInput} onChange={validate} type="text" id="username" name="username" /><br />
                <Label >Adgangskode: (min. 5 karaktere)</Label><br />
                <Input ref={passwordInput} onChange={validate} type="password" id="password" name="password" /><br />
                <Label >Gentag adgangskode:</Label><br />
                <Input ref={repeatPasswordInput} onChange={validate} type="password" id="repeat-password" name="repeat-password" /><br />
                <CloudflareVerification className="cf-turnstile" data-sitekey="1x00000000000000000000AA"></CloudflareVerification>
                <Button ref={signupButton} onClick={e => validateWithNotification(e)}>Opret konto</Button>
                <SwitchToLogin onClick={props.SwitchToLogin}>Jeg har allerede en konto</SwitchToLogin>
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
        opacity: 1;
    }
`

const SVG = styled.svg`
    stroke: var(--detail-text-color);
    position: absolute;
    right: 20px;
    top: 38px;
    cursor: pointer;

    @media ${device.tablet} { width: 19px; height: 19px; top: 37px; }
`

export default SignUp;