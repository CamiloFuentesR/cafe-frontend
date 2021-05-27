import {clienteAxios} from '../config/axios'
import {types} from '../types/types'


export const startGetbyCategory = (category) => {
    return async (dispatch) => {
        await clienteAxios.get(`/products`)
        .then(({data}) =>{
            console.log(data.products) 
            dispatch(getByCategory(data.products))    
        } 
        )
        .catch(e=> console.log(e.response))
    }
}

const getByCategory = (menu) => ({
    type:types.startGetbyCategory,
    payload: menu
})