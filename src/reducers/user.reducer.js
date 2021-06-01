import { types } from "../types/types";

const initialState = {
   users: [],
   totalUsers: 0
}
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.startLoadUsers: 
        return{
            ...state,
            users: [...action.payload],
        }

        case types.startTotalUsers:
            return{
                ...state,
                totalUsers:action.payload
            }
        default:
            return state;
    }
}