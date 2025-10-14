import { TTasks } from '../ui/Todolists/TodolistItem/TodoListItem';
import { createAppSlice } from '@/common/utils';
import { tasksApi } from '@/features/api/tasksApi';
import { UpdateTaskModel } from '@/features/api/tasksApi.types';
import { TaskStatus } from '@/common/enums';
import { RootState } from '@/app/store';
import { setAppStatusAC } from '@/app/app-slice';

export const tasksSlice = createAppSlice({
  name: 'tasks',
  initialState: {} as TTasks,
  reducers: (create) => ({
    fetchTasks: create.asyncThunk(
      async (todolistId: string, thunkAPI) => {
        try {
          thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }));
          const res = await tasksApi.getTasks(todolistId);
          thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }));
          return { todolistId, tasks: res.data.items };
        } catch (error) {
          thunkAPI.dispatch(setAppStatusAC({ status: 'failed' }));
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks;
        },
      },
    ),
    deleteTask: create.asyncThunk(
      async (payload: { todolistId: string; taskId: string }, thunkAPI) => {
        try {
          thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }));
          await tasksApi.deleteTask(payload);
          thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }));
          return payload;
        } catch (error) {
          thunkAPI.dispatch(setAppStatusAC({ status: 'failed' }));
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          const tasks = state[action.payload.todolistId];
          const index = tasks.findIndex(
            (task) => task.id === action.payload.taskId,
          );
          if (index !== -1) {
            tasks.splice(index, 1);
          }
        },
      },
    ),
    updateTask: create.asyncThunk(
      async (
        payload: {
          todolistId: string;
          taskId: string;
          domainModel: Partial<UpdateTaskModel>;
        },
        { dispatch, getState, rejectWithValue },
      ) => {
        const allTodolistTasks = (getState() as RootState).tasks[
          payload.todolistId
        ];
        const task = allTodolistTasks.find(
          (task) => task.id === payload.taskId,
        );

        if (!task) {
          return rejectWithValue(null);
        }
        const model: UpdateTaskModel = { ...task, ...payload.domainModel };
        try {
          dispatch(setAppStatusAC({ status: 'loading' }));
          await tasksApi.updateTask({
            todolistId: payload.todolistId,
            taskId: payload.taskId,
            model,
          });
          dispatch(setAppStatusAC({ status: 'succeeded' }));
          return payload;
        } catch (error) {
          dispatch(setAppStatusAC({ status: 'failed' }));
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          const tasks = state[action.payload.todolistId];
          const index = state[action.payload.todolistId].findIndex(
            (task) => task.id === action.payload.taskId,
          );
          if (index != -1) {
            tasks[index] = { ...tasks[index], ...action.payload.domainModel };
          }
        },
      },
    ),
    createTask: create.asyncThunk(
      async (args: { todolistId: string; title: string }, thunkAPI) => {
        try {
          thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }));
          const res = await tasksApi.createTask(args);
          thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }));
          return { task: res.data.data.item };
        } catch (error) {
          thunkAPI.dispatch(setAppStatusAC({ status: 'failed' }));
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.task.todoListId].unshift(action.payload.task);
        },
      },
    ),
  }),
});

export const { fetchTasks, createTask, deleteTask, updateTask } =
  tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
