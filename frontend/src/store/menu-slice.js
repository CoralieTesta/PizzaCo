import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pizzaListMenu: [],
    pastaListMenu: [],
    dessertListMenu:[],
    selectedPizza: {},
    selectedPasta: {},
    selectedDessert: {}
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
        }, 
        setSelectedPizza: (currentState, action) => {
            currentState.pizzaListMenu.forEach((pizza) =>{
                if(pizza._id === action.payload) {
                    currentState.selectedPizza = pizza
                    return 
                }
            })
        },
        setSelectedPasta: (currentState, action) => {
            currentState.pastaListMenu.forEach((pasta) =>{
                if(pasta._id === action.payload) {
                    currentState.selectedPasta = pasta
                    return 
                }
            })
        },
        setSelectedDessert: (currentState, action) => {
            currentState.dessertListMenu.forEach((dessert) =>{
                if(dessert._id === action.payload) {
                    currentState.selectedDessert = dessert
                    return 
                }
            })
        }
    }
})

export const {setPizzaListMenu, setPastaListMenu, setDessertListMenu, 
    setSelectedPizza, setSelectedPasta, setSelectedDessert} = menuSlice.actions
export const menuReducer = menuSlice.reducer