import { LoginInputs } from '../lib/schemas/login.schema';
import { BaseResponse } from '@/common/types/types';
import { baseApi } from '@/app/baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<
      BaseResponse<{ userId: number; token: string }>,
      LoginInputs
    >({
      query: (payload) => ({
        url: 'auth/login',
        method: 'POST',
        body: payload,
      }),
    }),
    logout: build.mutation<BaseResponse, void>({
      query: () => ({
        url: 'auth/login',
        method: 'DELETE',
      }),
    }),
    me: build.query<
      BaseResponse<{ id: number; email: string; login: string }>,
      void
    >({
      query: () => ({
        url: 'auth/me',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useMeQuery } = authApi;
