import { createAppSlice } from '@/common/utils';
import { LoginInputs } from '../lib/schemas/login.schema';
import { authApi } from '../api/authApi';
import { handleServerNetworkError } from '@/common/utils/handleServerNetworkError';
import { AUTH_TOKEN } from '@/common/constants';
import { clearDataAC } from '@/common/actions';

export const authSlice = createAppSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
  reducers: (create) => ({
    login: create.asyncThunk(
      async (data: LoginInputs, { dispatch, rejectWithValue }) => {
        try {
          const res = await authApi.login(data);
          localStorage.setItem(AUTH_TOKEN, res.data.data.token);
          return { isLoggedIn: true };
        } catch (error) {
          handleServerNetworkError(error, dispatch);
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn;
        },
      },
    ),
    logout: create.asyncThunk(
      async (_args, { dispatch, rejectWithValue }) => {
        try {
          await authApi.logout();
          localStorage.removeItem(AUTH_TOKEN);
          dispatch(clearDataAC());
          return { isLoggedIn: false };
        } catch (error) {
          handleServerNetworkError(error, dispatch);
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn;
        },
      },
    ),
    initializeApp: create.asyncThunk(
      async (_args, { dispatch, rejectWithValue }) => {
        try {
          await authApi.me();
        } catch (error) {
          handleServerNetworkError(error, dispatch);
          return rejectWithValue(null);
        }
      },
    ),
  }),
});

export const { selectIsLoggedIn } = authSlice.selectors;

export const { login, logout, initializeApp } = authSlice.actions;

export const authReducer = authSlice.reducer;
