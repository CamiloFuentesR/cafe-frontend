import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { startLogout } from '../../actions/auth.action'

export const NavBar = () => {
const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(startLogout())
    }

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
                    <div className="_nav">
                      <button 
                        className="btn btn-warning"
                        onClick={handleLogout}
                      >logout</button>
                    </div>
            </div>
        </nav>
    )
}
