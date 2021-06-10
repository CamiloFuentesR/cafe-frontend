import React from "react";
import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import {AdminUsers} from "../views/admin/AdminUsers"
import { DataTableCrudDemo } from "../views/admin/AdminProfileScreen";
import { Products } from "../views/ProductsScreen";
export const AdminConfig = () => {
    return (
        <>
            <Switch>
                <Route
                    exact
                    path="/admin/profile"
                    component={DataTableCrudDemo}
                />
                <Route
                    exact
                    path="/admin/user"
                    component={AdminUsers}
                />
                <Route
                    exact
                    path="/admin/products"
                    component={Products}
                />
                <Redirect to="/admin/profile" />
            </Switch>
        </>
    );
}