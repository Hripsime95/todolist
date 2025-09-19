import { createSlice, current, nanoid } from '@reduxjs/toolkit';
import { TFilter, TTodolist } from '../ui/Todolists/Todolists';

export const todolistsSlce = createSlice({
  name: 'todolists',
  initialState: [] as TTodolist[],
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

        state.push({ ...action.payload, filter: 'all' });
      },
    ),
  }),
});

export const {
  deleteTodolistAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
  createTodolistAC,
} = todolistsSlce.actions;
export const todolistsReducer = todolistsSlce.reducer;
