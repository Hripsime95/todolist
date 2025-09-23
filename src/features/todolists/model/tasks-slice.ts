import { createSlice, nanoid } from '@reduxjs/toolkit';
import { createTodolistAC, deleteTodolistAC } from './todolists-slice';
import { TTasks } from '../ui/Todolists/TodolistItem/TodoListItem';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {} as TTasks,
  reducers: (create) => ({
    deleteTaskAC: create.reducer<{ todolistId: string; taskId: string }>(
      (state, action) => {
        const { todolistId, taskId } = action.payload;
        const index = state[todolistId].findIndex((t) => t.id === taskId);
        if (!!index) state[todolistId].splice(index, 1);
      },
    ),
    changeTaskNameAC: create.reducer<{
      todolistId: string;
      taskId: string;
      name: string;
    }>((state, action) => {
      const { todolistId, taskId, name } = action.payload;
      const task = state[todolistId].find((t) => (t.id = taskId));
      if (task) task.name = name;
    }),
    changeTaskStatusAC: create.reducer<{ todolistId: string; taskId: string }>(
      (state, action) => {
        const { todolistId, taskId } = action.payload;
        const task = state[todolistId].find((t) => (t.id = taskId));
        if (task) task.isDone = !task.isDone;
      },
    ),
    createTaskAC: create.reducer<{ todolistId: string; name: string }>(
      (state, action) => {
        const { todolistId, name } = action.payload;
        state[todolistId].push({ name, id: nanoid(), isDone: false });
      },
    ),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(deleteTodolistAC, (state, action) => {
        delete state[action.payload.id];
      })
      .addCase(createTodolistAC, (state, action) => {
        state[action.payload.id] = [];
      });
  },
});

export const {
  createTaskAC,
  deleteTaskAC,
  changeTaskNameAC,
  changeTaskStatusAC,
} = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
