import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

interface SaveItemsState {
    savedItems:any[],
    loading:boolean,
    error:null
}

const initialState:SaveItemsState={
    savedItems:[],
    loading:false,
    error:null
}

export const saveItemsSlice=createSlice({
    name:"saveItemsSlice",
    initialState:initialState,
    reducers:{
        addSavedItem:(state,action)=>{
            state.savedItems.push(action.payload)

        },
        removeSavedItem:(state,action)=>{
            state.savedItems = state.savedItems.filter(s=>s.id !==action.payload)
        },
        clearSavedItems:state=>{
            state.savedItems = []
        }
    }
})

export const {addSavedItem,removeSavedItem,clearSavedItems} = saveItemsSlice.actions

export default saveItemsSlice.reducer