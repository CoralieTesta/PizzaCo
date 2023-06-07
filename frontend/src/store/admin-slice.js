import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnect:false,
  token:''
};

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setConnect: (currentState) => {
            currentState.isConnect = true
            localStorage.setItem("admin", JSON.stringify(currentState))
        },
        setNotConnect: (currentState) => {
            currentState.isConnect = false
            currentState.token =""
            localStorage.setItem("admin", JSON.stringify(currentState))
        },
        setToken: (currentState, action) => {
            currentState.token = action.payload.token
            localStorage.setItem("admin", JSON.stringify(currentState))
        }
    }
})

export const {setConnect, setNotConnect, setToken} = adminSlice.actions
export const adminReducer = adminSlice.reducer