import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { startLogin } from '../../actions/auth.action'
import { useForm } from '../../hooks/useForm'

const initialValue = {
    email:'',
    password:'',
}

export const LoginScreen = () => {

    const[formValues,handleInputChange] = useForm(initialValue);
    const {email,password} = formValues;
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(startLogin(formValues));
    }

    return (
        <div className="__login">
            <div className="_login_card">
                <div className="_login_title">
                    <h1>Login</h1>
                </div>
                <form 
                    className="_login_form"
                    onSubmit={handleSubmit}
                >
                    <div className="_Login_email">
                        {/* <label htmlFor="Email">Email</label> */}
                        <input
                            type="text"
                            name="email"
                            className="_login_label"
                            placeholder="Email"
                            value={email}
                            onChange={handleInputChange}
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
                            value={password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="_login_button">
                        <button type="submit">Ingresar</button>
                    </div>
                    <div className="_login_register">
                        <p>No estas registrado? <Link to="/auth/register">Registrate aqui</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
