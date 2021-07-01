import { clienteAxios, token } from "../config/axios"
import { types } from "../types/types";

export const startPrudctLoading = (total, from) => {
    return async (dispatch) => {
        await clienteAxios.get(`/products?limit=${total}&from=${from}`)
            .then(({ data }) => {
                dispatch(productLoad(data.products))
                dispatch(totalProducts(data.total))
            })
            .catch(e => console.log(e))
    }
}
export const startSearchPrudctLoading = (value, total, from) => {
    return async (dispatch) => {
        await clienteAxios.get(`/search/products/${value}?limit=${total}&from=${from}`)
            .then(({ data }) => {
                dispatch(productLoad(data.product))
                dispatch(totalProducts(data.total))
            })
            .catch(e => console.log(e))
    }
}
export const startPrudctUpdate = (id, data) => {
    return async (dispatch) => {
        await clienteAxios.put(`/products/${id}`, data, {
            headers: {
                'Content-type': 'application/json',
                'x-token': token()
            }
        })
            .then(({ data }) => {
                dispatch(productUpdate(data.updatedProduct))
            })
            .catch(e => console.log(e.response))
    }
}

const productLoad = (data) => ({
    type: types.startPrudctLoading,
    payload: data

})

const totalProducts = (data) => ({
    type: types.startTotalProducts,
    payload: data
})

const productUpdate = (data) => ({
    type: types.startUpdateProduct,
    payload: data
})