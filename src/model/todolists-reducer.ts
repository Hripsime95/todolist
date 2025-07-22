import { TFilter, TTodolist } from "../App";
import { v1 } from 'uuid';

//Action criators

export const deleteTodolistAC = (id: string) => {
  return {type: 'delete_todolist', payload: { id }} as const;
}

export const createTodolistAC = (title: string) => {
    return {type: 'create_todolist', payload: {id: v1(), title}} as const;
}

export const changeTodolistTitleAC = (todo : {id: string, title: string}) => {
    const {id, title} = todo;
    return {type: 'change_todolist_title', payload: {id, title}} as const;
}

export const changeTodolistFilterAC = (todo: {id: string, filter: TFilter}) => {
    const {id, filter} = todo;
    return {type: 'change_todolist_filter', payload: {id, filter}} as const;
}

//Action types

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>

type TAction = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction | ChangeTodolistFilterAction

//Initial state
const initialState: TTodolist[] = [{
                id: '123456',
                title: 'esim',
                filter: 'all'
            }];

export const todolistsReducer = (state: TTodolist[] = initialState, action: TAction): TTodolist[] =>  {    
    switch(action.type){
        case 'delete_todolist': {
            return state.filter((tl) => tl.id !== action.payload.id)
        }
        case 'create_todolist': {
            const newTodolist: TTodolist = {
                id: action.payload.id,
                title: action.payload.title,
                filter: 'all'
            }
            return [...state, newTodolist]
        }
        case 'change_todolist_title': {
            return state.map((tl) => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        }
        case 'change_todolist_filter': {
            return state.map((tl) => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        }
        default:
            return state;
    }
}