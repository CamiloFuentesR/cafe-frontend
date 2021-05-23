import React from 'react'
import { Link } from 'react-router-dom'

export const LoginScreen = () => {
    return (
        <div className="__login">
        <div className="_login_card">
            <div className="_login_title">
                <h1>Login</h1>
            </div>
            <form className="_login_form">
                <div className="_Login_email">
                    {/* <label htmlFor="Email">Email</label> */}
                    <input
                        type="text"
                        name="email"
                        className="_login_label"
                        placeholder="Email"
                    />
                </div>
                <div className="_login_password">
                    {/* <label htmlFor="password">Password</label> */}
                    <input
                        autoComplete="off"
                        type="password"
                        name="password"
                        className="_login_label"
                        placeholder="Password"
                    />
                </div>
                <div className="_login_button">
                    <button>Ingresar</button>
                </div>
                <div className="_login_register">
                    <p>No estas registrado? <Link to="/auth/register">Registrate aqui</Link></p>
                </div>
            </form>
        </div>
    </div>
    )
}
