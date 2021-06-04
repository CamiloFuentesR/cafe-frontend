import { clienteAxios } from "../config/axios"
import { types } from "../types/types";



export const startLoadingRoles = () => {
    return async (dispatch) => {

        await clienteAxios.get('/roles')
            .then(({ data }) => {
                dispatch(showRole(data.roles))
            })
            .catch(e=> console.log(e))
    }
}

const showRole = (data) => ({
    type: types.startLoadingRoles,
    payload: data
})