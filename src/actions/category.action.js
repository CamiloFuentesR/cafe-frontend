import { clienteAxios } from "../config/axios"
import { types } from "../types/types"




export const startCategoryLoad = () =>{
    return async(dispatch) =>{
        try {
            await clienteAxios.get('/categories')
                .then(({data})=>{
                    dispatch(categoryLoad(data.categories))
                })
                .catch(e=> console.log(e))
        } catch (error) {
            console.log(error)
        }

    }
}

const categoryLoad = (data)=> ({
    type:types.startCategoryLoad,
    payload: data
})