import React, {useContext} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import {privateRoutes, publicRoutes} from "../routes.js";
import {CHAT_ROUTE, LOGIN_ROUTE} from "../utils/consts.jsx";
import {useAuthState} from "react-firebase-hooks/auth";
import {Context} from "../main.jsx";

const AppRouter = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth);
    console.log(user)
    return user ? (
        <Routes>
            {privateRoutes.map(({path, Component}) => (
                <Route path={path} element={<Component />} key={path} />
            ))}
            <Route path="*" element={<Navigate to={CHAT_ROUTE} />} />
        </Routes>
    ) : (
        <Routes>
            {publicRoutes.map(({path, Component}) => (
                <Route path={path} element={<Component />} key={path} />
            ))}
            <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
        </Routes>
    );
};

export default AppRouter;
