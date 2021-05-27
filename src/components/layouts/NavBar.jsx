import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { startLogout } from '../../actions/auth.action'
import { GoogleLogout } from 'react-google-login';


export const NavBar = () => {

    const { isLoading } = useSelector(state => state.ui)
    const { isLogged, google } = useSelector(state => state.root)
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(startLogout())
    }
    return (
        <nav className={`navbar navbar-expand-sm justify-content-between sticky-top ${isLoading && 'cargandoNav'}  `}>
            <div className="navbar-nav  ">

                <div className="navbar-nav ">
                    <NavLink
                        focus="false"
                        className=" nav-link "
                        to="/home"
                    >Home</NavLink>

                </div>
            </div>
            <div className="_nav_r navbar-nav">
                {
                    !isLogged &&
                    <>
                        <div className="">
                            <NavLink
                                className="nav-link  "
                                to="/auth/login"
                            >Login</NavLink>
                        </div>
                        <div className="_nav">
                            <NavLink
                                className="nav-link  "
                                to="/auth/register"
                            >Register</NavLink>

                        </div>

                    </>
                }
                {
                    isLogged &&

                    <>{
                        // !google &&
                        <div className="_nav">
                            <button
                                className="btn btn-warning"
                                onClick={handleLogout}
                            >logout</button>
                        </div>
                    }
                        {/* {google &&
                            <GoogleLogout
                                clientId="972085407507-hep118u8486feno87qig2kjn8uelt76v.apps.googleusercontent.com"
                                buttonText="Logout"
                                onLogoutSuccess={handleLogout}
                            />
                        } */}
                    </>
                }
            </div>
        </nav>
    )
}
