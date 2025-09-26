import { Todolist } from './../../api/todolistsApi.types';
import { createAsyncThunk, current, nanoid } from '@reduxjs/toolkit';
import { TFilter } from '../ui/Todolists/Todolists';
import { todolistsApi } from '@/features/api/todolistsApi';
import { createAppSlice } from '@/common/utils';

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
          const res = await todolistsApi.getTodolists();
          return { todolists: res.data };
        } catch (e) {
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
    deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((t) => t.id == action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    }),
    changeTodolistTitleAC: create.reducer<{ id: string; title: string }>(
      (state, action) => {
        const index = state.findIndex((t) => t.id == action.payload.id);
        if (index !== -1) {
          state[index].title = action.payload.title;
        }
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
    createTodolistAC: create.preparedReducer(
      (title: string) => ({ payload: { title, id: nanoid() } }),
      (state, action) => {
        console.log(current(state));

        state.push({
          ...action.payload,
          filter: 'all',
          addedDate: '',
          order: 0,
        });
      },
    ),
  }),
});

export const {
  fetchTodolists,
  deleteTodolistAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
  createTodolistAC,
} = todolistsSlce.actions;
export const todolistsReducer = todolistsSlce.reducer;
