import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'

const initialValue = {
    name:'',
    email:'',
    password:'',
    password2:''
}

export const RegisterScreen = () => {

    const [formValues,handleInputChange] = useForm(initialValue)
    const {name,email,password,password2} = formValues;
    console.log(formValues);
    return (
        <div className="__login">
            <div className="_login_card">
                <div className="_login_title">
                    <h1>Registro</h1>
                </div>
                <form className="_login_form">
                    <div className="_Login_email">
                        {/* <label htmlFor="Email">Email</label> */}
                        <input
                            autoComplete="off"
                            type="text"
                            className="_login_label"
                            name="name"
                            placeholder="Name"
                            value={name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="_Login_email">
                        {/* <label htmlFor="Email">Email</label> */}
                        <input
                            autoComplete="off"
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
                    <div className="_login_password">
                        {/* <label htmlFor="password">Password</label> */}
                        <input
                            autoComplete="off"
                            type="password"
                            name="password2"
                            className="_login_label"
                            placeholder="Confirmar Password"
                            value={password2}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="_login_button">
                        <button>Ingresar</button>
                    </div>
                    <div className="_login_register">
                        <p>¿Ya estas registrado? <Link to="/auth/login">Iniciar Sesión</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
