import React from 'react'
import { NavLink } from 'react-router-dom'

export const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark  justify-content-between sticky-top ">
            <div className="navbar-nav  ">

                <div className="">
                    <NavLink
                        focus="false"
                        activeClassName="active"
                        className=" nav-link  "
                        to="/home"
                    >Home</NavLink>

                </div>
                </div>
                <div className="_nav_r navbar-nav">
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
        </nav>
    )
}
