import { clienteAxios } from "../config/axios"
import { types } from "../types/types";


export const startPrudctLoading = (total,from) => {
    return async (dispatch) => {
        await clienteAxios.get(`/products?limit=${total}&from=${from}`)
            .then(({ data }) => {
                dispatch(productLoad(data.products))
                dispatch(totalProducts(data.total))
            })
            .catch(e => console.log(e))
    }
}
export const startSearchPrudctLoading = (value,total,from) => {
    return async (dispatch) => {
        await clienteAxios.get(`/search/products/${value}?limit=${total}&from=${from}`)
            .then(({ data }) => {
                dispatch(productLoad(data.product))
                dispatch(totalProducts(data.total))
            })
            .catch(e => console.log(e))
    }
}

const productLoad = (data) => ({
    type: types.startPrudctLoading,
    payload: data

})

const totalProducts = (data) =>({
    type: types.startTotalProducts,
    payload: data
})