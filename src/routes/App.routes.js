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
                        <PrivateRouter

                            path="/logged"
                            component={AuthorizedRouter}
                            isAuthenticated={isLogged}
                        />
                        <PublicRouter
                            path="/"
                            component={DashboardRouter}
                            isAuthenticated={isLogged}

                        />
                        <Redirect to="/logged/user" />
                    </Switch>

                </div>
            </>
        </Router>

    )
}
