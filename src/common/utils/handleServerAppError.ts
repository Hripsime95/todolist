import { setAppErrorAC, setAppStatusAC } from '@/app/app-slice';
import type { Dispatch } from '@reduxjs/toolkit';
import { BaseResponse } from '../types/types';

export const handleServerAppError = <T>(
  data: BaseResponse<T>,
  dispatch: Dispatch,
) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC({ error: data.messages[0] }));
  } else {
    dispatch(setAppErrorAC({ error: 'Some error occurred' }));
  }
  dispatch(setAppStatusAC({ status: 'failed' }));
};
