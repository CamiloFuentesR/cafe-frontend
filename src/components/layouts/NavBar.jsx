import React from 'react'
import { NavLink } from 'react-router-dom'

export const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark justify-content-between ">
            <div className="navbar-nav ">

                <div className="">
                    <NavLink
                        focus="false"
                        activeClassName="active"
                        className=" nav-link  "
                        to="/home"
                    >Home</NavLink>

                </div>
                <div className="_nav_r">
                    <div className="">
                        <NavLink
                             activeClassName="active"
                            className=" nav-link  "
                            to="/auth/login"
                        >Login</NavLink>
                    </div>
                    <div className="_nav">
                        <NavLink
                             activeClassName="active"
                            className=" nav-link  "
                            to="/auth/register"
                        >Register</NavLink>

                    </div>
                </div>
            </div>
        </nav>
    )
}
