import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pizzaListMenu: [],
    pastaListMenu: [],
    dessertListMenu:[],
    isPizzaListDefined: false,
    isPastaListDefined: false,
    isDessertListDefined: false
};

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setPizzaListMenu: (currentState, action) => {
            currentState.pizzaListMenu = action.payload
        },
        setPastaListMenu: (currentState, action) => {
            currentState.pastaListMenu = action.payload
        },
        setDessertListMenu: (currentState, action) => {
            currentState.dessertListMenu = action.payload
        }
    }
})

export const {setPizzaListMenu, setPastaListMenu, setDessertListMenu} = menuSlice.actions
export const menuReducer = menuSlice.reducer