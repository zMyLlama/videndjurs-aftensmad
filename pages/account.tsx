import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components"
import { motion, useAnimationControls } from "framer-motion";
import { device, fakeData } from "../js/devices";
import { lightTheme, darkTheme, GlobalStyles } from "../js/themes.js";

import SignUp from "./components/account/sign.up";
import Login from "./components/account/login";
import BarLoader from "react-spinners/BarLoader";

const signUpVariants = {
    left: { transform: "translateX(-110%)" },
    center: { transform: "translateX(0%)" },
}
const loginVariants = {
    right: { transform: "translateX(110%)" },
    center: { transform: "translateX(0%)" },
}
const wrapperVariants = {
    signup: { height: "665px", transform: "translateY(0%)" },
    login: { height: "550px", transform: "translateY(0%)" },
    hidden: { transform: "translateY(200%)", transition: { duration: 0.5 } },
    transition: { height: "100vh", width: "100%", transition: { duration: 0.35 } },
}

const loaderVariants = {
    hidden: { transform: "translateY(-100vh)" },
    show: { transform: "translateY(-0vh)", transition: { duration: 1.3, ease: [0.33, 1, 0.68, 1] } },
}

function Account() {
    const [ theme, setTheme ] = useState("dark");
    const [ loaderText, setLoaderText ] = useState("Vent venligst...");

    const signUpControls = useAnimationControls();
    const loginControls = useAnimationControls();
    const wrapperControls = useAnimationControls();
    const loaderControls = useAnimationControls();

    useEffect(() => {
        localStorage.getItem("theme")
        setTheme(localStorage.getItem("theme") ? localStorage.getItem("theme") as string : "light");
    }, [])

    const SwitchToLogin = function() {
        signUpControls.start("left");
        loginControls.start("center");
        wrapperControls.start("login");
    }

    const SwitchToSignup = function() {
        signUpControls.start("center");
        loginControls.start("right");
        wrapperControls.start("signup");
    }

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <Background>
                <GlobalStyles theme={theme} />
                <Loader
                    initial={"hidden"}
                    animate={loaderControls}
                    variants={loaderVariants}
                >
                    <BarLoader width="250px" color={theme === "light" ? "#000000" : "#ffffff"} />
                    <h4 style={{ marginTop: "15px", fontWeight: "500", textAlign: "center" }}>{ loaderText }</h4>
                </Loader>
                
                <Wrapper
                    initial={"login"}
                    transition={{ ease: "easeOut", duration: 0.3 }}
                    animate={wrapperControls}
                    variants={wrapperVariants}
                >
                    <SignupForm
                        initial={"left"}
                        transition={{ ease: "easeOut", duration: 0.3 }}
                        animate={signUpControls}
                        variants={signUpVariants}
                    >
                        <SignUp 
                            signUpControls={signUpControls} 
                            setLoaderText={setLoaderText} 
                            loaderControls={loaderControls} 
                            wrapperControls={wrapperControls} 
                            SwitchToLogin={SwitchToLogin} 
                        />
                    </SignupForm>

                    <LoginForm
                        initial={"center"}
                        transition={{ ease: "easeOut", duration: 0.3 }}
                        animate={loginControls}
                        variants={loginVariants}
                    >
                        <Login
                            loginControls={loginControls} 
                            setLoaderText={setLoaderText} 
                            loaderControls={loaderControls} 
                            wrapperControls={wrapperControls} 
                            SwitchToSignup={SwitchToSignup} 
                        />
                    </LoginForm>
                </Wrapper>
            </Background>
            <Toaster />
        </ThemeProvider>
    );
}

const Background = styled.div`
    background-color: var(--bg-color);
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Loader = styled(motion.div)`
    position: absolute;
    width: 400px;
    height: 300px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Wrapper = styled(motion.div)`
    position: relative;
    overflow: hidden;
    width: 400px;
    height: 600px;

    background-color: ${(props) => props.theme.bgLoginColor};
    border: 1px solid var(--border-color);
    border-radius: 10px;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.1);
`

const SignupForm = styled(motion.div)`
    position: absolute;
    padding: 20px;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    flex-direction: column;
`

const LoginForm = styled(motion.div)`
    position: absolute;
    padding: 20px;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    flex-direction: column;
`

export default Account;