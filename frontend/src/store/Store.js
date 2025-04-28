import { configureStore } from "@reduxjs/toolkit";
import AppContextSlice from '../features/AppContextSlice'

export const store = configureStore({
    reducer:{
        appContext: AppContextSlice
    }
})