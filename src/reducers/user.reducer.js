import { types } from "../types/types";

const initialState = {
    users: [],
    totalUsers: 0,
    userUpdated: []
}
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.startLoadUsers:
            return {
                ...state,
                users: [...action.payload],
            }

        case types.startTotalUsers:
            return {
                ...state,
                totalUsers: action.payload
            }
        case types.startDeleteUser:
            return {
                ...state,
                // users : state.users.map(e=> (e.uid  === action.payload.uid) ? action.payload: e),
                userUpdated: action.payload

            }
        case types.startUpdateUser:
            return {
                ...state,
                users: state.users.map(e => (e.uid === action.payload.uid) ? action.payload : e)
            }
        case types.startLogOut:
            return {
                users: [],
                totalUsers: 0,
                userUpdated: []

            }
        default:
            return state;
    }
}