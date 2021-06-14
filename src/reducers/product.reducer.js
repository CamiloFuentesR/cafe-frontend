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
                totalProducts:action.payload
            }
        default:
            return state;
    }
}