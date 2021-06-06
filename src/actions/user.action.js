import { clienteAxios, clienteAxiosToken, token } from "../config/axios"
import { types } from "../types/types";


export const startLoadUsers = (total, from) => {
    return async (dispatch) => {
        await clienteAxios.get(`/users?limit=${total}&from=${from}`)
            .then(({ data }) => {
                dispatch(loadUsers(data.users))
                dispatch(totalUsers(data.total))
            })
            .catch(e => console.log(e.response));
    }
}

export const startDeleteUser = (user) => {
    return async (dispatch) => {

        try {
            await clienteAxiosToken.delete(`/users/${user.uid}`,{
                headers: {
                    'Content-type': 'application/json',
                    'x-token': token(),
                }
            }).then(({data})=>{
                data.user.state=false
                dispatch(deleteUser(data.user))
            }
            )
                .catch(e => console.log(e.response))

        } catch (error) {
            console.log(error)
        }
    }
}

export const StartUpdateUser = (id, body) => {
    return async (dispatch) => {
        try {
            await clienteAxiosToken.put(`/users/${id}`, body,{
                headers: {
                    'Content-type': 'application/json',
                    'x-token': token(),
                }})
                .then(({ data }) => dispatch(updateUser(data)))
                .catch(e => console.log(e.response))
        } catch (error) {
            console.log(error)
        }
    }
}

const loadUsers = (data) => ({
    type: types.startLoadUsers,
    payload: data
})

const totalUsers = (data) => ({
    type: types.startTotalUsers,
    payload: data
})
const updateUser = (data) => ({
    type: types.startUpdateUser,
    payload:data
})
const deleteUser = (id) => ({
    type: types.startDeleteUser,
    payload: id
})