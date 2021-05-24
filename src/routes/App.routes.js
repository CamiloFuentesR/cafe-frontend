import React from "react";
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import { PrivateRouter } from "./Private.routes";
import { PublicRouter } from "./Public.routes";
import { DashboardRouter } from "./Dashboard.routes";

import { NavBar } from "../components/layouts/NavBar";
import { AuthorizedRouter } from "./Authorized.routes";
import { useSelector } from "react-redux";

export const AppRouter = () => {
    const {isLogged} = useSelector(state => state.root)
    // const dispatch = useDispatch();

    // useEffect(() => {

    // }, [dispatch])
  
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
                    </Switch>

                </div>
            </>
        </Router>

    )
}
