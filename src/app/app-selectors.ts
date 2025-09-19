import { ThemeMode } from './app-slice';
import { RootState } from './store';

export const selectThemeMode = (state: RootState): ThemeMode =>
  state.app.themeMode;
