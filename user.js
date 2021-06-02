import { clienteAxios, clienteAxiosToken } from "../config/axios"
import { types } from "../types/types";


export const startLoadUsers = (total, from) => {
    return async (dispatch) => {
        await clienteAxios.get(`http://localhost:4000/api/users?limit=${total}&from=${from}`)
            .then(({ data }) => {
                dispatch(loadUsers(data.users))
                dispatch(totalUsers(data.total))
            })
            .catch(e => console.log(e));
    }
}

export const startDeleteUser = (id) => {
    return async (dispatch) => {

        try {
            await clienteAxiosToken.delete(`/users/${id}`).then(
                dispatch(deleteUser(id))
            )
                .catch(e => console.log(e))

        } catch (error) {
            console.log(error)
        }
    }
}

export const StartUpdateUser = (id, body) => {
    return async (dispatch) => {
        console.log(body)
        try {
            await clienteAxiosToken.put(`http://localhost:4000/api/users/${id}`, body)
                .then(({ data }) => console.log(data))
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

const deleteUser = (id) => ({
    type: types.startDeleteUser,
    payload: id
})