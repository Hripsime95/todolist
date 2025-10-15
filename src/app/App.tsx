import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from '../common/theme/theme';
import { Main } from './Main';
import { useAppSelector } from '../common/hooks/useAppSelector';
import { selectThemeMode } from './app-slice';
import { ErrorSnackbar, Header } from '@/common/components';

function App() {
  const themeMode = useAppSelector(selectThemeMode);
  const theme = getTheme(themeMode);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Main />
        <ErrorSnackbar />
      </ThemeProvider>
    </div>
  );
}

export default App;
