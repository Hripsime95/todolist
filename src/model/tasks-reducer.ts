import { v1 } from 'uuid';
import type {TTasks} from '../app/App'
import { CreateTodolistAction, DeleteTodolistAction } from './todolists-reducer'

//Action creators

export const deleteTaskAC = (props : {todolistId: string, taskId: string}) => {
    const {todolistId, taskId} = props;
    return {type: 'delete_task', payload: { todolistId, taskId }} as const;
}

export const createTaskAC = (props: {todolistId: string, name: string}) => {
    const {todolistId, name} = props;
    const taskId = v1();
    return {type: 'create_task', payload: {todolistId, name, taskId}} as const;
}

export const changeTaskNameAC = (props: {todolistId: string, taskId: string, name:string}) => {
    const {todolistId, taskId, name} = props;
    return {type: 'change_task_name', payload: {todolistId, name, taskId}} as const;
}

export const changeTaskStatusAC = (props: {todolistId: string, taskId: string}) => {
    const {todolistId, taskId} = props;
    return {type: 'change_task_status', payload: {todolistId, taskId}} as const;
}

//Action types

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>;
export type CreateTaskAction = ReturnType<typeof createTaskAC>;
export type ChangeTaskNameAction = ReturnType<typeof changeTaskNameAC>;
export type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>;
 
type Actions = CreateTodolistAction 
    | DeleteTodolistAction 
    | DeleteTaskAction 
    | CreateTaskAction
    | ChangeTaskNameAction
    | ChangeTaskStatusAction

const initialState: TTasks = {}
 
export const tasksReducer = (state: TTasks = initialState, action: Actions): TTasks => {
  switch (action.type) {
    case 'delete_todolist': {
      let newState = {...state};
      delete newState[action.payload.id];
      return newState;
    }
    case 'create_todolist': {
      return {...state, [action.payload.id] : []};
    }
    case 'delete_task': {
        const {todolistId, taskId} = action.payload;
        return {...state, [todolistId]: state[todolistId].filter((t) => t.id !== taskId)}
    }
    case 'create_task': {
        const {todolistId, taskId, name} = action.payload;
        return {...state, [todolistId] : [{id: taskId, name, isDone: false}, ...state[todolistId]]}
    }
    case 'change_task_name': {
        const {todolistId, taskId, name} = action.payload;
        return {...state, [todolistId] : state[todolistId].map(t => t.id === taskId ? {...t, name }: t)}
    }
    case 'change_task_status': {
        const {todolistId, taskId} = action.payload;
        return {...state, [todolistId] : state[todolistId].map(t => t.id === taskId ? {...t, isDone: !t.isDone }: t)}
    }
    default:
      return state
  }
}