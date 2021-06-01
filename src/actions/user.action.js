import { clienteAxios } from "../config/axios"
import { types } from "../types/types";


export const startLoadUsers = (total,from) => {
    return async (dispatch) => {
            await clienteAxios.get(`/users?limit=100`)
                .then(({ data }) => {
                    dispatch(loadUsers(data.users))
                    dispatch(totalUsers(data.total))
                })
                .catch(e => console.log(e));
      
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