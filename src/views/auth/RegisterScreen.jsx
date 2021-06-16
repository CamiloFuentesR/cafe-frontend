import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { startRegisgter } from '../../actions/auth.action'
import useValidation from '../../hooks/useValidation'
import  { registerValidate } from '../../validation/formValidate'
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';

const initialValue = {
    name: '',
    email: '',
    password: '',
    password2: ''
}

export const RegisterScreen = () => {

    // const [formValues,handleInputChange] = useForm(initialValue)
    // const {name,email,password,password2} = formValues;

    const { formValues, errores, handleSubmit, handleChange } = useValidation(initialValue, registerValidate, handleSubmitRegister)
    const { name, email, password, password2 } = formValues;
    const dispatch = useDispatch();

    function handleSubmitRegister() {
        dispatch(startRegisgter(formValues))
    }
    const footer = (
        <>
            <Divider />
            <p className="p-mt-2">La contraseña debe</p>
            <ul className="p-pl-2 p-ml-2 p-mt-0" style={{lineHeight: '1.5'}}>
                <li>Tener al menos 1 mayúscula</li>
                <li>Tener al menos 6 caractéres</li>
                <li>Contener al menos 1 numero</li>
            </ul>
        </>
    );
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
                        {errores.name && <p style={{ color: 'red', fontSize: '14px', marginLeft: '30px' }}>{errores.name}</p>}
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
                        {errores.email && <p style={{ color: 'red', fontSize: '14px', marginLeft: '30px'}}>{errores.email}</p>}
                    </div>
                    <div className="_login_div">
                        {/* <label htmlFor="password">Password</label> */}
                        <Password
                            autoComplete="off"
                            type="password"
                            name="password"
                            className={` form-control a ${errores.password && 'is-invalid'} mt-2 mb-2`}
                            placeholder="Password"
                            value={password}
                            onChange={handleChange}
                            footer={footer}
                            toggleMask={errores.password ? false : true}
                        />
                        {errores.password && <p style={{ color: 'red', fontSize: '14px' }}>{errores.password}</p>}
                    </div>
                    <div className="_login_div">
                        {/* <label htmlFor="password">Password</label> */}
                        <Password
                            autoComplete="off"
                            type="password"
                            name="password2"
                            className={` form-control a ${errores.password2 && 'is-invalid'} mt-2`}
                            placeholder="Confirmar Password"
                            value={password2}
                            onChange={handleChange}
                            toggleMask={errores.password ? false : true}
                        />
                        {errores.password2 && <p style={{ color: 'red', fontSize: '14px', marginLeft: '30px',marginBottom: '20px' }}>{errores.password2}</p>}
                    </div>
                    <div className="_login_button">
                        <button>Ingresar</button>
                    </div>
                    <div className="_register text-center mt-3">
                        <p>¿Ya estas registrado? <Link to="/auth/login">Iniciar Sesión</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
