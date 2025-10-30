import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from '../common/theme/theme';
import { useAppSelector } from '../common/hooks/useAppSelector';
import { selectThemeMode, setIsLoggedInAC } from './app-slice';
import { ErrorSnackbar, Header } from '@/common/components';
import { Routing } from '@/common/routing';
import { useEffect } from 'react';
import { useAppDispatch } from '@/common/hooks';
import CircularProgress from '@mui/material/CircularProgress';
import s from './App.module.css';
import { useMeQuery } from '@/features/auth/api/authApi';
import { ResultCode } from '@/common/enums/enums';

function App() {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useMeQuery();
  console.log('isLoading', isLoading);

  const themeMode = useAppSelector(selectThemeMode);
  const theme = getTheme(themeMode);
  useEffect(() => {
    if (isLoading) return;
    if (data?.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedInAC({ isLoggedIn: true }));
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className={s.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    );
  }
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </ThemeProvider>
    </div>
  );
}

export default App;
