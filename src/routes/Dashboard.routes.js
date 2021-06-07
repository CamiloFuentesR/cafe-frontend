import React from "react";
import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { Home } from "../views/HomeScreen";
import { Products } from "../views/ProductsScreen";
import { Users } from "../views/UsersScreen";
import { AuthRouter } from "./Auth.routes";

export const DashboardRouter = () => {

    return (
        <>
            <Switch>
                <Route
                    exact
                    path="/"
                    component={Home}
                />
                <Route
                    exact
                    path="/users"
                    component={Users}
                />
                <Route
                    exact
                    path="/products"
                    component={Products}
                />
                <Route
                    path="/auth"
                    component={AuthRouter}
                />
                <Redirect to="/" />
            </Switch>
        </>
    );
}