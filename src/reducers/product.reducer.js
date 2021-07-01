import { types } from "../types/types";

const initialState = {
    products: [],
    totalProducts: 0
}

export const productReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.startPrudctLoading:
            return {
                ...state,
                products: [...action.payload]
            }
        case types.startTotalProducts:
            return {
                ...state,
                totalProducts: action.payload
            }
        case types.startUpdateProduct:
            return {
                ...state,
                products: state.products.map(e => (e.pid === action.payload.pid) ? action.payload : e)
            }
        default:
            return state;
    }
}