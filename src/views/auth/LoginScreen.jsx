import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import loginvalidate from '../../validation/formValidate'
import { startLogin } from '../../actions/auth.action'
import useValidation from '../../hooks/useValidation'
import { Load } from '../../components/ui/Load'

const initialValue = {
    email:'user1@email.com',
    password:'C123456',
}
export const LoginScreen = () => {
    
    const {isLoading} = useSelector(state => state.ui)
    // const[formValues,handleInputChange] = useForm(initialValue);
    // const {email,password} = formValues;
    const { valores, errores, handleSubmit, handleChange } = useValidation(initialValue, loginvalidate,handleSubmitLogin)
    
    const { email, password } = valores;
    const dispatch = useDispatch();

    function handleSubmitLogin  (e) {
        // e.preventDefault();
        dispatch(startLogin(valores));
    }
    console.log(isLoading);
    return (
        <>
        <div className="__login">
        {
            isLoading && <Load/>
        }
            <div className="_login_card">
                <div className="_login_title">
                    <h1>Login</h1>
                </div>
                <form 
                    className="_login_form"
                    onSubmit={handleSubmit}
                >
                    <div className="_Login_div mt-2">
                        {/* <label htmlFor="Email">Email</label> */}
                        <input
                        autoComplete="off"
                            type="text"
                            name="email"
                            className={`form-control _login_input ${errores.email && 'is-invalid'}` }
                            placeholder="Email"
                            value={email}
                            onChange={handleChange}
                        />
                        {errores.email && <p style={{color:'red',fontSize: '14px'}}>{errores.email}</p>}
                    </div>
                    <div className="_Login_div">
                        {/* <label htmlFor="password">Password</label> */}
                        <input
                            autoComplete="off"
                            type="password"
                            name="password"
                            className={`form-control _login_input ${errores.password && 'is-invalid'}` }
                            placeholder="Password"
                            value={password}
                            onChange={handleChange}
                        />
                        {
                        errores.password 
                        ? <p style={{color:'red',fontSize: '14px'}}>{errores.password}</p>
                        : <p></p>
                        } 
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
        </>
    )
}
