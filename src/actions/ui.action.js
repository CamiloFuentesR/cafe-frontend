import { types } from "../types/types"


export const startLoading = () => ({
    type: types.startLoading,
    payload: true
})
export const endLoading = () => ({
    type: types.endLoading,
    payload: false
})