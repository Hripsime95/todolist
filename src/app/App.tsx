import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from '../common/theme/theme';
import { useAppSelector } from '../common/hooks/useAppSelector';
import { selectThemeMode } from './app-slice';
import { ErrorSnackbar, Header } from '@/common/components';
import { Routing } from '@/common/routing';
import { useEffect, useState } from 'react';
import { initializeApp } from '@/features/auth/model/auth-slice';
import { useAppDispatch } from '@/common/hooks';
import CircularProgress from '@mui/material/CircularProgress';
import s from './App.module.css';

function App() {
  const dispatch = useAppDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  const themeMode = useAppSelector(selectThemeMode);
  const theme = getTheme(themeMode);

  useEffect(() => {
    dispatch(initializeApp()).finally(() => setIsInitialized(true));
  }, []);

  if (!isInitialized) {
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
