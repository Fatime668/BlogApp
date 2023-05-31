import { configureStore } from "@reduxjs/toolkit";
import BlogSlice  from '../redux/slices/BlogSlice'
import SaveSlice from "../redux/slices/SaveSlice";

const store = configureStore({
    reducer:{
        blogSlice:BlogSlice,
        saveSlice:SaveSlice
    }
})

export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>