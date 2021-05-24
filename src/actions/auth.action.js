import { clienteAxios } from "../config/axios"
import { types } from "../types/types";
import { authMessage } from "../helpers/errorsMsg";
import { endLoading, startLoading } from "./ui.action";


export const startLogin = (values) => {
    return async (dispatch) => {
        console.log(values)
        try {
            dispatch(startLoading());

            const { data } = await clienteAxios.post('/auth/login', values).catch(e => {
                authMessage(e.response.data)
            });
            localStorage.setItem('token', data.token)
            dispatch(login({
                uid: data.user.uid,
                name: data.user.name
            }))
            dispatch(endLoading());

        } catch (error) {
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
})