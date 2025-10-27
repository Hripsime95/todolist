import { instance } from '@/common/instance';
import { LoginInputs } from '../lib/schemas/login.schema';
import { BaseResponse } from '@/common/types/types';

export const authApi = {
  login(payload: LoginInputs) {
    return instance.post<BaseResponse<{ userId: number; token: string }>>(
      'auth/login',
      payload,
    );
  },
  logout() {
    return instance.delete<BaseResponse>('auth/login');
  },
  me() {
    return instance.get<
      BaseResponse<{ id: number; email: string; login: string }>
    >('auth/me');
  },
};
