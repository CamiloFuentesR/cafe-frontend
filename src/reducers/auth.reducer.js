import { types } from "../types/types";

const initialState = {
    isLogged: false,

}
export const authReducer = (state = initialState,action) => {

    switch (action.type) {
        case types.startLogIn:
            return {
                ...state,
                ...action.payload,
                isLogged: true
            }
        case types.startLogOut :
            return {
                isLogged: false
            }
    
        default:
            return state;
    }
}