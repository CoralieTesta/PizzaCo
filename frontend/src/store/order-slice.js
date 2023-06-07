import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderId: "",
    isOrderDone: false
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrder: (currentState, action) => {
            currentState.orderId = action.payload.orderId
            currentState.isOrderDone = true
        }
    }
})

export const {setOrder, increaseOrdersNumber} = orderSlice.actions
export const orderReducer = orderSlice.reducer