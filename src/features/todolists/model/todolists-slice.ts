import { Todolist } from './../../api/todolistsApi.types';
import { createAsyncThunk, current, nanoid } from '@reduxjs/toolkit';
import { TFilter } from '../ui/Todolists/Todolists';
import { todolistsApi } from '@/features/api/todolistsApi';
import { createAppSlice } from '@/common/utils';
import { setAppStatusAC } from '@/app/app-slice';

export type DomainTodolist = Todolist & {
  filter: TFilter;
};

export const todolistsSlce = createAppSlice({
  name: 'todolists',
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    fetchTodolists: create.asyncThunk(
      async (_arg, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
          thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }));
          const res = await todolistsApi.getTodolists();
          thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }));
          return { todolists: res.data };
        } catch (e) {
          thunkAPI.dispatch(setAppStatusAC({ status: 'failed' }));
          rejectWithValue(e);
        }
      },
      {
        fulfilled: (state, action) => {
          action.payload?.todolists.forEach((t) => {
            state.push({ ...t, filter: 'all' });
          });
        },
      },
    ),
    deleteTodolist: create.asyncThunk(
      async (payload: { id: string }, thunkAPI) => {
        try {
          thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }));
          todolistsApi.deleteTodolist(payload.id);
          thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }));
          return payload;
        } catch (error) {
          thunkAPI.dispatch(setAppStatusAC({ status: 'failed' }));
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((t) => t.id == action.payload.id);
          if (index !== -1) {
            state.splice(index, 1);
          }
        },
      },
    ),
    changeTodolistTitle: create.asyncThunk(
      async (payload: { id: string; title: string }, thunkAPI) => {
        const { id, title } = payload;
        try {
          thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }));
          await todolistsApi.changeTodolistTitle({ id, title });
          thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }));
          return payload;
        } catch (error) {
          thunkAPI.dispatch(setAppStatusAC({ status: 'failed' }));
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((t) => t.id == action.payload.id);
          if (index !== -1) {
            state[index].title = action.payload.title;
          }
        },
      },
    ),
    createTodolist: create.asyncThunk(
      async (args: { title: string }, thunkAPI) => {
        try {
          thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }));
          const res = await todolistsApi.createTodolist(args.title);
          thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }));
          return { todolist: res.data.data.item };
        } catch (error) {
          thunkAPI.dispatch(setAppStatusAC({ status: 'failed' }));
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state.push({
            ...action.payload.todolist,
            filter: 'all',
            addedDate: '',
            order: 0,
          });
        },
      },
    ),
    changeTodolistFilterAC: create.reducer<{ id: string; filter: TFilter }>(
      (state, action) => {
        const index = state.findIndex((t) => t.id == action.payload.id);
        if (index != -1) {
          state[index].filter = action.payload.filter;
        }
      },
    ),
  }),
});

export const {
  fetchTodolists,
  deleteTodolist,
  changeTodolistTitle,
  changeTodolistFilterAC,
  createTodolist,
} = todolistsSlce.actions;
export const todolistsReducer = todolistsSlce.reducer;
