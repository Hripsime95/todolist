import { nanoid } from '@reduxjs/toolkit';
import { createTodolistAC, deleteTodolistAC } from './todolists-slice';
import { TTasks } from '../ui/Todolists/TodolistItem/TodoListItem';
import { createAppSlice } from '@/common/utils';
import { tasksApi } from '@/features/api/tasksApi';
import { DomainTask } from '@/features/api/tasksApi.types';
import { TaskPriority, TaskStatus } from '@/common/enums';

export const tasksSlice = createAppSlice({
  name: 'tasks',
  initialState: {} as TTasks,
  reducers: (create) => ({
    fetchTasks: create.asyncThunk(
      async (todolistId: string, thunkAPI) => {
        try {
          const res = await tasksApi.getTasks(todolistId);
          return { todolistId, tasks: res.data.items };
        } catch (error) {
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks;
        },
      },
    ),
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
      title: string;
    }>((state, action) => {
      const { todolistId, taskId, title } = action.payload;
      const task = state[todolistId].find((t) => t.id === taskId);
      if (task) task.title = title;
    }),
    changeTaskStatusAC: create.reducer<{
      todolistId: string;
      taskId: string;
      isDone: boolean;
    }>((state, action) => {
      const { todolistId, taskId } = action.payload;
      const task = state[todolistId].find((t) => t.id === taskId);
      if (task)
        task.status = action.payload.isDone
          ? TaskStatus.Completed
          : TaskStatus.New;
    }),
    createTaskAC: create.reducer<{ todolistId: string; title: string }>(
      (state, action) => {
        const newTask: DomainTask = {
          title: action.payload.title,
          todoListId: action.payload.todolistId,
          startDate: '',
          priority: TaskPriority.Low,
          description: '',
          deadline: '',
          status: TaskStatus.New,
          addedDate: '',
          order: 0,
          id: nanoid(),
        };
        state[action.payload.todolistId].unshift(newTask);
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
  fetchTasks,
  createTaskAC,
  deleteTaskAC,
  changeTaskNameAC,
  changeTaskStatusAC,
} = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
