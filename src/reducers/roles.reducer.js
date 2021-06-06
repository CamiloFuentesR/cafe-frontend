import { types } from "../types/types";


const initialState = {
    roles : []
}

export const roleReducer = (state =initialState, action) => {



    switch (action.type) {

        case types.startLoadingRoles :
            let roles = action.payload;
            return {
                ...state,
                roleOption: roles.map(e=> ({label:e.role,value:e.role})),
                roles: [...action.payload]
            }
        default:
            return state;
    }
}