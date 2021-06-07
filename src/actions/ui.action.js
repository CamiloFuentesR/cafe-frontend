import { types } from "../types/types"


export const startLoading = () => ({
    type: types.startLoading,
    payload: true
})
export const endLoading = () => ({
    type: types.endLoading,
    payload: false
})

export const startSuccessMessage = () => ({
    type: types.startSuccessMessage,
})
export const endSuccessMessage = () => ({
    type: types.endSuccessMessage
})