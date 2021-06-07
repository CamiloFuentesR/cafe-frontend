import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Switch,
} from "react-router-dom";
import { PrivateRouter } from "./Private.routes";
import { PublicRouter } from "./Public.routes";
import { DashboardRouter } from "./Dashboard.routes";

import { NavBar } from "../components/layouts/NavBar";
import { AuthorizedRouter } from "./Authorized.routes";
import { useDispatch, useSelector } from "react-redux";
import { startChecking } from "../actions/auth.action";
import { LoadingSpining } from "../components/ui/LoadingSpining";
import { AdminRouter } from "./Admin.routes";
import { AdminConfig } from "./AdminConfig.routes";

export const AppRouter = () => {
    const { isLogged, checking } = useSelector(state => state.root)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startChecking())
    }, [dispatch])
    if (checking) {
        return <LoadingSpining />
    }
    return (
        <Router>
            <>
                <NavBar />
                <div>
                    <Switch>
                        <AdminRouter
                            path="/admin"
                            component={AdminConfig}
                            isAuthenticated={isLogged}
                        />
                        <PrivateRouter
                            path="/logged"
                            component={AuthorizedRouter}
                            isAuthenticated={isLogged}
                        />
                        {/* todas las rutas deben ir sobre esta o sino sale error */}
                        <PublicRouter
                            path="/"
                            component={DashboardRouter}
                            isAuthenticated={isLogged}
                        />
                        <Redirect to="/admin" />
                    </Switch>
                </div>
            </>
        </Router>

    )
}
