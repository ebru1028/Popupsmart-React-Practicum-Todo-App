import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit"
import axios from 'axios';

const adapter = createEntityAdapter();

export const getAllTodos = createAsyncThunk('todos/getTodos', async () => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`);
    return res.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`,data);
    return res.data;
});

export const updateTodoStatus = createAsyncThunk('todos/updateStatusTodo', async (id) => {
    const res = await axios.put(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`);
    return res.data;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (data) => {
    const res = await axios.put(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${data.id}`, data);
    return res.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
    const res = await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`);
    return res.data;
});

const todoSlice = createSlice({
    name:"todo",
    initialState: adapter.getInitialState(),
    reducers: {
    },

    extraReducers:{
        [getAllTodos.fulfilled]:(state,action) => {
            state.todos = action.payload;
        },
        [addTodo.fulfilled]:(state,action) => {
            state.todos.push(action.payload);
        },
        [updateTodoStatus.fulfilled]:(state,action) => {
            const {id} = action.payload;
            const item = state.todos.find(item =>item.id === id);
            item.status = !item.status;
        },
        [updateTodo.fulfilled]:(state,action) => {
            const {id} = action.payload;
            const item = state.todos.find(item =>item.id === id);
            
            item.title = action.payload.title;
            item.status = action.payload.status;
        },
        [deleteTodo.fulfilled]:(state,action) => {
            const {id} = action.payload;
            state.todos = state.todos.filter(item =>item.id !== id)
        },
    }
})

export default todoSlice.reducer;