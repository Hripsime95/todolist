import { createAction, createReducer, nanoid } from '@reduxjs/toolkit';
import { createTodolistAC, deleteTodolistAC } from './todolists-reducer';
import { TTasks } from '../ui/Todolists/TodolistItem/TodoListItem';

//Action creators

export const deleteTaskAC = createAction<{
  todolistId: string;
  taskId: string;
}>('tasks/deleteTask');

export const createTaskAC = createAction(
  'tasks/createTask',
  (props: { todolistId: string; name: string }) => {
    const { todolistId, name } = props;
    const taskId = nanoid();
    return { payload: { todolistId, name, taskId } };
  },
);

export const changeTaskNameAC = createAction<{
  todolistId: string;
  taskId: string;
  name: string;
}>('tasks/changeTaskName');

export const changeTaskStatusAC = createAction<{
  todolistId: string;
  taskId: string;
}>('tasks/changeTaskStatus');

const initialState: TTasks = {};

export const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(deleteTodolistAC, (state, action) => {
      delete state[action.payload.id];
    })
    .addCase(createTodolistAC, (state, action) => {
      state[action.payload.id] = [];
    })
    .addCase(createTaskAC, (state, action) => {
      state[action.payload.todolistId].unshift({
        id: action.payload.taskId,
        name: action.payload.name,
        isDone: false,
      });
    })
    .addCase(deleteTaskAC, (state, action) => {
      const index = state[action.payload.todolistId].findIndex(
        (task) => task.id === action.payload.taskId,
      );
      if (index !== -1) state[action.payload.todolistId].splice(index, 1);
    })
    .addCase(changeTaskNameAC, (state, action) => {
      const index = state[action.payload.todolistId].findIndex(
        (task) => task.id === action.payload.taskId,
      );
      if (index !== -1)
        state[action.payload.todolistId][index].name = action.payload.name;
    })
    .addCase(changeTaskStatusAC, (state, action) => {
      const index = state[action.payload.todolistId].findIndex(
        (task) => task.id === action.payload.taskId,
      );
      if (index !== -1)
        state[action.payload.todolistId][index].isDone =
          !state[action.payload.todolistId][index].isDone;
    });
});
