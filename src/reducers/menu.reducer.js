import { types } from "../types/types";

const initialState = {
    menu: [],
}

export const menuReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.startGetbyCategory:
            return {
                ...state,
                menu: [...action.payload]
            }

        default: 
            return state;
    }

}