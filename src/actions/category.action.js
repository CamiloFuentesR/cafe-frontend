import { clienteAxios } from "../config/axios"
import { types } from "../types/types"

export const startCategoryLoad = () => {
    return async (dispatch) => {
        try {
            await clienteAxios.get('/categories')
                .then(({ data }) => {
                    dispatch(categoryLoad(data.categories))
                })
                .catch(e => console.log(e))
        } catch (error) {
            console.log(error)
        }

    }
}
export const startSearchCategoryLoading = (value, total, from) => {
    return async (dispatch) => {
        await clienteAxios.get(`/search/productsByCategory/${value}?limit=${total}&from=${from}`)
            .then(({ data }) => {
                console.log(data);
                // dispatch(categoryLoad(data.product))
                // dispatch(totalProducts(data.total))
            })
            .catch(e => console.log(e))
    }
}

const categoryLoad = (data) => ({
    type: types.startCategoryLoad,
    payload: data
})


// const totalCategory = (data) => ({
//     type: types.startTotalProducts,
//     payload: data
// })