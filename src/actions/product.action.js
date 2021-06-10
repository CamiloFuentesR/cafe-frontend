import { clienteAxios } from "../config/axios"
import { types } from "../types/types";


export const startPrudctLoading = () => {
    return async (dispatch) => {
        await clienteAxios.get('/products')
            .then(({ data }) => {
                dispatch(productLoad(data.products))
            })
            .catch(e => console.log(e))
    }
}

const productLoad = (data) => ({
    type: types.startPrudctLoading,
    payload: data

})