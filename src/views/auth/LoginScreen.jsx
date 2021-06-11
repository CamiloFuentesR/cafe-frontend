import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import loginvalidate from '../../validation/formValidate'
import { startLogin, startLoginGoogle } from '../../actions/auth.action'
import useValidation from '../../hooks/useValidation'
import { Load } from '../../components/ui/Load'
import GoogleLogin from 'react-google-login'

const initialValue = {
    email: 'user1@email.com',
    password: 'C123456',
}
export const LoginScreen = () => {

    const { isLoading } = useSelector(state => state.ui)
    // const[formValues,handleInputChange] = useForm(initialValue);
    // const {email,password} = formValues;
    const { valores, errores, handleSubmit, handleChange } = useValidation(initialValue, loginvalidate, handleSubmitLogin)

    const { email, password } = valores;
    const dispatch = useDispatch();

    function handleSubmitLogin(e) {
        // e.preventDefault();
        dispatch(startLogin(valores));
    }

    // login google

    const responseGoogle = (response) => {
        if (response) {
            dispatch(startLoginGoogle(response.tokenId))
        }
    }
    return (
        <>
            <div className="__login">
                {
                    isLoading && <Load />
                }
                <div className="_login_card">
                    <div className="_login_title">
                        <h1>Login</h1>
                    </div>
                    <form
                        className="d-flex-column mt-5 "
                        onSubmit={handleSubmit}
                    >
                        <div className="d-flex-column px-5 col-12">
                            {/* <label htmlFor="Email">Email</label> */}
                            <input
                                autoComplete="off"
                                type="text"
                                name="email"
                                className={`form-control _login_input ${errores.email && 'is-invalid'} `}
                                placeholder="Email"
                                value={email}
                                onChange={handleChange}
                            />
                            {errores.email && <p style={{ color: 'red', fontSize: '14px', marginLeft: '30px', marginBottom: '18px' }}>{errores.email}</p>}
                        </div>
                        <div className="d-flex-column  px-5 mb-4 mt-0 col-12">
                            {/* <label htmlFor="password">Password</label> */}
                            <input
                                autoComplete="off"
                                type="password"
                                name="password"
                                className={`form-control _login_input ${errores.password && 'is-invalid'}`}
                                placeholder="Password"
                                value={password}
                                onChange={handleChange}
                            />
                            {
                                errores.password &&
                                <p style={{ color: 'red', fontSize: '14px', marginLeft: '30px', marginBottom: '28px' }}>{errores.password}</p>
                            }
                        </div>
                        <div className="_login_button mx-3">
                            <GoogleLogin
                                clientId="972085407507-hep118u8486feno87qig2kjn8uelt76v.apps.googleusercontent.com"
                                buttonText="Login"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                            // isSignedIn={true} // devuelve la llamada de onsuccess (osea verifica que este logeado)
                            />
                            <button type="submit">Ingresar</button>
                        </div>
                        <div className="_login_register mt-4 text-center">
                            <p>No estas registrado? <Link to="/auth/register">Registrate aqui</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
