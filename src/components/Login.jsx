import React, {useContext} from 'react';
import {Box, Button, Container, Grid} from "@mui/material";
import {Context} from "../main.jsx";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const Login = () => {
    const {auth} = useContext(Context)

    const login = async() => {
        const provider = new GoogleAuthProvider();
        const result =await signInWithPopup(auth, provider)
        const user = result.user
        console.log(user)
    }

    return (
        <Container>
            <Grid container style={{height: window.innerHeight - 50}}
                alignItems={"center"}
                  justifyContent={"center"}
            >
                <Grid style={{width:400, background:"lightgray"}}
                    container
                      alignItems={"center"}
                      direction={"column"}
                >
                    <Box p={5}>
                        <Button onClick={login}>Log in with google</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;