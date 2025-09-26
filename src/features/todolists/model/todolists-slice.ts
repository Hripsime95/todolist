import { Todolist } from './../../api/todolistsApi.types';
import {
  createAsyncThunk,
  createSlice,
  current,
  nanoid,
} from '@reduxjs/toolkit';
import { TFilter } from '../ui/Todolists/Todolists';
import { todolistsApi } from '@/features/api/todolistsApi';

export type DomainTodolist = Todolist & {
  filter: TFilter;
};

export const todolistsSlce = createSlice({
  name: 'todolists',
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
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
  extraReducers: (builder) => {
    builder.addCase(fetchTodolists.fulfilled, (_state, action) => {
      return action.payload?.todolists.map((t) => {
        return { ...t, filter: 'all' };
      });
    });
  },
});

export const fetchTodolists = createAsyncThunk(
  `${todolistsSlce.name}/fetchTodolistsTC`,
  async (_arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await todolistsApi.getTodolists();
      return { todolists: res.data };
    } catch (e) {
      rejectWithValue(e);
    }
  },
);

export const {
  deleteTodolistAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
  createTodolistAC,
} = todolistsSlce.actions;
export const todolistsReducer = todolistsSlce.reducer;
