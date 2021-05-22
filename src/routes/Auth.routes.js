import React from "react";
import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { LoginScreen } from "../views/auth/LoginScreen";
import { RegisterScreen } from "../views/auth/RegisterScreen";


export const AuthRouter = () => {

    return (
        <>
            <Switch>
                <Route
                    exact
                    path="/auth/login"
                    component={LoginScreen}
                />
                <Route
                    exact
                    path="/auth/register"
                    component={RegisterScreen}
                />
                    <Redirect to='/'/>
            </Switch>
        </>
    );
}