import { Todolist } from '../api/todolistsApi.types';
import { TFilter } from '../ui/Todolists/Todolists';
import { todolistsApi } from '@/features/todolists/api/todolistsApi';
import { createAppSlice } from '@/common/utils';
import { setAppStatusAC } from '@/app/app-slice';
import { RequestStatus } from '@/common/types/types';
import { clearDataAC } from '@/common/actions';

export type DomainTodolist = Todolist & {
  filter: TFilter;
  entityStatus: RequestStatus;
};

const initialState: DomainTodolist[] = [];

export const todolistsSlce = createAppSlice({
  name: 'todolists',
  initialState,
  selectors: {
    selectTodolists: (state) => state,
  },
  extraReducers: (builder) => {
    builder.addCase(clearDataAC, (_state, _action) => {
      return initialState;
    });
  },
  reducers: (create) => ({
    fetchTodolists: create.asyncThunk(
      async (_arg, thunkAPI) => {
        try {
          thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }));
          const res = await todolistsApi.getTodolists();
          thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }));
          return { todolists: res.data };
        } catch (e) {
          thunkAPI.dispatch(setAppStatusAC({ status: 'failed' }));
          thunkAPI.rejectWithValue(e);
        }
      },
      {
        fulfilled: (state, action) => {
          action.payload?.todolists.forEach((t) => {
            state.push({ ...t, filter: 'all', entityStatus: 'succeeded' });
          });
        },
      },
    ),
    deleteTodolist: create.asyncThunk(
      async (payload: { id: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }));
          dispatch(
            changeTodolistStatusAC({ id: payload.id, status: 'loading' }),
          );
          todolistsApi.deleteTodolist(payload.id);
          dispatch(setAppStatusAC({ status: 'succeeded' }));
          return payload;
        } catch (error) {
          dispatch(setAppStatusAC({ status: 'failed' }));
          return rejectWithValue(null);
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
            entityStatus: 'succeeded',
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
    changeTodolistStatusAC: create.reducer<{
      id: string;
      status: RequestStatus;
    }>((state, action) => {
      const index = state.findIndex((t) => t.id == action.payload.id);
      if (index != -1) {
        state[index].entityStatus = action.payload.status;
      }
    }),
  }),
});

export const { selectTodolists } = todolistsSlce.selectors;

export const {
  fetchTodolists,
  deleteTodolist,
  changeTodolistTitle,
  changeTodolistFilterAC,
  changeTodolistStatusAC,
  createTodolist,
} = todolistsSlce.actions;
export const todolistsReducer = todolistsSlce.reducer;
