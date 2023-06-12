import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pizzaListMenu: [],
    pastaListMenu: [],
    dessertListMenu:[]
};

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setPizzaListMenu: (currentState, action) => {
            console.log("pay",action.payload)
            currentState.pizzaListMenu = action.payload
        },
        setPastaListMenu: (currentState, action) => {
            currentState.pastaListMenu = action.payload.pastaList
        },
        setDessertListMenu: (currentState, action) => {
            currentState.dessertListMenu = action.payload.dessertList
        }
    }
})

export const {setPizzaListMenu, setPastaListMenu, setDessertListMenu} = menuSlice.actions
export const menuReducer = menuSlice.reducer