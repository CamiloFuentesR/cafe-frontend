import React from "react";
import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { Products } from "../views/ProductsScreen";
import { ProfileScreen } from "../views/ProfileScreen";

export const AuthorizedRouter = () => {

    return (
        <>
            <Switch>
                <Route
                    exact
                    path="/logged/profile"
                    component={ProfileScreen}
                />
                <Route
                    exact
                    path="/logged/proudcts"
                    component={Products}
                />
                {/* <Route
                    exact
                    path="/logged/admin/user"
                    component={Admin}
                /> */}
                <Redirect to="/logged/profile" />
            </Switch>
        </>
    );
}