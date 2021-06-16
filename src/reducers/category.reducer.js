import { types } from "../types/types";



const initialState = {
    categories: [],
    categoryOption: []
}

export const categoryReducer = (state= initialState, action) =>{

    switch (action.type) {
        case types.startCategoryLoad:
            let categeory = action.payload;
            return{
                ...state,
                categories: [...action.payload],
                categoryOption: categeory.map(cat => ({
                    label: cat.name,
                    value: cat.name,
                    _id: cat.cid
                }))
            }
            
    
        default:
            return state;
    }
}