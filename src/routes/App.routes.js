import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import { PrivateRouter } from "./Private.routes";
import { PublicRouter } from "./Public.routes";
import { DashboardRouter } from "./Dashboard.routes";

import { NavBar } from "../components/layouts/NavBar";
import { AuthorizedRouter } from "./Authorized.routes";

export const AppRouter = () => {
    const [logged] = useState(false)

    return (
        <Router>
            <>
                <NavBar />
                <div>
                    <Switch>
                        <PrivateRouter

                            path="/logged"
                            component={AuthorizedRouter}
                            isAuthenticated={logged}
                        />
                        <PublicRouter
                            path="/"
                            component={DashboardRouter}
                            isAuthenticated={logged}

                        />
                    </Switch>

                </div>
            </>
        </Router>

    )
}
