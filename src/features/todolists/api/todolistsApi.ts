import { instance } from '@/common/instance';
import { Todolist } from './todolistsApi.types';
import { BaseResponse } from '@/common/types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AUTH_TOKEN } from '@/common/constants';
import { DomainTodolist } from '../model/todolists-slice';

export const todolistsApi = createApi({
  reducerPath: 'todolistsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      'API-KEY': import.meta.env.VITE_API_KEY,
    },
    prepareHeaders: (headers) => {
      headers.set(
        'Authorization',
        `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      );
    },
  }),
  endpoints: (build) => ({
    // Типизация аргументов (<возвращаемый тип, тип query аргументов (`QueryArg`)>)
    // `query` по умолчанию создает запрос `get` и указание метода необязательно
    getTodolists: build.query<DomainTodolist[], void>({
      query: () => 'todo-lists',
      transformResponse: (todolists: Todolist[]): DomainTodolist[] =>
        todolists.map((todolist) => ({
          ...todolist,
          filter: 'all',
          entityStatus: 'idle',
        })),
    }),
  }),
});

export const _todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>('/todo-lists');
  },
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { id, title } = payload;
    return instance.put<BaseResponse>(`/todo-lists/${id}`, { title });
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>('/todo-lists', {
      title,
    });
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`);
  },
};

export const { useGetTodolistsQuery } = todolistsApi;
