import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { startRegisgter } from '../../actions/auth.action'
import useValidation from '../../hooks/useValidation'
import  { registerValidate } from '../../validation/formValidate'

const initialValue = {
    name: '',
    email: '',
    password: '',
    password2: ''
}

export const RegisterScreen = () => {

    // const [formValues,handleInputChange] = useForm(initialValue)
    // const {name,email,password,password2} = formValues;

    const { valores, errores, handleSubmit, handleChange } = useValidation(initialValue, registerValidate, handleSubmitRegister)
    const { name, email, password, password2 } = valores;
    const dispatch = useDispatch();

    function handleSubmitRegister() {
        dispatch(startRegisgter(valores))
    }

    return (
        <div className="__login">
            <div className="_register_card">
                <div className="_login_title">
                    <h1>Registro</h1>
                </div>
                <form
                    className="_login_form"
                    onSubmit={handleSubmit}
                >
                    <div className="_Login_div mt-4">
                        {/* <label htmlFor="Email">Email</label> */}
                        <input
                            autoComplete="off"
                            type="text"
                            className={`_login_input form-control ${errores.name && 'is-invalid'}`}
                            name="name"
                            placeholder="Name"
                            value={name}
                            onChange={handleChange}
                        />
                        {errores.name && <p style={{ color: 'red', fontSize: '14px' }}>{errores.name}</p>}
                    </div>
                    <div className="_Login_div">
                        {/* <label htmlFor="Email">Email</label> */}
                        <input
                            autoComplete="off"
                            type="text"
                            name="email"
                            className={`_login_input form-control ${errores.email && 'is-invalid'}`}
                            placeholder="Email"
                            value={email}
                            onChange={handleChange}
                        />
                        {errores.email && <p style={{ color: 'red', fontSize: '14px' }}>{errores.email}</p>}
                    </div>
                    <div className="_login_div">
                        {/* <label htmlFor="password">Password</label> */}
                        <input
                            autoComplete="off"
                            type="password"
                            name="password"
                            className={`_login_input form-control ${errores.password && 'is-invalid'}`}
                            placeholder="Password"
                            value={password}
                            onChange={handleChange}
                        />
                        {errores.password && <p style={{ color: 'red', fontSize: '14px' }}>{errores.password}</p>}
                    </div>
                    <div className="_login_div">
                        {/* <label htmlFor="password">Password</label> */}
                        <input
                            autoComplete="off"
                            type="password"
                            name="password2"
                            className={`_login_input form-control ${errores.password2 && 'is-invalid'}`}
                            placeholder="Confirmar Password"
                            value={password2}
                            onChange={handleChange}
                        />
                        {errores.password2 && <p style={{ color: 'red', fontSize: '14px' }}>{errores.password2}</p>}
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
