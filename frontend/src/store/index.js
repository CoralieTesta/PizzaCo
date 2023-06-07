import {configureStore} from "@reduxjs/toolkit"
import {cartSlice} from "./cart-slice"
import { adminSlice } from "./admin-slice"
import { orderSlice } from "./order-slice"

const store = configureStore({
    reducer:{
        CART:cartSlice.reducer,
        ADMIN:adminSlice.reducer,
        ORDER:orderSlice.reducer
    },
})

export { store }