import { types } from "../types/types";


const initialState = {
    roles : []
}

export const roleReducer = (state =initialState, action) => {



    switch (action.type) {

        case types.startLoadingRoles :
            return {
                ...state,
                roles: [...action.payload]
            }
        default:
            return state;
    }
}