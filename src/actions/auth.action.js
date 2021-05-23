import { clienteAxios } from "../config/axios"
import { types } from "../types/types";
import { authMessage } from "../helpers/errorsMsg";


export const startLogin = (values) => {
    return async (dispatch) => {
        console.log(values)
        try {
            const {data} = await clienteAxios.post('/auth/login',values).catch(e=>{
                authMessage(e.response.data)
            });
            localStorage.setItem('token',data.token)
            dispatch(login({
                uid:data.user.uid,
                name: data.user.name
            }))            
        } catch (error) {
            console.log(error)
        }
    }
}

export const startLogout = () => {
    localStorage.clear('token')
}

const login = (data) => ({
    type: types.startLogIn,
    payload: data
});