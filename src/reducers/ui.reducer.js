import { types } from "../types/types";

const initialState = {
    isLoading: false,
    successMessage:false
}
export const uiReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.startLoading:
            return {
                isLoading: true,
            }
        case types.endLoading:
            return {
                isLoading: false
            }
        case types.startSuccessMessage: 
            return {
                successMessage: true
            }
        case types.endSuccessMessage: 
            return {
                successMessage: false
            }
        
        default:
            return state;
    }
}