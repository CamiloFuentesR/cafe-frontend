<nav className="navbar navbar-expand-sm navbar-dark bg-dark abc ">
      
            <div className="navbar-nav nav12">
                <NavLink
                    className="nav-item nav-link"
                    exact
                    to="/"
                >
                    Marvel
            </NavLink>
                <NavLink
                    className="nav-item nav-link"
                    exact
                    to="/auth/login"
                >
                    DC
            </NavLink>
                <NavLink
                    className="nav-item nav-link"
                    exact
                    to="/auth/register"
                >
                    Search
            </NavLink>

                {/*  <div className="navbar-collapse   order-3 dual-collapse2 nav2">
            <ul className="navbar-nav ml-auto nav3 "> */}
                <span className="nav-item nav-link text-info name">
                </span>
                <button
                    className="nav-item nav-link btn btn-outline-dark logout btn1"
                >
                    Logout
            </button>
                {/*     </ul>
        </div> */}
            </div>
    </nav>