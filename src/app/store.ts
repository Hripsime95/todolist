import { configureStore } from '@reduxjs/toolkit';
import {
  todolistsReducer,
  todolistsSlce,
} from '@/features/todolists/model/todolists-slice';
import { appReducer, appSlice } from './app-slice';
// import {
//   tasksReducer,
//   tasksSlice,
// } from '@/features/todolists/model/tasks-slice';
// import { authReducer, authSlice } from '@/features/auth/model/auth-slice';
import { baseApi } from './baseApi';

// объединение reducer'ов с помощью combineReducers
// const rootReducer = combineReducers({
//   tasks: tasksReducer,
//   todolists: todolistsReducer,
//   app: appReducer,
// });

// создание store
export const store = configureStore({
  reducer: {
    [todolistsSlce.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>;
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch;

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store;
