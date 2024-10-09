'use client'
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    token:"",
    user:""
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        userregistration:(state,action:PayloadAction<{token:string}>) => {
            state.token= action.payload.token 
        },
        userLoggedIn:(state,action:PayloadAction<{accessToken:string,user:string}>) => {
            state.token = action.payload.accessToken
            state.user  = action.payload.user

        },
        userLoggout:(state) => {
            state.token=""
            state.user = ""
        }
    }
})

export const {userregistration,userLoggedIn,userLoggout} = authSlice.actions   
export default authSlice.reducer