import React from 'react'
import { NavLink } from 'react-router-dom'

export const NavBar = () => {
    return (
        <div>
            <nav>
                <NavLink
                    activeClassName="active"
                    to="/"
                >Home</NavLink>
                <NavLink
                    activeClassName="active"
                    to="/auth/login"
                >Login</NavLink>
                <NavLink
                    activeClassName="active"
                    to="/auth/register"
                >Register</NavLink>
             
            </nav>
        </div>
    )
}
