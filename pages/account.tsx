import styled from "styled-components"
import { lightTheme, darkTheme, GlobalStyles } from "../js/themes.js";

function Account() {
    return ( 
        <Wrapper>
            <GlobalStyles theme={"light"} />
            <Form>
                <h4>Opret konto</h4>
                <Paragraph style={{ marginBottom: "20px" }}>Opet en konto for at komme i gang</Paragraph>
                <form action="/api/getData">
                    <Label >Email (valgfri):</Label><br />
                    <Input type="email" id="email" name="email" /><br />
                    <Label >Brugernavn:</Label><br />
                    <Input type="text" id="username" name="username" /><br />
                    <Label >Adgangskode:</Label><br />
                    <Input type="password" id="password" name="password" /><br />
                    <Label >Gentag adgangskode:</Label><br />
                    <Input type="password" id="repeat-password" name="repeat-password" /><br />
                    <Button disabled={false} type="submit" value="Opret konto" />
                    <SwitchToLogin>Jeg har allerede en konto</SwitchToLogin>
                    <Paragraph style={{ marginTop: "20px" }}>Hvis du vil læse mere omkring hvordan vi håndtere dine oplysninger så <Highlight>klik her</Highlight></Paragraph>
                </form>
            </Form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    background-color: var(--bg-color);
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Paragraph = styled.p`
    font-size: 16px;
    color: var(--detail-text-color);
`

const Highlight = styled.span`
    font-weight: bold;
    cursor: pointer;
`

const SwitchToLogin = styled.a`
    text-decoration: underline;
    cursor: pointer;
    margin: auto;
`

const Label = styled.label`
    font-size: 16px;
`

const Input = styled.input`
    all: unset;
    box-sizing: border-box;
    width: 100%;
    height: 35px;
    border: 1px solid var(--border-color);
    margin-bottom: 10px;
    border-radius: 5px;

    padding-left: 10px;
    padding-right: 10px;
`

const Button =  styled.input`
    all: unset;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: var(--logo-color);
    width: 100%;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;

    color: white;
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

const Form = styled.div`
    padding: 20px;
    width: 400px;
    height: 600px;

    display: flex;
    justify-content: center;
    flex-direction: column;

    background-color: white;
    border: 1px solid var(--border-color);
    border-radius: 10px;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.1);
`

export default Account;