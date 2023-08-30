import {configureStore} from "@reduxjs/toolkit"
import {cartSlice} from "./cart-slice"
import { adminSlice } from "./admin-slice"
import { orderSlice } from "./order-slice"
import { menuSlice } from "./menu-slice"
import { bookingSlice } from "./booking-slice"

const store = configureStore({
    reducer:{
        CART:cartSlice.reducer,
        ADMIN:adminSlice.reducer,
        ORDER:orderSlice.reducer,
        MENU:menuSlice.reducer,
        BOOKING:bookingSlice.reducer,
    },
})

export { store }