import { RequestStatus } from '@/common/types/types';
import { createAppSlice } from '@/common/utils';

export type ThemeMode = 'dark' | 'light';

export const appSlice = createAppSlice({
  name: 'app',
  initialState: {
    themeMode: 'light' as ThemeMode,
    status: 'idle' as RequestStatus,
    error: null as string | null,
    isLoggedIn: false,
  },
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>(
      (state, action) => {
        state.themeMode = action.payload.themeMode;
      },
    ),
    setAppStatusAC: create.reducer<{ status: RequestStatus }>(
      (state, action) => {
        state.status = action.payload.status;
      },
    ),
    setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error;
    }),
    setIsLoggedInAC: create.reducer<{ isLoggedIn: boolean }>(
      (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      },
    ),
  }),
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status,
    selectAppError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
});

export const {
  changeThemeModeAC,
  setAppStatusAC,
  setAppErrorAC,
  setIsLoggedInAC,
} = appSlice.actions;
export const appReducer = appSlice.reducer;
export const {
  selectThemeMode,
  selectStatus,
  selectAppError,
  selectIsLoggedIn,
} = appSlice.selectors;
