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
                console.log('search product');
                console.log(data);
                dispatch(productLoad(data.product))
                dispatch(totalProducts(data.total))
            })
            .catch(e => console.log(e))
    }
}
export const startSearchProductByCategoryLoading = (value, total, from) => {
    return async (dispatch) => {
        await clienteAxios.get(`/search/productsByCategory/${value}?limit=${total}&from=${from}`)
            .then(({ data }) => {
                console.log('search by category');
                console.log(data.results);
                dispatch(productLoad(data.results.products))
                dispatch(totalProducts(data.results.total))
            })
            .catch(e => console.log(e.response))
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