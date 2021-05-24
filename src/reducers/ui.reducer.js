import { types } from "../types/types";

const initialState = {
    isLoading: false,
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
        default:
            return state;
    }
}