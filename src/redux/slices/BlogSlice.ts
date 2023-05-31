import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import React from "react";
import { Blog } from "../../models/Blog";
import axiosInstance from "../../services/axiosInstance";
import { RootState } from "..";

interface initialStateType {
    loading: 'pending'|'fullfilled'|'rejected'|null,
    blogs:Array<Blog>,
    error:any|null,
    blog:Blog|null,
    theme:'dark'|'light'
}

const initialState:initialStateType={
    loading:null,
    blogs:[],
    error:null,
    blog:null,
    theme:'dark'
}
//GetAll
export const GetAllBlogs = createAsyncThunk('getAll/blogs',async(data,{rejectWithValue})=>{
    try {
        const response  = await axiosInstance.get('blogs')
        return response.data
    } catch (error:any) {
        rejectWithValue(error)
    }
})
//GetId
export const GetById = createAsyncThunk('getById/blogs',async (id:number,{rejectWithValue}) => {
    try {
        const response = await axiosInstance.get(`blogs/${id}`)
        return response.data
    } catch (error:any) {
            rejectWithValue(error.message)
    }
})

//Update
export const UpdateBlog = createAsyncThunk('update/blogs',async (payload:Blog,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.put(`blogs/${payload.id}`,payload)
        return response.data
    } catch (error) {
        
    }
})
//Create
export const CreateBlog = createAsyncThunk('create/blogs',async (blogData:any,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.post('blogs',blogData,)
        return response.data
    } catch (error:any) {
        rejectWithValue(error.message)
    }
})
//Delete
export const DeleteBlog = createAsyncThunk('delete/blogs',async (id:number,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.delete('blogs/'+id)
        return response.data
    } catch (error:any) {
        rejectWithValue(error.message)
    }
})

const blogSlice = createSlice({
    name:'blogs',
    initialState,
    reducers:{
        toggleDarkMode: state =>{
            state.theme = state.theme==='light'?'dark':'light'
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(GetAllBlogs.pending,(state)=>{
            state.loading = 'pending'
        }).addCase(GetAllBlogs.fulfilled,(state,action)=>{
            state.loading='fullfilled',
            state.blogs = action.payload
        }).addCase(GetAllBlogs.rejected,(state,action)=>{
            state.loading = 'rejected',
            state.error=action.payload
        })
        builder.addCase(GetById.pending,(state)=>{
            state.loading = 'pending'
        }).addCase(GetById.fulfilled,(state,action)=>{
            state.loading='fullfilled',
            state.blog = action.payload
        }).addCase(GetById.rejected,(state)=>{
            state.loading = 'rejected'
        })
        builder.addCase(UpdateBlog.pending,(state)=>{
            state.loading = 'pending'
        }).addCase(UpdateBlog.fulfilled,(state,action)=>{
            const newBlogs:Array<Blog> = state.blogs.map(b=>{
                if (b.id == action.payload.id) {
                    b=action.payload
                }
                return b
            })
            state.blogs = newBlogs
            state.blog = action.payload
        })
        builder.addCase(CreateBlog.pending,(state)=>{
            state.loading = 'pending'
        }).addCase(CreateBlog.fulfilled,(state,action)=>{
                state.loading = 'fullfilled';
                state.blogs.push(action.payload)
        }).addCase(CreateBlog.rejected,(state,action)=>{
            state.loading = 'rejected',
            state.error = action.error.message
        })
        builder.addCase(DeleteBlog.pending,(state)=>{
            state.loading = 'pending'
        }).addCase(DeleteBlog.fulfilled,(state,action)=>{
                state.blogs = state.blogs.filter(b=>b.id!=action.payload.id)
        })
    }
})
export const getBlog = (state: RootState) => state.blogSlice.blog
export const {toggleDarkMode} = blogSlice.actions;
export default blogSlice.reducer