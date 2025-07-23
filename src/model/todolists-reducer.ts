import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";
import { TFilter, TTodolist } from "../app/App";

//Action creators

export const deleteTodolistAC = createAction<{id: string}>('todolists/deleteTodolist')

export const createTodolistAC = createAction('todolists.createTodolist', (title: string) => {
    return { payload: {id: nanoid(), title} }
})

export const changeTodolistTitleAC = createAction<{id: string, title: string}>('todolists/changeTodolistTitle');

export const changeTodolistFilterAC = createAction<{id: string, filter: TFilter}>('todolists/changeTodolistFilter');

//Initial state
const initialState: TTodolist[] = [];

export const todolistsReducer = createReducer(initialState, (builder) =>  { 
    builder.

    addCase(deleteTodolistAC, (state, action) => {
        const index = state.findIndex(todolist => todolist.id === action.payload.id)
        if(index !== -1) state.splice(index, 1);
    })
    .addCase(createTodolistAC, (state, action) => {
        const newTodolist: TTodolist = {
            id: action.payload.id,
            title: action.payload.title,
            filter: 'all'
        }
        state.push(newTodolist);
    })
    .addCase(changeTodolistTitleAC, (state, action) => {
        const todolist = state.find(todolist => todolist.id === action.payload.id);
        if (todolist) todolist.title = action.payload.title;
    })
    .addCase(changeTodolistFilterAC, (state, action) => {
        const todolist = state.find(todolist => todolist.id === action.payload.id);
        if (todolist) todolist.filter = action.payload.filter;
    })
})