import React, {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {Button, Grid} from "@mui/material";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts.jsx";
import {Context} from "../main.jsx";
import {useAuthState} from "react-firebase-hooks/auth";

const Navbar = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth);
    return (
            <AppBar color={"primary"} position="static">
                <Toolbar variant={"dense"}>
                    <Grid containter justifyContent = {"flex-end"}>
                        {user ?
                            <Button onClick={() => auth.signOut()} variant={"outlined"} color={"inherit"}>Log out</Button>
                            :
                            <NavLink to={LOGIN_ROUTE}>
                            <Button variant={"outlined"} color={"inherit"}>Log in</Button>
                            </NavLink>
                            }
                    </Grid>
                </Toolbar>
            </AppBar>
    );
};

export default Navbar;