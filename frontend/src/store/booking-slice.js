import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    numberPeople: 0,
    chosenDate: new Date(),
    time: "",
    name: "",
    surname: "",
    email: "",
    tel: "",
};

export const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        setNumberPeople: (currentState, action) => {
            console.log(action.payload)
            currentState.numberPeople = Number(action.payload)
        },
        setChosenDate: (currentState, action) => {
            currentState.chosenDate = action.payload
        },
        setTime: (currentState, action) => {
            currentState.time = action.payload
        },
        setName: (currentState, action) => {
            currentState.name = action.payload
        },
        setSurname: (currentState, action) => {
            currentState.surname = action.payload
        },
        setEmail: (currentState, action) => {
            currentState.email = action.payload
        },
        setTel: (currentState, action) => {
            currentState.tel = action.payload
        },
    }
})

export const {setNumberPeople, setChosenDate, setTime, setName, setSurname,setEmail, setTel} = bookingSlice.actions
export const bookingReducer = bookingSlice.reducer