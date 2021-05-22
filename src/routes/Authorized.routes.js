import React from "react";
import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { Admin } from "../views/Admin";


export const AuthorizedRouter = () => {

    return (
        <>
            <Switch>
                <Route
                    exact
                    path="/logged/user"
                    component={Admin}
                />
                <Redirect to="/logged/user" />
            </Switch>
        </>
    );
}