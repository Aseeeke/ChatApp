import React, {useContext} from 'react';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import AppRouter from "./components/AppRouter.jsx";
import './App.css'
import {Context} from "./main.jsx";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "./components/Loader.jsx";

function App() {
    const {auth} = useContext(Context)
    const [user, loading, error] = useAuthState(auth);
    if (loading) {
        return <Loader/>
    }
  return (
    <BrowserRouter>
        <Navbar/>
        <AppRouter/>
    </BrowserRouter>
  )
}

export default App
