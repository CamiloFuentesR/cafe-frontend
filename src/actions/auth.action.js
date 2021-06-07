import { clienteAxios, clienteAxiosToken, token } from "../config/axios"
import { types } from "../types/types";
import { authMessage } from "../helpers/errorsMsg";
import { endLoading, startLoading } from "./ui.action";


export const startLogin = (values) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            await clienteAxios.post('/auth/login', values)
                .then(({ data }) => {
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('token-init-date', new Date().getTime());
                    dispatch(login({
                        uid: data.user.uid,
                        name: data.user.name,
                        role: data.user.role,
                        google: data.user.google
                    }));
                    dispatch(endLoading());
                })
                .catch(e => {
                    authMessage(e.response.data)
                    dispatch(endLoading());
                });
        } catch (error) {
            console.log(error)
            dispatch(endLoading());
        }
    }
}
export const startLoginGoogle = (id_token) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            await clienteAxios.post("/auth/google", { id_token })
                .then(( {data} ) => {
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('token-init-date', new Date().getTime());
                    dispatch(login({
                        uid: data.user.uid,
                        name: data.user.name,
                        role: data.user.role,
                        google: data.user.google
                    }))
                    dispatch(endLoading());
                })
                .catch(e => {
                    console.log(e)
                    authMessage(e.response.data)
                    dispatch(endLoading());
                })
        } catch (error) {
            dispatch(endLoading());
            console.log(error)
        }
    }
}
export const startRegisgter = (values) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            await clienteAxios.post('/users', values)
                .then(({ data }) => {
                    console.log(data)
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('token-init-date', new Date().getTime());
                    dispatch(login({
                        uid: data.user.uid,
                        name: data.user.name
                    }));
                    dispatch(endLoading());
                })
                .catch(e => {
                    authMessage(e.response.data)
                    dispatch(endLoading());
                });

        } catch (error) {
            console.log(error)
        }
    }
}

export const startChecking = () => {
    return async (dispatch) => {
        const isCurrentToken = !!token() || '';
        if (!isCurrentToken) {
            dispatch(checkingFinish());
            return;
        }

        await clienteAxiosToken.get('/auth/renew')
            .then(({ data }) => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('token-init-date', new Date().getTime());
                // setTimeout(() => {
                //     dispatch(startLogout())
                //     Swal.fire('Fin de la sesión', `'Su Sesión ha expirado`, 'warning')
                // }, 600000);
                dispatch(login({
                    uid: data.uid,
                    name: data.name,
                    role: data.role
                }));
                dispatch(checkingFinish());
            })

            .catch(({ response: { data: { msg } } }) => {
                dispatch(checkingFinish());
            });
    }
}

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear('token')
        dispatch(logout())
    }
}

const login = (data) => ({
    type: types.startLogIn,
    payload: data
});

const logout = () => ({
    type: types.startLogOut
});

const checkingFinish = () => ({
    type: types.authCheckingFinish
});