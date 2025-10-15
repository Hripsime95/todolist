import { TTasks } from '../ui/Todolists/TodolistItem/TodoListItem';
import { createAppSlice } from '@/common/utils';
import { tasksApi } from '@/features/api/tasksApi';
import { UpdateTaskModel } from '@/features/api/tasksApi.types';
import { TaskStatus } from '@/common/enums';
import { RootState } from '@/app/store';
import { setAppErrorAC, setAppStatusAC } from '@/app/app-slice';
import { ResultCode } from '@/common/enums/enums';
import { handleServerAppError } from '@/common/utils/handleServerAppError';
import { handleServerNetworkError } from '@/common/utils/handleServerNetworkError';

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
        const { todolistId, taskId, domainModel } = payload;
        const allTodolistTasks = (getState() as RootState).tasks[
          payload.todolistId
        ];
        const task = allTodolistTasks.find(
          (task) => task.id === payload.taskId,
        );

        if (!task) {
          return rejectWithValue(null);
        }
        const model: UpdateTaskModel = { ...task, ...domainModel };
        try {
          dispatch(setAppStatusAC({ status: 'loading' }));
          const res = await tasksApi.updateTask({ todolistId, taskId, model });
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: 'succeeded' }));
            return { task: res.data.data.item };
          } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
          }
        } catch (error: any) {
          dispatch(setAppStatusAC({ status: 'failed' }));
          handleServerNetworkError(error, dispatch);
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          const tasks = state[action.payload.task.todoListId];
          const index = state[action.payload.task.todoListId].findIndex(
            (task) => task.id === action.payload.task.id,
          );
          if (index != -1) {
            tasks[index] = { ...action.payload.task };
          }
        },
      },
    ),
    createTask: create.asyncThunk(
      async (
        args: { todolistId: string; title: string },
        { dispatch, rejectWithValue },
      ) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }));
          const res = await tasksApi.createTask(args);
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: 'succeeded' }));
            return { task: res.data.data.item };
          } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
          }
        } catch (error: any) {
          dispatch(setAppErrorAC({ error: error.message }));
          handleServerNetworkError(error, dispatch);
          return rejectWithValue(null);
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
